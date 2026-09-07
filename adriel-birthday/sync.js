/* ============================================================
   SYNC.JS — JSONBin cloud sync, confirmations, outfits, payments
   ============================================================ */

var JSONBIN_KEY = '$2a$10$mTkMFOlAeFOuwCPIQM13vu0gXQ29GR0MkjBeMaGMSsVmOar5/oISq';
var BIN_ID_KEY = 'adriel-trip-binId';
var DATA_VERSION = 1;

var travelData = {
  version: DATA_VERSION,
  confirmations: [],
  outfits: {},
  payments: {},
  profiles: {}
};

// === JSONBin Operations ===
function createBin() {
  return fetch('https://api.jsonbin.io/v3/b', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Master-Key': JSONBIN_KEY,
      'X-Bin-Name': 'adriel-birthday-trip'
    },
    body: JSON.stringify(travelData)
  }).then(function(r) { return r.json(); })
    .then(function(data) {
      var id = data.metadata.id;
      localStorage.setItem(BIN_ID_KEY, id);
      return id;
    });
}

function saveToCloud() {
  var binId = localStorage.getItem(BIN_ID_KEY);
  if (!binId) return;

  // Save locally first as backup
  try {
    localStorage.setItem('adriel-trip-data', JSON.stringify(travelData));
  } catch(e) {}

  // Strip confirmations images if data is too large for JSONBin
  var dataToSave = JSON.parse(JSON.stringify(travelData));
  var size = JSON.stringify(dataToSave).length;
  if (size > 90000) {
    dataToSave.confirmations = dataToSave.confirmations.map(function(c) {
      return { label: c.label, imageCount: (c.images || []).length, cloudSkipped: true };
    });
  }

  fetch('https://api.jsonbin.io/v3/b/' + binId, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Master-Key': JSONBIN_KEY
    },
    body: JSON.stringify(dataToSave)
  }).catch(function() {});
}

function loadFromCloud() {
  var binId = localStorage.getItem(BIN_ID_KEY);
  if (!binId) {
    createBin().then(function() { renderSyncUI(); });
    return;
  }

  fetch('https://api.jsonbin.io/v3/b/' + binId + '/latest', {
    headers: { 'X-Master-Key': JSONBIN_KEY }
  }).then(function(r) { return r.json(); })
    .then(function(data) {
      var cloud = data.record || {};

      // Merge cloud data
      if (cloud.outfits) travelData.outfits = cloud.outfits;
      if (cloud.payments) travelData.payments = cloud.payments;
      if (cloud.profiles) travelData.profiles = cloud.profiles;

      // Confirmations: prefer local (they have full images)
      var localStr = localStorage.getItem('adriel-trip-data');
      if (localStr) {
        try {
          var local = JSON.parse(localStr);
          if (local.confirmations && local.confirmations.length > 0) {
            travelData.confirmations = local.confirmations;
          } else if (cloud.confirmations) {
            travelData.confirmations = cloud.confirmations;
          }
        } catch(e) {
          if (cloud.confirmations) travelData.confirmations = cloud.confirmations;
        }
      } else if (cloud.confirmations) {
        travelData.confirmations = cloud.confirmations;
      }

      renderSyncUI();
    })
    .catch(function() {
      // Load from localStorage if cloud fails
      var localStr = localStorage.getItem('adriel-trip-data');
      if (localStr) {
        try { travelData = JSON.parse(localStr); } catch(e) {}
      }
      renderSyncUI();
    });
}

// === Render all synced UI ===
function renderSyncUI() {
  renderConfirmationGrid();
  renderPaymentTracker();
  renderOutfits();
}

// === CONFIRMATIONS ===
function uploadConfirmation() {
  var label = document.getElementById('conf-label').value.trim();
  var files = document.getElementById('conf-files').files;
  if (!label) { alert('Please enter a label'); return; }
  if (!files || files.length === 0) { alert('Please select images'); return; }

  var images = [];
  var processed = 0;
  var total = files.length;

  for (var i = 0; i < total; i++) {
    (function(file) {
      var reader = new FileReader();
      reader.onload = function(e) {
        // Moderate compression to keep readable
        var img = new Image();
        img.onload = function() {
          var canvas = document.createElement('canvas');
          var maxDim = 1000;
          var w = img.width, h = img.height;
          if (w > maxDim || h > maxDim) {
            if (w > h) { h = h * maxDim / w; w = maxDim; }
            else { w = w * maxDim / h; h = maxDim; }
          }
          canvas.width = w;
          canvas.height = h;
          canvas.getContext('2d').drawImage(img, 0, 0, w, h);
          images.push(canvas.toDataURL('image/jpeg', 0.88));

          processed++;
          if (processed === total) {
            travelData.confirmations.push({ label: label, images: images });
            saveToCloud();
            renderConfirmationGrid();
            document.getElementById('conf-label').value = '';
            document.getElementById('conf-files').value = '';
          }
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    })(files[i]);
  }
}

function renderConfirmationGrid() {
  var grid = document.getElementById('conf-grid');
  if (!grid) return;
  grid.innerHTML = '';

  travelData.confirmations.forEach(function(conf, ci) {
    var card = document.createElement('div');
    card.className = 'conf-card';

    var imgs = conf.images || [];
    if (imgs.length > 0) {
      var imgContainer = document.createElement('div');
      imgContainer.style.cssText = 'display:flex;overflow-x:auto;scroll-snap-type:x mandatory;';
      imgs.forEach(function(src, ii) {
        var img = document.createElement('img');
        img.src = src;
        img.style.cssText = 'min-width:100%;scroll-snap-align:start;cursor:pointer;';
        img.onclick = (function(cIdx, iIdx) {
          return function() { openLightbox(cIdx, iIdx); };
        })(ci, ii);
        imgContainer.appendChild(img);
      });
      card.appendChild(imgContainer);
      if (imgs.length > 1) {
        var hint = document.createElement('div');
        hint.style.cssText = 'padding:0.3rem 1rem;font-size:0.7rem;color:var(--text-muted);';
        hint.textContent = imgs.length + ' images — scroll or tap to view';
        card.appendChild(hint);
      }
    }

    var labelDiv = document.createElement('div');
    labelDiv.className = 'conf-label';
    labelDiv.innerHTML = conf.label +
      ' <button onclick="deleteConfirmation(' + ci + ')" style="float:right;background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:0.8rem;">✕</button>';
    card.appendChild(labelDiv);
    grid.appendChild(card);
  });
}

function deleteConfirmation(idx) {
  if (confirm('Delete this confirmation?')) {
    travelData.confirmations.splice(idx, 1);
    saveToCloud();
    renderConfirmationGrid();
  }
}

// === LIGHTBOX ===
var lightboxState = { confIdx: 0, imgIdx: 0 };

function openLightbox(confIdx, imgIdx) {
  lightboxState.confIdx = confIdx;
  lightboxState.imgIdx = imgIdx;

  var overlay = document.getElementById('lightbox');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'lightbox';
    overlay.className = 'lightbox';
    overlay.innerHTML = '<button class="lightbox-close" onclick="closeLightbox()">x</button>' +
      '<button class="lightbox-nav prev" onclick="lbNav(-1)">&#8249;</button>' +
      '<img id="lb-img">' +
      '<div class="lightbox-caption" id="lb-caption"></div>' +
      '<button class="lightbox-nav next" onclick="lbNav(1)">&#8250;</button>';
    overlay.addEventListener('click', function(e) { if (e.target === overlay) closeLightbox(); });
    document.body.appendChild(overlay);
  }

  updateLightbox();
  overlay.classList.add('open');
}

function updateLightbox() {
  var conf = travelData.confirmations[lightboxState.confIdx];
  if (!conf || !conf.images) return;
  var imgs = conf.images;
  var idx = lightboxState.imgIdx;
  document.getElementById('lb-img').src = imgs[idx];
  document.getElementById('lb-caption').textContent = conf.label +
    (imgs.length > 1 ? ' (' + (idx + 1) + '/' + imgs.length + ')' : '');
}

function lbNav(dir) {
  var conf = travelData.confirmations[lightboxState.confIdx];
  if (!conf || !conf.images) return;
  var max = conf.images.length;
  lightboxState.imgIdx = (lightboxState.imgIdx + dir + max) % max;
  updateLightbox();
}

function closeLightbox() {
  var overlay = document.getElementById('lightbox');
  if (overlay) overlay.classList.remove('open');
}

// === OUTFITS ===
function renderOutfits() {
  var containers = document.querySelectorAll('[data-outfit]');
  containers.forEach(function(c) {
    var key = c.getAttribute('data-outfit');
    var body = c.querySelector('.collapsible-body');
    if (!body) return;

    var outfits = travelData.outfits[key] || [];
    var html = '<div style="margin-bottom:0.8rem;">' +
      '<select id="outfit-name-' + key + '" style="background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:0.4rem;color:var(--cream);font-family:DM Sans,sans-serif;font-size:0.8rem;margin-right:0.5rem;">';
    TRIP.people.forEach(function(p) { html += '<option value="' + p + '">' + p + '</option>'; });
    html += '</select>' +
      '<input type="text" id="outfit-desc-' + key + '" placeholder="Description" style="background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:0.4rem;color:var(--cream);font-family:DM Sans,sans-serif;font-size:0.8rem;width:140px;margin-right:0.5rem;">' +
      '<input type="file" id="outfit-file-' + key + '" accept="image/*" style="font-size:0.75rem;color:var(--text-dim);max-width:140px;">' +
      '<button onclick="addOutfit(\'' + key + '\')" style="margin-top:0.5rem;background:var(--accent);color:var(--bg);border:none;border-radius:100px;padding:0.35rem 0.8rem;cursor:pointer;font-size:0.75rem;font-weight:600;">Add</button>' +
      '</div>';

    outfits.forEach(function(o, i) {
      html += '<div style="display:flex;align-items:center;gap:0.6rem;margin-bottom:0.5rem;padding:0.5rem;background:rgba(201,149,107,0.05);border-radius:8px;">';
      if (o.image) {
        html += '<img src="' + o.image + '" style="width:50px;height:50px;object-fit:cover;border-radius:6px;cursor:pointer;" onclick="openOutfitLightbox(\'' + key + '\',' + i + ')">';
      }
      html += '<div><strong style="font-size:0.82rem;color:var(--cream);">' + o.name + '</strong>';
      if (o.desc) html += '<br><span style="font-size:0.75rem;color:var(--text-dim);">' + o.desc + '</span>';
      html += '</div></div>';
    });

    body.innerHTML = html;
  });
}

function addOutfit(key) {
  var name = document.getElementById('outfit-name-' + key).value;
  var desc = document.getElementById('outfit-desc-' + key).value;
  var fileInput = document.getElementById('outfit-file-' + key);
  var file = fileInput.files[0];

  if (!travelData.outfits[key]) travelData.outfits[key] = [];

  function saveOutfit(imageData) {
    travelData.outfits[key].push({ name: name, desc: desc, image: imageData || '' });
    saveToCloud();
    renderOutfits();
  }

  if (file) {
    var reader = new FileReader();
    reader.onload = function(e) {
      var img = new Image();
      img.onload = function() {
        var canvas = document.createElement('canvas');
        var maxDim = 400;
        var w = img.width, h = img.height;
        if (w > maxDim || h > maxDim) {
          if (w > h) { h = h * maxDim / w; w = maxDim; }
          else { w = w * maxDim / h; h = maxDim; }
        }
        canvas.width = w; canvas.height = h;
        canvas.getContext('2d').drawImage(img, 0, 0, w, h);
        saveOutfit(canvas.toDataURL('image/jpeg', 0.8));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    saveOutfit('');
  }
}

function openOutfitLightbox(key, idx) {
  var outfits = travelData.outfits[key] || [];
  if (!outfits[idx] || !outfits[idx].image) return;

  var overlay = document.getElementById('lightbox');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'lightbox';
    overlay.className = 'lightbox';
    overlay.innerHTML = '<button class="lightbox-close" onclick="closeLightbox()">x</button>' +
      '<img id="lb-img">' +
      '<div class="lightbox-caption" id="lb-caption"></div>';
    overlay.addEventListener('click', function(e) { if (e.target === overlay) closeLightbox(); });
    document.body.appendChild(overlay);
  }

  document.getElementById('lb-img').src = outfits[idx].image;
  document.getElementById('lb-caption').textContent = outfits[idx].name + (outfits[idx].desc ? ' — ' + outfits[idx].desc : '');
  overlay.classList.add('open');
}

// === PAYMENT TRACKER ===
function renderPaymentTracker() {
  var container = document.getElementById('payment-tracker');
  if (!container) return;

  var html = '';
  TRIP.payments.forEach(function(p, pi) {
    var paidData = travelData.payments[pi] || {};
    var paidCount = 0;
    TRIP.people.forEach(function(person) { if (paidData[person]) paidCount++; });

    html += '<div class="payment-row"><div>' +
      '<div class="item-name">' + p.item + '</div>' +
      '<div style="font-size:0.75rem;color:var(--text-muted);">' + p.note + '</div>' +
      '<div class="payment-checks">';

    TRIP.people.forEach(function(person) {
      var paid = paidData[person] ? true : false;
      html += '<div class="payment-check ' + (paid ? 'paid' : '') + '" onclick="togglePayment(' + pi + ',\'' + person + '\')">' +
        (paid ? '✓ ' : '') + person + '</div>';
    });

    html += '</div></div>' +
      '<div class="item-cost">' + paidCount + '/' + TRIP.people.length + ' paid</div></div>';
  });

  container.innerHTML = html;
}

function togglePayment(payIdx, person) {
  if (!travelData.payments[payIdx]) travelData.payments[payIdx] = {};
  travelData.payments[payIdx][person] = !travelData.payments[payIdx][person];
  saveToCloud();
  renderPaymentTracker();
}

// === INIT ===
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(loadFromCloud, 500);
  // Auto-refresh every 30s
  setInterval(function() { loadFromCloud(); }, 30000);
});
