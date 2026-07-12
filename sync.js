// === Cloud Sync via JSONBin ===
// Using same master key as Budget app, separate bin for Travel data
const JSONBIN_KEY = '$2a$10$mwPdOYfA/eT386ORY/YvhOFBhGT2LlLt51.cfjB1gjidZ2sHpEN0K';
let TRAVEL_BIN_ID = localStorage.getItem('dirty30-bin-id') || '';

const CREW = ['Chad', 'Eric', 'Adriel', 'Jennilee', 'Clarissa', 'Elena', 'Lulu'];

// Default payment items
const DEFAULT_PAYMENTS = [
  { id: 'boat', label: 'Boat Tour (Sun)', amount: 68, due: '7/24', note: 'Charged to card 7/24' },
  { id: 'cabana', label: 'Surfcomber Cabana (Mon)', amount: 22, due: '7/25', note: 'Day pass' },
  { id: 'cabana-food', label: 'Cabana Min Spend (split 7)', amount: 36, due: '7/27', note: '$250 total / 7' },
  { id: 'rhouse', label: 'R House Brunch (Sat)', amount: 72, due: '7/25', note: '$60 + 20% grat' },
  { id: 'palace', label: 'Palace Brunch (Sun)', amount: 45, due: '7/26', note: 'Bottomless' },
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

let travelData = {
  payments: DEFAULT_PAYMENTS,
  paid: {}, // { 'boat_Chad': true, 'boat_Eric': true, ... }
  outfits: DEFAULT_OUTFITS,
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
}

async function saveToCloud() {
  if (!TRAVEL_BIN_ID) return;
  try {
    await fetch('https://api.jsonbin.io/v3/b/' + TRAVEL_BIN_ID, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'X-Master-Key': JSONBIN_KEY },
      body: JSON.stringify(travelData)
    });
  } catch (e) { console.log('Save failed'); }
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
      }
    }
  } catch (e) { console.log('Load failed'); }
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
    Object.keys(entries).forEach(person => {
      const entry = entries[person];
      html += '<div style="display:flex;gap:10px;align-items:flex-start;margin-bottom:10px;padding:8px;background:rgba(255,255,255,0.03);border-radius:10px;">';
      if (entry.image) {
        html += '<img src="' + entry.image + '" style="width:60px;height:60px;object-fit:cover;border-radius:8px;">';
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

// === Init on load ===
document.addEventListener('DOMContentLoaded', initTravelSync);
