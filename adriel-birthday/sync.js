/* ============================================================
   SYNC.JS — JSONBin cloud sync, confirmations, outfits, payments
   ============================================================ */

var JSONBIN_KEY = '$2a$10$mTkMFOlAeFOuwCPIQM13vu0gXQ29GR0MkjBeMaGMSsVmOar5/oISq';
var IMGUR_CLIENT_ID = '546c25a59c58ad7';
var SHARED_BIN_ID = ''; // Will be set on first run, then hardcoded
var BIN_ID_KEY = 'adriel-trip-binId';
var DATA_VERSION = 6;
var saveTimeout = null;
var pendingChanges = false;

var travelData = {
  version: DATA_VERSION,
  confirmations: [],
  outfits: {},
  payments: {},
  profiles: {},
  votes: {},
  customPayments: []
};

// On first ever load, create a bin and log the ID so we can hardcode it
// After that, all devices use the same bin

// === JSONBin Operations ===

// === Imgur Image Upload (full HD, no compression) ===
function uploadToImgur(file) {
  return new Promise(function(resolve, reject) {
    var formData = new FormData();
    formData.append('image', file);
    fetch('https://api.imgur.com/3/image', {
      method: 'POST',
      headers: { 'Authorization': 'Client-ID ' + IMGUR_CLIENT_ID },
      body: formData
    })
    .then(function(r) { return r.json(); })
    .then(function(data) {
      if (data.success && data.data && data.data.link) {
        resolve(data.data.link);
      } else {
        reject(new Error('Imgur upload failed'));
      }
    })
    .catch(reject);
  });
}

function uploadBase64ToImgur(base64Data) {
  return new Promise(function(resolve, reject) {
    // Strip the data:image prefix
    var raw = base64Data.split(',')[1] || base64Data;
    var formData = new FormData();
    formData.append('image', raw);
    formData.append('type', 'base64');
    fetch('https://api.imgur.com/3/image', {
      method: 'POST',
      headers: { 'Authorization': 'Client-ID ' + IMGUR_CLIENT_ID },
      body: formData
    })
    .then(function(r) { return r.json(); })
    .then(function(data) {
      if (data.success && data.data && data.data.link) {
        resolve(data.data.link);
      } else {
        reject(new Error('Imgur upload failed'));
      }
    })
    .catch(reject);
  });
}

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
  var binId = SHARED_BIN_ID || localStorage.getItem(BIN_ID_KEY);
  if (!binId) return;

  // Save locally as backup
  try {
    localStorage.setItem('adriel-trip-data', JSON.stringify(travelData));
  } catch(e) {}

  // Mark as pending
  pendingChanges = true;
  showSaveStatus('unsaved');

  // Debounce — wait 1s after last change before pushing
  if (saveTimeout) clearTimeout(saveTimeout);
  saveTimeout = setTimeout(function() {
    fetch('https://api.jsonbin.io/v3/b/' + binId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': JSONBIN_KEY
      },
      body: JSON.stringify(travelData)
    }).then(function(r) {
      if (r.ok) {
        pendingChanges = false;
        showSaveStatus('saved');
      } else {
        showSaveStatus('error');
      }
    }).catch(function() {
      showSaveStatus('error');
    });
  }, 1000);
}

function showSaveStatus(status) {
  var el = document.getElementById('save-status');
  if (!el) {
    el = document.createElement('div');
    el.id = 'save-status';
    el.style.cssText = 'position:fixed;bottom:1rem;left:50%;transform:translateX(-50%);z-index:200;padding:0.4rem 1rem;border-radius:100px;font-family:DM Sans,sans-serif;font-size:0.7rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;transition:all 0.3s ease;pointer-events:none;';
    document.body.appendChild(el);
  }
  if (status === 'saved') {
    el.style.background = 'rgba(74,124,92,0.9)';
    el.style.color = '#fff';
    el.textContent = 'Saved';
    el.style.opacity = '1';
    setTimeout(function() { el.style.opacity = '0'; }, 2000);
  } else if (status === 'unsaved') {
    el.style.background = 'rgba(201,149,107,0.9)';
    el.style.color = '#fff';
    el.textContent = 'Saving...';
    el.style.opacity = '1';
  } else if (status === 'error') {
    el.style.background = 'rgba(139,58,58,0.9)';
    el.style.color = '#fff';
    el.textContent = 'Save failed — will retry';
    el.style.opacity = '1';
    setTimeout(function() { el.style.opacity = '0'; }, 3000);
  }
}

function loadFromCloud() {
  var binId = SHARED_BIN_ID || localStorage.getItem(BIN_ID_KEY);
  if (!binId) {
    renderSyncUI();
    createBin().then(function(id) {
      console.log('Created shared bin: ' + id + ' — hardcode this as SHARED_BIN_ID');
      renderSyncUI();
    }).catch(function() {});
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
      if (cloud.votes) travelData.votes = cloud.votes;
      if (cloud.customPayments) travelData.customPayments = cloud.customPayments;

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
  renderVotes();
  renderOutfitsGallery();
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
  var statusEl = document.getElementById('conf-label');
  statusEl.value = 'Uploading ' + total + ' image(s)...';

  for (var i = 0; i < total; i++) {
    (function(file) {
      uploadToImgur(file).then(function(url) {
        images.push(url);
        processed++;
        statusEl.value = 'Uploaded ' + processed + '/' + total;
        if (processed === total) {
          travelData.confirmations.push({ label: label, images: images });
          saveToCloud();
          renderConfirmationGrid();
          statusEl.value = '';
          document.getElementById('conf-files').value = '';
        }
      }).catch(function() {
        // Fallback to base64 if Imgur fails
        var reader = new FileReader();
        reader.onload = function(e) {
          images.push(e.target.result);
          processed++;
          if (processed === total) {
            travelData.confirmations.push({ label: label, images: images });
            saveToCloud();
            renderConfirmationGrid();
            statusEl.value = '';
            document.getElementById('conf-files').value = '';
          }
        };
        reader.readAsDataURL(file);
      });
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
    var listDiv = document.getElementById('outfit-list-' + key);
    if (!listDiv) return;

    var outfits = travelData.outfits[key] || [];
    var html = '';
    outfits.forEach(function(o, i) {
      html += '<div style="display:flex;align-items:center;gap:0.6rem;margin-bottom:0.5rem;padding:0.5rem;background:rgba(201,149,107,0.05);border-radius:8px;">';
      if (o.image) {
        html += '<img src="' + o.image + '" style="width:50px;height:50px;object-fit:cover;border-radius:6px;cursor:pointer;" onclick="openOutfitLightbox(\'' + key + '\',' + i + ')">';
      }
      html += '<div><strong style="font-size:0.82rem;color:var(--cream);">' + o.name + '</strong>';
      if (o.desc) html += '<br><span style="font-size:0.75rem;color:var(--text-dim);">' + o.desc + '</span>';
      html += '</div></div>';
    });
    if (outfits.length === 0) {
      html = '<p style="font-size:0.78rem;color:var(--text-muted);">No outfits added yet</p>';
    }
    listDiv.innerHTML = html;
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
    renderOutfitsGallery();
  }

  if (file) {
    uploadToImgur(file).then(function(url) {
      saveOutfit(url);
    }).catch(function() {
      // Fallback to base64
      var reader = new FileReader();
      reader.onload = function(e) { saveOutfit(e.target.result); };
      reader.readAsDataURL(file);
    });
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
    var applicablePeople = (p.appliesTo && p.appliesTo.length > 0) ? p.appliesTo : TRIP.people;
    var paidCount = 0;
    applicablePeople.forEach(function(person) { if (paidData[person]) paidCount++; });

    html += '<div class="payment-row"><div>' +
      '<div class="item-name">' + p.item + '</div>' +
      '<div style="font-size:0.75rem;color:var(--text-muted);">' + p.note + '</div>' +
      '<div class="payment-checks">';

    applicablePeople.forEach(function(person) {
      var paid = paidData[person] ? true : false;
      html += '<div class="payment-check ' + (paid ? 'paid' : '') + '" onclick="togglePayment(' + pi + ',\'' + person + '\')">' +
        (paid ? '&#10003; ' : '') + person + '</div>';
    });

    html += '</div></div>' +
      '<div class="item-cost">' + paidCount + '/' + applicablePeople.length + ' paid</div></div>';
  });

  // Custom (cloud-added) payment items
  var customs = travelData.customPayments || [];
  customs.forEach(function(p, ci) {
    var payKey = 'custom-' + ci;
    var paidData = travelData.payments[payKey] || {};
    var applicablePeople = (p.appliesTo && p.appliesTo.length > 0) ? p.appliesTo : TRIP.people;
    var paidCount = 0;
    applicablePeople.forEach(function(person) { if (paidData[person]) paidCount++; });

    html += '<div class="payment-row"><div>' +
      '<div class="item-name">' + p.item +
        ' <button onclick="removeCustomPayment(' + ci + ')" style="background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:0.7rem;opacity:0.5;">&#10005;</button>' +
      '</div>' +
      '<div style="font-size:0.75rem;color:var(--text-muted);">' + p.note + '</div>' +
      '<div class="payment-checks">';

    applicablePeople.forEach(function(person) {
      var paid = paidData[person] ? true : false;
      html += '<div class="payment-check ' + (paid ? 'paid' : '') + '" onclick="togglePayment(\'custom-' + ci + '\',\'' + person + '\')">' +
        (paid ? '&#10003; ' : '') + person + '</div>';
    });

    html += '</div></div>' +
      '<div class="item-cost">' + paidCount + '/' + applicablePeople.length + ' paid</div></div>';
  });

  container.innerHTML = html;

  // Add new item form
  container.innerHTML += '<div class="payment-add">' +
    '<div style="display:flex;gap:0.4rem;flex-wrap:wrap;margin-top:1rem;">' +
      '<input type="text" id="pay-new-item" placeholder="Item name" style="background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:0.4rem 0.6rem;color:var(--cream);font-family:DM Sans,sans-serif;font-size:0.78rem;flex:2;min-width:120px;">' +
      '<input type="text" id="pay-new-note" placeholder="Note" style="background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:0.4rem 0.6rem;color:var(--cream);font-family:DM Sans,sans-serif;font-size:0.78rem;flex:1;min-width:80px;">' +
      '<button onclick="addPaymentItem()" style="background:var(--accent);color:var(--bg);border:none;border-radius:100px;padding:0.4rem 0.8rem;cursor:pointer;font-size:0.72rem;font-weight:600;">+ Add</button>' +
    '</div>' +
  '</div>';
}

function addPaymentItem() {
  var item = document.getElementById('pay-new-item').value.trim();
  var note = document.getElementById('pay-new-note').value.trim();
  if (!item) { alert('Enter an item name'); return; }

  if (!travelData.customPayments) travelData.customPayments = [];
  travelData.customPayments.push({ item: item, note: note || '', appliesTo: [] });
  saveToCloud();
  renderPaymentTracker();
}

function removeCustomPayment(idx) {
  if (!travelData.customPayments) return;
  if (confirm('Remove this item?')) {
    travelData.customPayments.splice(idx, 1);
    saveToCloud();
    renderPaymentTracker();
  }
}

function togglePayment(payIdx, person) {
  if (!travelData.payments[payIdx]) travelData.payments[payIdx] = {};
  travelData.payments[payIdx][person] = !travelData.payments[payIdx][person];
  saveToCloud();
  renderPaymentTracker();
}

// === FOOD VOTING ===
function renderVotes() {
  var containers = document.querySelectorAll('[data-vote]');
  containers.forEach(function(c) {
    var key = c.getAttribute('data-vote');
    var voteData = travelData.votes[key] || { options: [], votes: {} };
    // Merge defaults with cloud-added suggestions
    var defaults = (TRIP.defaultVotes && TRIP.defaultVotes[key]) || [];
    var cloudOptions = voteData.options || [];
    var allNames = {};
    var existingOptions = [];
    defaults.forEach(function(d) { if (!allNames[d.name]) { allNames[d.name] = true; existingOptions.push(d); } });
    cloudOptions.forEach(function(d) { if (!allNames[d.name]) { allNames[d.name] = true; existingOptions.push(d); } });

    // Update the vote choice dropdown
    var choiceSelect = document.getElementById('vote-choice-' + key);
    if (choiceSelect) {
      choiceSelect.innerHTML = '';
      if (existingOptions.length === 0) {
        choiceSelect.innerHTML = '<option value="">-- add suggestions first --</option>';
      } else {
        existingOptions.forEach(function(o) {
          choiceSelect.innerHTML += '<option value="' + o.name + '">' + o.name + '</option>';
        });
      }
    }

    // Update the results area
    var resultsDiv = document.getElementById('vote-results-' + key);
    if (!resultsDiv) return;

    if (existingOptions.length === 0) {
      resultsDiv.innerHTML = '<p style="font-size:0.78rem;color:var(--text-muted);">No suggestions yet</p>';
      return;
    }

    var totalVotes = Object.keys(voteData.votes || {}).length;
    var voteCounts = {};
    existingOptions.forEach(function(o) { voteCounts[o.name] = { count:0, voters:[] }; });
    Object.keys(voteData.votes || {}).forEach(function(voter) {
      var choice = voteData.votes[voter];
      if (voteCounts[choice]) {
        voteCounts[choice].count++;
        voteCounts[choice].voters.push(voter);
      }
    });

    var sorted = existingOptions.slice().sort(function(a, b) {
      return (voteCounts[b.name] ? voteCounts[b.name].count : 0) - (voteCounts[a.name] ? voteCounts[a.name].count : 0);
    });

    var html = '';
    sorted.forEach(function(o) {
      var vc = voteCounts[o.name] || { count:0, voters:[] };
      var pct = totalVotes > 0 ? Math.round((vc.count / totalVotes) * 100) : 0;
      html += '<div style="margin-bottom:0.5rem;">' +
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.2rem;">' +
          '<span style="font-size:0.82rem;color:var(--cream);">' + o.name;
      if (o.link) {
        html += ' <a href="' + o.link + '" target="_blank" style="color:var(--accent);font-size:0.7rem;text-decoration:none;border-bottom:1px solid rgba(201,149,107,0.3);"><i class="bi bi-box-arrow-up-right"></i></a>';
      }
      html += '</span>' +
          '<span style="font-size:0.7rem;color:var(--text-muted);">' + vc.count + ' vote' + (vc.count !== 1 ? 's' : '') + '</span>' +
        '</div>' +
        '<div style="height:6px;background:var(--border);border-radius:3px;overflow:hidden;">' +
          '<div style="height:100%;width:' + pct + '%;background:var(--accent);border-radius:3px;transition:width 0.3s;"></div>' +
        '</div>';
      if (vc.voters.length > 0) {
        html += '<div style="font-size:0.7rem;color:var(--text-muted);margin-top:0.1rem;">' + vc.voters.join(', ') + '</div>';
      }
      html += '</div>';
    });
    resultsDiv.innerHTML = html;
  });
}

function castVote(key) {
  var name = document.getElementById('vote-name-' + key).value;
  var choice = document.getElementById('vote-choice-' + key).value;
  if (!name || !choice) return;

  if (!travelData.votes[key]) travelData.votes[key] = { options:[], votes:{} };
  travelData.votes[key].votes[name] = choice;
  saveToCloud();
  renderVotes();
}

function addSuggestion(key) {
  var name = document.getElementById('suggest-name-' + key).value.trim();
  var link = document.getElementById('suggest-link-' + key).value.trim();
  if (!name) { alert('Please enter a restaurant name'); return; }

  if (!travelData.votes[key]) travelData.votes[key] = { options:[], votes:{} };
  // Check for duplicate against cloud AND defaults
  var defaults = (TRIP.defaultVotes && TRIP.defaultVotes[key]) || [];
  var allExisting = defaults.concat(travelData.votes[key].options);
  var exists = allExisting.some(function(o) { return o.name === name; });
  if (exists) { alert('Already suggested!'); return; }

  travelData.votes[key].options.push({ name: name, link: link || '' });
  saveToCloud();
  renderVotes();
  document.getElementById('suggest-name-' + key).value = '';
  document.getElementById('suggest-link-' + key).value = '';
}

// === OUTFITS GALLERY TAB ===
var outfitSlideIdx = 0;

function renderOutfitsGallery() {
  var gallery = document.getElementById('outfits-gallery');
  if (!gallery) return;

  var events = TRIP.outfitEvents || [];
  if (events.length === 0) return;

  // Clamp index
  if (outfitSlideIdx < 0) outfitSlideIdx = 0;
  if (outfitSlideIdx >= events.length) outfitSlideIdx = events.length - 1;

  var evt = events[outfitSlideIdx];
  var outfits = travelData.outfits[evt.key] || [];

  var html = '<div class="outfit-slideshow">';

  // Navigation header
  html += '<div class="outfit-slide-nav">' +
    '<button class="outfit-nav-btn" onclick="outfitSlidePrev()" ' + (outfitSlideIdx === 0 ? 'disabled' : '') + '>' +
      '<i class="bi bi-chevron-left"></i>' +
    '</button>' +
    '<div class="outfit-slide-header">' +
      '<div class="outfit-slide-day">' + evt.day + '</div>' +
      '<div class="outfit-slide-title">' + evt.label + '</div>' +
      '<div class="outfit-slide-counter">' + (outfitSlideIdx + 1) + ' / ' + events.length + '</div>' +
    '</div>' +
    '<button class="outfit-nav-btn" onclick="outfitSlideNext()" ' + (outfitSlideIdx === events.length - 1 ? 'disabled' : '') + '>' +
      '<i class="bi bi-chevron-right"></i>' +
    '</button>' +
  '</div>';

  // Slide content area
  html += '<div class="outfit-slide-content" id="outfit-slide-content">';

  if (outfits.length > 0) {
    html += '<div class="outfit-slide-grid">';
    outfits.forEach(function(o, i) {
      html += '<div class="outfit-slide-card">';
      if (o.image) {
        html += '<img src="' + o.image + '" class="outfit-slide-img" onclick="openOutfitLightbox(\'' + evt.key + '\',' + i + ')">';
      } else {
        html += '<div class="outfit-slide-img outfit-slide-placeholder"><i class="bi bi-camera" style="font-size:1.8rem;color:var(--text-muted);"></i></div>';
      }
      html += '<div class="outfit-slide-name">' + o.name + '</div>';
      if (o.desc) html += '<div class="outfit-slide-desc">' + o.desc + '</div>';
      html += '</div>';
    });
    html += '</div>';
  } else {
    html += '<div class="outfit-slide-empty">' +
      '<i class="bi bi-palette" style="font-size:2rem;color:var(--text-muted);display:block;margin-bottom:0.8rem;"></i>' +
      '<p style="color:var(--text-dim);font-size:0.9rem;">No outfits added for this event</p>' +
      '<p style="color:var(--text-muted);font-size:0.78rem;margin-top:0.3rem;">Add one from the day tab</p>' +
    '</div>';
  }

  html += '</div>';

  // Dot indicators
  html += '<div class="outfit-slide-dots">';
  events.forEach(function(e, idx) {
    var hasOutfits = (travelData.outfits[e.key] || []).length > 0;
    html += '<button class="outfit-dot' + (idx === outfitSlideIdx ? ' active' : '') + (hasOutfits ? ' has-content' : '') + '" onclick="outfitSlideGo(' + idx + ')"></button>';
  });
  html += '</div>';

  html += '</div>';
  gallery.innerHTML = html;
}

function outfitSlidePrev() {
  if (outfitSlideIdx <= 0) return;
  var content = document.getElementById('outfit-slide-content');
  if (content) {
    content.style.animation = 'slideOutRight 0.25s ease forwards';
    setTimeout(function() {
      outfitSlideIdx--;
      renderOutfitsGallery();
      var newContent = document.getElementById('outfit-slide-content');
      if (newContent) newContent.style.animation = 'slideInLeft 0.3s ease forwards';
    }, 250);
  } else {
    outfitSlideIdx--;
    renderOutfitsGallery();
  }
}

function outfitSlideNext() {
  var events = TRIP.outfitEvents || [];
  if (outfitSlideIdx >= events.length - 1) return;
  var content = document.getElementById('outfit-slide-content');
  if (content) {
    content.style.animation = 'slideOutLeft 0.25s ease forwards';
    setTimeout(function() {
      outfitSlideIdx++;
      renderOutfitsGallery();
      var newContent = document.getElementById('outfit-slide-content');
      if (newContent) newContent.style.animation = 'slideInRight 0.3s ease forwards';
    }, 250);
  } else {
    outfitSlideIdx++;
    renderOutfitsGallery();
  }
}

function outfitSlideGo(idx) {
  var dir = idx > outfitSlideIdx ? 'left' : 'right';
  var content = document.getElementById('outfit-slide-content');
  if (content && idx !== outfitSlideIdx) {
    content.style.animation = 'slideOut' + (dir === 'left' ? 'Left' : 'Right') + ' 0.25s ease forwards';
    setTimeout(function() {
      outfitSlideIdx = idx;
      renderOutfitsGallery();
      var newContent = document.getElementById('outfit-slide-content');
      if (newContent) newContent.style.animation = 'slideIn' + (dir === 'left' ? 'Right' : 'Left') + ' 0.3s ease forwards';
    }, 250);
  }
}

// === INIT ===
document.addEventListener('DOMContentLoaded', function() {
  // Small delay to ensure app.js renderAll() has completed
  setTimeout(function() {
    loadFromCloud();
  }, 800);
  // Auto-refresh every 30s
  setInterval(function() { loadFromCloud(); }, 30000);
});
