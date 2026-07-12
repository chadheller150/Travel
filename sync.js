// === Cloud Sync via JSONBin ===
// Using same master key as Budget app, separate bin for Travel data
const JSONBIN_KEY = '$2a$10$mwPdOYfA/eT386ORY/YvhOFBhGT2LlLt51.cfjB1gjidZ2sHpEN0K';
let TRAVEL_BIN_ID = localStorage.getItem('dirty30-bin-id') || '';

const CREW = ['Chad', 'Eric', 'Adriel', 'Jennilee', 'Clarissa', 'Elena', 'Lulu'];

// Default payment items
const DEFAULT_PAYMENTS = [
  { id: 'rental-gas', label: 'Rental Car + Gas (split 7)', amount: 48, due: '7/28', note: '$335 total / 7 — pay Chad' },
  { id: 'cabana', label: 'Surfcomber Cabana Day Pass', amount: 22, due: '7/25', note: 'Already paid by Chad — reimburse' },
  { id: 'boat', label: 'Boat Tour (Sun)', amount: 68, due: '7/24', note: 'Charges 7/24 — not yet paid' },
  { id: 'rhouse', label: 'R House Brunch (Sat)', amount: 60, due: '7/25', note: 'Pay at venue — $60/person' },
  { id: 'palace', label: 'Palace Brunch (Sun)', amount: 60, due: '7/26', note: 'Pay at venue — $60/person' },
  { id: 'cabana-food', label: 'Cabana Food+Drinks (split 7)', amount: 36, due: '7/27', note: '$250 min / 7 — pay day-of' },
];

// Default outfits structure
const DEFAULT_OUTFITS = {
  saturday_brunch: { event: 'Drag Brunch @ R House', day: 'Saturday', entries: {} },
  saturday_dinner: { event: 'Dinner Out', day: 'Saturday', entries: {} },
  saturday_clubs: { event: 'Club Crawl Night 1', day: 'Saturday', entries: {} },
  sunday_brunch: { event: 'Drag Brunch @ Palace', day: 'Sunday', entries: {} },
  sunday_boat: { event: 'Boat Day', day: 'Sunday', entries: {} },
  sunday_dinner: { event: 'KoKo Dinner', day: 'Sunday', entries: {} },
  sunday_clubs: { event: 'Birthday Theme Night', day: 'Sunday', entries: {} },
  monday_beach: { event: 'Surfcomber Beach Day', day: 'Monday', entries: {} },
  tuesday_brunch: { event: 'Final Brunch + Photos', day: 'Tuesday', entries: {} },
};

// Default dinner vote options
const DEFAULT_DINNER_OPTIONS = [
  { id: 'puerto_sagua', name: 'Puerto Sagua (Cuban)' },
  { id: 'il_pastaiolo', name: 'Il Pastaiolo (Pasta)' },
  { id: 'kalamata', name: 'Kalamata (Mediterranean)' },
  { id: 'la_leggenda', name: 'La Leggenda (Pizza)' },
  { id: 'thai_house', name: 'Thai House' },
  { id: 'papi_steak', name: 'Papi Steak (Splurge)' },
];

let travelData = {
  payments: DEFAULT_PAYMENTS,
  paid: {},
  outfits: DEFAULT_OUTFITS,
  dinnerVotes: {}, // { 'person_name': 'option_id' }
  dinnerOptions: DEFAULT_DINNER_OPTIONS,
  confirmations: [], // [{ id, title, image, addedAt }]
};

// === Init ===
async function initTravelSync() {
  if (TRAVEL_BIN_ID) {
    await loadFromCloud();
  } else {
    // Create a new bin
    try {
      const r = await fetch('https://api.jsonbin.io/v3/b', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Master-Key': JSONBIN_KEY, 'X-Bin-Name': 'dirty30-miami' },
        body: JSON.stringify(travelData)
      });
      if (r.ok) {
        const j = await r.json();
        TRAVEL_BIN_ID = j.metadata.id;
        localStorage.setItem('dirty30-bin-id', TRAVEL_BIN_ID);
      }
    } catch (e) { console.log('Cloud init failed, using local'); }
  }
  renderPayments();
  renderOutfits();
  renderDinnerVote();
  renderConfirmations();
}

async function saveToCloud() {
  if (!TRAVEL_BIN_ID) return;
  // Also save confirmations to localStorage as backup (JSONBin has 100KB limit)
  try { localStorage.setItem('dirty30-confirmations', JSON.stringify(travelData.confirmations || [])); } catch(e) {}
  // Debounce: wait 1 second after last change before saving
  if (saveToCloud._timeout) clearTimeout(saveToCloud._timeout);
  saveToCloud._timeout = setTimeout(async () => {
    try {
      // If data is too large, save without confirmations to cloud and keep them local-only
      const payload = JSON.stringify(travelData);
      if (payload.length > 90000) {
        const lite = { ...travelData, confirmations: [] };
        await fetch('https://api.jsonbin.io/v3/b/' + TRAVEL_BIN_ID, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'X-Master-Key': JSONBIN_KEY },
          body: JSON.stringify(lite)
        });
      } else {
        await fetch('https://api.jsonbin.io/v3/b/' + TRAVEL_BIN_ID, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'X-Master-Key': JSONBIN_KEY },
          body: payload
        });
      }
    } catch (e) { console.log('Save failed'); }
  }, 1000);
}

async function loadFromCloud() {
  if (!TRAVEL_BIN_ID) return;
  try {
    const r = await fetch('https://api.jsonbin.io/v3/b/' + TRAVEL_BIN_ID + '/latest', {
      headers: { 'X-Master-Key': JSONBIN_KEY }
    });
    if (r.ok) {
      const j = await r.json();
      if (j.record) {
        travelData = { ...travelData, ...j.record };
        // Always use code-defined payments as source of truth (amounts may update)
        travelData.payments = DEFAULT_PAYMENTS;
      }
    }
  } catch (e) { console.log('Load failed'); }
  // Merge localStorage confirmations (they may be larger than what cloud stores)
  try {
    const localConfs = JSON.parse(localStorage.getItem('dirty30-confirmations') || '[]');
    if (localConfs.length > (travelData.confirmations || []).length) {
      travelData.confirmations = localConfs;
    }
  } catch(e) {}
}
}

// === Payment Tracker ===
function renderPayments() {
  const container = document.getElementById('payment-tracker');
  if (!container) return;

  let html = '<div class="grid-2">';
  travelData.payments.forEach(item => {
    html += '<div class="card" style="padding:16px;">';
    html += '<h3 style="font-size:1em;">' + item.label + '</h3>';
    html += '<div class="meta">' + item.note + ' &bull; Due: ' + item.due + '</div>';
    html += '<div style="margin-top:10px;">';
    CREW.forEach(person => {
      const key = item.id + '_' + person;
      const paid = travelData.paid[key];
      const color = paid ? 'var(--success)' : 'var(--text-dim)';
      const icon = paid ? '✅' : '⬜';
      html += '<div class="payment-row" style="display:flex;justify-content:space-between;align-items:center;padding:4px 0;border-bottom:1px solid rgba(255,255,255,0.05);">';
      html += '<span style="font-size:0.85em;">' + person + '</span>';
      html += '<span style="display:flex;align-items:center;gap:6px;">';
      html += '<span style="color:var(--gold);font-weight:700;font-size:0.85em;">$' + item.amount + '</span>';
      html += '<button onclick="togglePaid(\'' + key + '\')" style="background:none;border:none;font-size:1.1em;cursor:pointer;">' + icon + '</button>';
      html += '</span></div>';
    });
    // Totals
    const paidCount = CREW.filter(p => travelData.paid[item.id + '_' + p]).length;
    html += '<div style="margin-top:8px;font-size:0.8em;color:var(--text-dim);">' + paidCount + '/' + CREW.length + ' paid &bull; $' + (paidCount * item.amount) + '/$' + (CREW.length * item.amount) + ' collected</div>';
    html += '</div></div>';
  });
  html += '</div>';
  container.innerHTML = html;
}

function togglePaid(key) {
  travelData.paid[key] = !travelData.paid[key];
  renderPayments();
  saveToCloud();
}

// === Outfit Section ===
function renderOutfits() {
  const containers = document.querySelectorAll('.outfit-section');
  containers.forEach(container => {
    const eventId = container.dataset.event;
    const outfitData = travelData.outfits[eventId];
    if (!outfitData) return;

    let html = '<details style="margin-top:10px;">';
    html += '<summary style="cursor:pointer;color:var(--neon-blue);font-weight:600;font-size:0.9em;">👗 Outfits for this event</summary>';
    html += '<div style="margin-top:10px;">';

    // Show existing entries
    const entries = outfitData.entries || {};
    const entryKeys = Object.keys(entries);
    entryKeys.forEach((person, idx) => {
      const entry = entries[person];
      html += '<div style="display:flex;gap:10px;align-items:flex-start;margin-bottom:10px;padding:8px;background:rgba(255,255,255,0.03);border-radius:10px;">';
      if (entry.image) {
        html += '<img src="' + entry.image + '" onclick="openLightbox(\'' + eventId + '\',' + idx + ')" style="width:60px;height:60px;object-fit:cover;border-radius:8px;cursor:pointer;border:2px solid var(--card-border);transition:border 0.2s;" onmouseover="this.style.borderColor=\'var(--accent)\'" onmouseout="this.style.borderColor=\'var(--card-border)\'">';
      }
      html += '<div><strong style="font-size:0.85em;color:var(--accent);">' + person + '</strong>';
      if (entry.description) html += '<p style="font-size:0.8em;color:var(--text-dim);margin-top:2px;">' + entry.description + '</p>';
      html += '</div></div>';
    });

    // Add outfit form
    html += '<div style="margin-top:8px;padding-top:8px;border-top:1px solid var(--card-border);">';
    html += '<select id="outfit-name-' + eventId + '" style="background:var(--card-bg);color:var(--text);border:1px solid var(--card-border);border-radius:8px;padding:6px 10px;font-size:0.85em;width:100%;margin-bottom:6px;">';
    CREW.forEach(p => { html += '<option value="' + p + '">' + p + '</option>'; });
    html += '</select>';
    html += '<input id="outfit-desc-' + eventId + '" placeholder="Describe your look..." style="background:var(--card-bg);color:var(--text);border:1px solid var(--card-border);border-radius:8px;padding:6px 10px;font-size:0.85em;width:100%;margin-bottom:6px;">';
    html += '<div style="display:flex;gap:6px;">';
    html += '<label style="flex:1;display:flex;align-items:center;justify-content:center;gap:4px;padding:8px;background:rgba(92,225,230,0.1);border:1px solid var(--neon-blue);border-radius:8px;cursor:pointer;font-size:0.8em;color:var(--neon-blue);">📷 Add Photo<input type="file" accept="image/*" onchange="handleOutfitPhoto(this,\'' + eventId + '\')" style="display:none;"></label>';
    html += '<button onclick="saveOutfit(\'' + eventId + '\')" style="flex:1;padding:8px;background:var(--accent);border:none;border-radius:8px;color:#fff;font-weight:600;font-size:0.8em;cursor:pointer;">Save Look</button>';
    html += '</div></div>';

    html += '</div></details>';
    container.innerHTML = html;
  });
}

let pendingOutfitPhoto = {};

function handleOutfitPhoto(input, eventId) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    // Resize to keep under 100KB JSONBin limit
    const img = new Image();
    img.onload = function() {
      const canvas = document.createElement('canvas');
      const maxSize = 200;
      let w = img.width, h = img.height;
      if (w > h) { h = h * maxSize / w; w = maxSize; }
      else { w = w * maxSize / h; h = maxSize; }
      canvas.width = w; canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      pendingOutfitPhoto[eventId] = canvas.toDataURL('image/jpeg', 0.7);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function saveOutfit(eventId) {
  const name = document.getElementById('outfit-name-' + eventId).value;
  const desc = document.getElementById('outfit-desc-' + eventId).value;
  if (!travelData.outfits[eventId].entries) travelData.outfits[eventId].entries = {};
  travelData.outfits[eventId].entries[name] = {
    description: desc,
    image: pendingOutfitPhoto[eventId] || ''
  };
  delete pendingOutfitPhoto[eventId];
  renderOutfits();
  saveToCloud();
  if (typeof showToast === 'function') showToast(name + "'s look saved!");
}

// === Lightbox for Outfit Photos ===
function openLightbox(eventId, startIdx) {
  const outfitData = travelData.outfits[eventId];
  if (!outfitData) return;
  const entries = outfitData.entries || {};
  const people = Object.keys(entries).filter(p => entries[p].image);
  if (people.length === 0) return;

  // Create overlay
  let overlay = document.getElementById('lightbox-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'lightbox-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,0.95);display:flex;flex-direction:column;align-items:center;justify-content:center;opacity:0;transition:opacity 0.3s;';
    document.body.appendChild(overlay);
  }
  overlay.style.opacity = '1';
  overlay.style.pointerEvents = 'auto';

  let currentIdx = startIdx;
  // Only show people who have images
  const imageIdx = people.indexOf(Object.keys(entries)[startIdx]);
  if (imageIdx >= 0) currentIdx = imageIdx;
  else currentIdx = 0;

  function render() {
    const person = people[currentIdx];
    const entry = entries[person];
    overlay.innerHTML = '';

    // Close button
    const close = document.createElement('button');
    close.innerHTML = '&times;';
    close.style.cssText = 'position:absolute;top:16px;right:20px;font-size:2em;color:#fff;background:none;border:none;cursor:pointer;z-index:10001;';
    close.onclick = closeLightbox;
    overlay.appendChild(close);

    // Person name + description
    const info = document.createElement('div');
    info.style.cssText = 'position:absolute;top:20px;left:0;right:0;text-align:center;z-index:10001;';
    info.innerHTML = '<div style="font-family:Outfit,sans-serif;font-weight:700;font-size:1.2em;color:var(--accent);">' + person + '</div>' +
      (entry.description ? '<div style="font-size:0.85em;color:var(--text-dim);margin-top:4px;">' + entry.description + '</div>' : '');
    overlay.appendChild(info);

    // Image
    const img = document.createElement('img');
    img.src = entry.image;
    img.style.cssText = 'max-width:90vw;max-height:70vh;object-fit:contain;border-radius:12px;box-shadow:0 8px 40px rgba(0,0,0,0.5);';
    overlay.appendChild(img);

    // Counter
    const counter = document.createElement('div');
    counter.style.cssText = 'position:absolute;bottom:20px;left:0;right:0;text-align:center;font-size:0.85em;color:var(--text-dim);font-family:Outfit,sans-serif;';
    counter.textContent = (currentIdx + 1) + ' / ' + people.length;
    overlay.appendChild(counter);

    // Nav arrows (if multiple)
    if (people.length > 1) {
      const prev = document.createElement('button');
      prev.innerHTML = '&#8249;';
      prev.style.cssText = 'position:absolute;left:12px;top:50%;transform:translateY(-50%);font-size:2.5em;color:#fff;background:rgba(255,255,255,0.1);border:none;border-radius:50%;width:44px;height:44px;cursor:pointer;display:flex;align-items:center;justify-content:center;';
      prev.onclick = (e) => { e.stopPropagation(); currentIdx = (currentIdx - 1 + people.length) % people.length; render(); };
      overlay.appendChild(prev);

      const next = document.createElement('button');
      next.innerHTML = '&#8250;';
      next.style.cssText = 'position:absolute;right:12px;top:50%;transform:translateY(-50%);font-size:2.5em;color:#fff;background:rgba(255,255,255,0.1);border:none;border-radius:50%;width:44px;height:44px;cursor:pointer;display:flex;align-items:center;justify-content:center;';
      next.onclick = (e) => { e.stopPropagation(); currentIdx = (currentIdx + 1) % people.length; render(); };
      overlay.appendChild(next);
    }

    // Tap overlay background to close
    overlay.onclick = (e) => { if (e.target === overlay) closeLightbox(); };

    // Swipe support for mobile
    let startX = 0;
    overlay.ontouchstart = (e) => { startX = e.touches[0].clientX; };
    overlay.ontouchend = (e) => {
      const diff = e.changedTouches[0].clientX - startX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) { currentIdx = (currentIdx - 1 + people.length) % people.length; }
        else { currentIdx = (currentIdx + 1) % people.length; }
        render();
      }
    };
  }

  render();

  // Escape key to close
  document.onkeydown = (e) => { if (e.key === 'Escape') closeLightbox(); };
}

function closeLightbox() {
  const overlay = document.getElementById('lightbox-overlay');
  if (overlay) {
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';
    setTimeout(() => { overlay.innerHTML = ''; }, 300);
  }
  document.onkeydown = null;
}

// === Dinner Voting ===
function renderDinnerVote() {
  const container = document.getElementById('dinner-vote');
  if (!container) return;

  const options = travelData.dinnerOptions || DEFAULT_DINNER_OPTIONS;
  const votes = travelData.dinnerVotes || {};

  // Count votes per option
  const voteCounts = {};
  options.forEach(o => { voteCounts[o.id] = []; });
  Object.keys(votes).forEach(person => {
    const optId = votes[person];
    if (voteCounts[optId]) voteCounts[optId].push(person);
  });

  // Sort by votes (most first)
  const sorted = [...options].sort((a, b) => (voteCounts[b.id] || []).length - (voteCounts[a.id] || []).length);

  let html = '<div style="font-weight:700;font-size:0.95em;margin-bottom:10px;">🗳️ Vote for Saturday Dinner</div>';

  sorted.forEach(opt => {
    const voters = voteCounts[opt.id] || [];
    const count = voters.length;
    const barWidth = count > 0 ? Math.max(count / CREW.length * 100, 8) : 0;
    html += '<div style="margin-bottom:8px;">';
    html += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:3px;">';
    html += '<span style="font-size:0.85em;font-weight:500;">' + opt.name + '</span>';
    html += '<span style="font-size:0.75em;color:var(--text-dim);">' + count + ' vote' + (count !== 1 ? 's' : '') + '</span>';
    html += '</div>';
    html += '<div style="height:22px;background:rgba(255,255,255,0.05);border-radius:6px;overflow:hidden;position:relative;">';
    if (barWidth > 0) {
      html += '<div style="height:100%;width:' + barWidth + '%;background:linear-gradient(90deg,var(--accent),var(--accent2));border-radius:6px;transition:width 0.3s;"></div>';
    }
    html += '</div>';
    if (voters.length > 0) {
      html += '<div style="font-size:0.7em;color:var(--text-dim);margin-top:2px;">' + voters.join(', ') + '</div>';
    }
    html += '</div>';
  });

  // Vote form
  html += '<div style="margin-top:14px;padding-top:12px;border-top:1px solid var(--card-border);">';
  html += '<div style="display:flex;gap:6px;flex-wrap:wrap;">';
  html += '<select id="vote-person" style="flex:1;min-width:100px;background:var(--card-bg);color:var(--text);border:1px solid var(--card-border);border-radius:8px;padding:8px;font-size:0.85em;">';
  CREW.forEach(p => { html += '<option value="' + p + '">' + p + '</option>'; });
  html += '</select>';
  html += '<select id="vote-choice" style="flex:2;min-width:140px;background:var(--card-bg);color:var(--text);border:1px solid var(--card-border);border-radius:8px;padding:8px;font-size:0.85em;">';
  options.forEach(o => { html += '<option value="' + o.id + '">' + o.name + '</option>'; });
  html += '</select>';
  html += '<button onclick="castVote()" style="padding:8px 14px;background:var(--accent);border:none;border-radius:8px;color:#fff;font-weight:600;font-size:0.85em;cursor:pointer;">Vote</button>';
  html += '</div>';

  // Add suggestion
  html += '<div style="display:flex;gap:6px;margin-top:8px;">';
  html += '<input id="new-suggestion" placeholder="Add a restaurant..." style="flex:1;background:var(--card-bg);color:var(--text);border:1px solid var(--card-border);border-radius:8px;padding:8px;font-size:0.85em;">';
  html += '<button onclick="addDinnerSuggestion()" style="padding:8px 12px;background:rgba(92,225,230,0.15);border:1px solid var(--neon-blue);border-radius:8px;color:var(--neon-blue);font-weight:600;font-size:0.85em;cursor:pointer;">+ Add</button>';
  html += '</div></div>';

  container.innerHTML = html;
}

function castVote() {
  const person = document.getElementById('vote-person').value;
  const choice = document.getElementById('vote-choice').value;
  if (!travelData.dinnerVotes) travelData.dinnerVotes = {};
  travelData.dinnerVotes[person] = choice;
  renderDinnerVote();
  saveToCloud();
  if (typeof showToast === 'function') showToast(person + ' voted!');
}

function addDinnerSuggestion() {
  const input = document.getElementById('new-suggestion');
  const name = input.value.trim();
  if (!name) return;
  const id = name.toLowerCase().replace(/[^a-z0-9]/g, '_');
  if (!travelData.dinnerOptions) travelData.dinnerOptions = [...DEFAULT_DINNER_OPTIONS];
  travelData.dinnerOptions.push({ id: id, name: name });
  input.value = '';
  renderDinnerVote();
  saveToCloud();
  if (typeof showToast === 'function') showToast('"' + name + '" added!');
}

// === Confirmations ===
function renderConfirmations() {
  const container = document.getElementById('confirmations-list');
  if (!container) return;

  const confs = travelData.confirmations || [];
  if (confs.length === 0) {
    container.innerHTML = '<p style="color:var(--text-dim);font-size:0.85em;text-align:center;padding:20px;">No confirmations uploaded yet. Add your first one below!</p>';
    return;
  }

  let html = '<div class="grid-2">';
  confs.forEach((conf, idx) => {
    html += '<div class="card" style="padding:14px;">';
    html += '<h3 style="font-size:0.95em;">' + conf.title + '</h3>';
    if (conf.image) {
      html += '<img src="' + conf.image + '" onclick="openConfirmationLightbox(' + idx + ')" style="width:100%;border-radius:10px;margin-top:8px;cursor:pointer;border:1px solid var(--card-border);">';
    }
    html += '<div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px;">';
    html += '<span style="font-size:0.7em;color:var(--text-dim);">' + (conf.addedAt || '') + '</span>';
    html += '<button onclick="deleteConfirmation(' + idx + ')" style="background:none;border:none;font-size:0.8em;color:var(--danger);cursor:pointer;">Delete</button>';
    html += '</div></div>';
  });
  html += '</div>';
  container.innerHTML = html;
}

function handleConfirmationUpload(input) {
  const file = input.files[0];
  if (!file) return;
  const title = document.getElementById('conf-title').value.trim() || 'Untitled';

  const reader = new FileReader();
  reader.onload = function(e) {
    // Resize for storage
    const img = new Image();
    img.onload = function() {
      const canvas = document.createElement('canvas');
      const maxSize = 400;
      let w = img.width, h = img.height;
      if (w > maxSize || h > maxSize) {
        if (w > h) { h = h * maxSize / w; w = maxSize; }
        else { w = w * maxSize / h; h = maxSize; }
      }
      canvas.width = w; canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.8);

      if (!travelData.confirmations) travelData.confirmations = [];
      travelData.confirmations.push({
        id: 'conf_' + Date.now(),
        title: title,
        image: dataUrl,
        addedAt: new Date().toLocaleDateString()
      });

      document.getElementById('conf-title').value = '';
      input.value = '';
      renderConfirmations();
      saveToCloud();
      if (typeof showToast === 'function') showToast('"' + title + '" uploaded!');
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function deleteConfirmation(idx) {
  if (!confirm('Delete this confirmation?')) return;
  travelData.confirmations.splice(idx, 1);
  renderConfirmations();
  saveToCloud();
}

function openConfirmationLightbox(startIdx) {
  const confs = travelData.confirmations || [];
  if (confs.length === 0) return;

  let overlay = document.getElementById('lightbox-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'lightbox-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,0.95);display:flex;flex-direction:column;align-items:center;justify-content:center;opacity:0;transition:opacity 0.3s;';
    document.body.appendChild(overlay);
  }
  overlay.style.opacity = '1';
  overlay.style.pointerEvents = 'auto';

  let currentIdx = startIdx;

  function render() {
    const conf = confs[currentIdx];
    overlay.innerHTML = '';

    const close = document.createElement('button');
    close.innerHTML = '&times;';
    close.style.cssText = 'position:absolute;top:16px;right:20px;font-size:2em;color:#fff;background:none;border:none;cursor:pointer;z-index:10001;';
    close.onclick = closeLightbox;
    overlay.appendChild(close);

    const info = document.createElement('div');
    info.style.cssText = 'position:absolute;top:20px;left:0;right:0;text-align:center;z-index:10001;';
    info.innerHTML = '<div style="font-family:Outfit,sans-serif;font-weight:700;font-size:1.1em;color:var(--neon-blue);">' + conf.title + '</div>';
    overlay.appendChild(info);

    const img = document.createElement('img');
    img.src = conf.image;
    img.style.cssText = 'max-width:92vw;max-height:75vh;object-fit:contain;border-radius:12px;box-shadow:0 8px 40px rgba(0,0,0,0.5);';
    overlay.appendChild(img);

    const counter = document.createElement('div');
    counter.style.cssText = 'position:absolute;bottom:20px;left:0;right:0;text-align:center;font-size:0.85em;color:var(--text-dim);font-family:Outfit,sans-serif;';
    counter.textContent = (currentIdx + 1) + ' / ' + confs.length;
    overlay.appendChild(counter);

    if (confs.length > 1) {
      const prev = document.createElement('button');
      prev.innerHTML = '&#8249;';
      prev.style.cssText = 'position:absolute;left:12px;top:50%;transform:translateY(-50%);font-size:2.5em;color:#fff;background:rgba(255,255,255,0.1);border:none;border-radius:50%;width:44px;height:44px;cursor:pointer;display:flex;align-items:center;justify-content:center;';
      prev.onclick = (e) => { e.stopPropagation(); currentIdx = (currentIdx - 1 + confs.length) % confs.length; render(); };
      overlay.appendChild(prev);

      const next = document.createElement('button');
      next.innerHTML = '&#8250;';
      next.style.cssText = 'position:absolute;right:12px;top:50%;transform:translateY(-50%);font-size:2.5em;color:#fff;background:rgba(255,255,255,0.1);border:none;border-radius:50%;width:44px;height:44px;cursor:pointer;display:flex;align-items:center;justify-content:center;';
      next.onclick = (e) => { e.stopPropagation(); currentIdx = (currentIdx + 1) % confs.length; render(); };
      overlay.appendChild(next);
    }

    overlay.onclick = (e) => { if (e.target === overlay) closeLightbox(); };
    let startX = 0;
    overlay.ontouchstart = (e) => { startX = e.touches[0].clientX; };
    overlay.ontouchend = (e) => {
      const diff = e.changedTouches[0].clientX - startX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) currentIdx = (currentIdx - 1 + confs.length) % confs.length;
        else currentIdx = (currentIdx + 1) % confs.length;
        render();
      }
    };
  }

  render();
  document.onkeydown = (e) => { if (e.key === 'Escape') closeLightbox(); };
}

// === Crew Profile Popup ===
const CREW_EMOJIS = { Chad: '🎂', Eric: '💜', Adriel: '✨', Jennilee: '💫', Clarissa: '🌟', Elena: '⭐', Lulu: '🌸' };
const CREW_PHOTOS = {}; // Will store profile pics from cloud: { 'Chad': 'data:image/...' }

function openCrewProfile(person) {
  let overlay = document.getElementById('lightbox-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'lightbox-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,0.95);display:flex;flex-direction:column;align-items:center;justify-content:center;opacity:0;transition:opacity 0.3s;';
    document.body.appendChild(overlay);
  }
  overlay.style.opacity = '1';
  overlay.style.pointerEvents = 'auto';
  overlay.onclick = (e) => { if (e.target === overlay) closeLightbox(); };
  document.onkeydown = (e) => { if (e.key === 'Escape') closeLightbox(); };

  const emoji = CREW_EMOJIS[person] || '👤';
  const profilePic = (travelData.profilePics && travelData.profilePics[person]) || '';

  // Gather outfits for this person
  const outfits = [];
  const outfitData = travelData.outfits || {};
  Object.keys(outfitData).forEach(eventId => {
    const evt = outfitData[eventId];
    if (evt.entries && evt.entries[person]) {
      outfits.push({ event: evt.event, day: evt.day, ...evt.entries[person] });
    }
  });

  // Gather payment status
  const payments = [];
  (travelData.payments || DEFAULT_PAYMENTS).forEach(item => {
    const key = item.id + '_' + person;
    const paid = travelData.paid && travelData.paid[key];
    payments.push({ label: item.label, amount: item.amount, paid: paid });
  });

  const totalOwed = payments.reduce((sum, p) => sum + (p.paid ? 0 : p.amount), 0);
  const totalPaid = payments.reduce((sum, p) => sum + (p.paid ? p.amount : 0), 0);

  let html = '<div style="max-width:400px;width:90vw;max-height:85vh;overflow-y:auto;background:var(--card-bg);border:1px solid var(--card-border);border-radius:20px;padding:24px;position:relative;">';

  // Close button
  html += '<button onclick="closeLightbox()" style="position:absolute;top:12px;right:16px;background:none;border:none;color:var(--text);font-size:1.5em;cursor:pointer;">&times;</button>';

  // Profile header
  html += '<div style="text-align:center;margin-bottom:16px;">';
  if (profilePic) {
    html += '<img src="' + profilePic + '" style="width:80px;height:80px;border-radius:50%;object-fit:cover;border:3px solid var(--accent);margin-bottom:8px;">';
  } else {
    html += '<div style="width:80px;height:80px;border-radius:50%;background:rgba(255,126,179,0.15);border:3px solid var(--accent);display:flex;align-items:center;justify-content:center;font-size:2.5em;margin:0 auto 8px;">' + emoji + '</div>';
  }
  html += '<div style="font-size:1.3em;font-weight:800;">' + person + '</div>';

  // Upload profile pic option
  html += '<label style="display:inline-flex;align-items:center;gap:4px;margin-top:6px;padding:4px 10px;background:rgba(92,225,230,0.1);border:1px solid var(--neon-blue);border-radius:8px;cursor:pointer;font-size:0.75em;color:var(--neon-blue);">📷 Set Photo<input type="file" accept="image/*" onchange="setProfilePic(this,\'' + person + '\')" style="display:none;"></label>';
  html += '</div>';

  // Payment summary
  html += '<div style="margin-bottom:16px;padding:12px;background:rgba(255,255,255,0.03);border-radius:12px;">';
  html += '<div style="font-weight:700;font-size:0.95em;margin-bottom:8px;">💳 Payments</div>';
  payments.forEach(p => {
    const icon = p.paid ? '✅' : '⬜';
    const color = p.paid ? 'var(--success)' : 'var(--text-dim)';
    html += '<div style="display:flex;justify-content:space-between;align-items:center;padding:4px 0;font-size:0.85em;">';
    html += '<span style="color:' + color + ';">' + icon + ' ' + p.label + '</span>';
    html += '<span style="font-weight:700;color:var(--gold);">$' + p.amount + '</span>';
    html += '</div>';
  });
  html += '<div style="margin-top:8px;padding-top:8px;border-top:1px solid var(--card-border);display:flex;justify-content:space-between;font-size:0.85em;">';
  html += '<span style="color:var(--success);">Paid: $' + totalPaid + '</span>';
  html += '<span style="color:var(--danger);">Owes: $' + totalOwed + '</span>';
  html += '</div></div>';

  // Outfits
  html += '<div style="padding:12px;background:rgba(255,255,255,0.03);border-radius:12px;">';
  html += '<div style="font-weight:700;font-size:0.95em;margin-bottom:8px;">👗 Outfits</div>';
  if (outfits.length === 0) {
    html += '<p style="font-size:0.8em;color:var(--text-dim);">No outfits added yet.</p>';
  } else {
    outfits.forEach(o => {
      html += '<div style="display:flex;gap:10px;align-items:flex-start;margin-bottom:10px;padding:8px;background:rgba(255,255,255,0.02);border-radius:8px;">';
      if (o.image) {
        html += '<img src="' + o.image + '" style="width:50px;height:50px;object-fit:cover;border-radius:6px;">';
      }
      html += '<div><div style="font-size:0.8em;font-weight:600;color:var(--accent);">' + o.day + ' — ' + o.event + '</div>';
      if (o.description) html += '<div style="font-size:0.75em;color:var(--text-dim);margin-top:2px;">' + o.description + '</div>';
      html += '</div></div>';
    });
  }
  html += '</div>';

  html += '</div>';
  overlay.innerHTML = html;
}

function setProfilePic(input, person) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      const canvas = document.createElement('canvas');
      const size = 150;
      canvas.width = size; canvas.height = size;
      // Center crop
      const min = Math.min(img.width, img.height);
      const sx = (img.width - min) / 2, sy = (img.height - min) / 2;
      canvas.getContext('2d').drawImage(img, sx, sy, min, min, 0, 0, size, size);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
      if (!travelData.profilePics) travelData.profilePics = {};
      travelData.profilePics[person] = dataUrl;
      saveToCloud();
      openCrewProfile(person); // Re-render
      if (typeof showToast === 'function') showToast(person + "'s photo set!");
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// === Init on load ===
document.addEventListener('DOMContentLoaded', initTravelSync);

// Auto-refresh cloud data every 30 seconds for real-time updates
setInterval(async () => {
  await loadFromCloud();
  renderPayments();
  renderOutfits();
  renderDinnerVote();
  renderConfirmations();
}, 30000);
