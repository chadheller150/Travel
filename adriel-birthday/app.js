/* ============================================================
   APP.JS — Main rendering logic
   ============================================================ */

// Tab labels for top bar
var TAB_LABELS = {
  overview:'Overview', day1:'Tue 10/20', day2:'Wed 10/21', day3:'Thu 10/22',
  day4:'Fri 10/23', day5:'Sat 10/24', map:'Map', dining:'Dining Guide',
  nightlife:'Nightlife', logistics:'Logistics', budget:'Budget'
};

document.addEventListener('DOMContentLoaded', function() {
  // Loader
  setTimeout(function() {
    document.getElementById('loader').style.opacity = '0';
    setTimeout(function() {
      document.getElementById('loader').style.display = 'none';
      document.getElementById('app').style.display = 'block';
    }, 500);
  }, 2400);

  // Menu navigation
  var menuItems = document.querySelectorAll('.menu-item');
  menuItems.forEach(function(btn) {
    btn.addEventListener('click', function() {
      menuItems.forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      showTab(btn.dataset.tab);
      toggleMenu(); // close menu after selection
    });
  });

  // Initial render
  renderAll();
  showTab('overview');

  // Keyboard shortcuts
  var TAB_ORDER = ['overview','day1','day2','day3','day4','day5','map','dining','nightlife','logistics','budget'];
  var currentTabIdx = 0;

  document.addEventListener('keydown', function(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.contentEditable === 'true') return;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      currentTabIdx = Math.min(currentTabIdx + 1, TAB_ORDER.length - 1);
      switchToTab(currentTabIdx);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      currentTabIdx = Math.max(currentTabIdx - 1, 0);
      switchToTab(currentTabIdx);
    } else if (e.key === 'm' || e.key === 'M') {
      toggleMenu();
    } else if (e.key === 'Escape') {
      var popup = document.getElementById('crew-popup');
      if (popup) popup.remove();
      var lb = document.getElementById('lightbox');
      if (lb) lb.classList.remove('open');
      var menu = document.getElementById('side-menu');
      if (menu.classList.contains('open')) toggleMenu();
    }
  });

  function switchToTab(idx) {
    var tab = TAB_ORDER[idx];
    var menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(function(b) { b.classList.remove('active'); });
    menuItems.forEach(function(b) { if (b.dataset.tab === tab) b.classList.add('active'); });
    showTab(tab);
  }

  // Swipe gestures for mobile tab switching
  var touchStartX = 0;
  document.addEventListener('touchstart', function(e) { touchStartX = e.touches[0].clientX; });
  document.addEventListener('touchend', function(e) {
    var diff = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(diff) < 60) return;
    if (diff < 0) {
      currentTabIdx = Math.min(currentTabIdx + 1, TAB_ORDER.length - 1);
    } else {
      currentTabIdx = Math.max(currentTabIdx - 1, 0);
    }
    switchToTab(currentTabIdx);
  });
});

function toggleMenu() {
  var menu = document.getElementById('side-menu');
  var overlay = document.getElementById('menu-overlay');
  var hamburger = document.getElementById('hamburger');
  menu.classList.toggle('open');
  overlay.classList.toggle('open');
  hamburger.classList.toggle('open');
}

function showTab(tab) {
  var sections = document.querySelectorAll('.section');
  sections.forEach(function(s) { s.classList.remove('active'); });
  var el = document.getElementById('tab-' + tab);
  if (el) {
    el.classList.remove('active');
    void el.offsetWidth;
    el.classList.add('active');
  }
  // Update top bar title
  var title = document.getElementById('top-bar-title');
  if (title && TAB_LABELS[tab]) title.textContent = TAB_LABELS[tab];
  // Init map when map tab is shown
  if (tab === 'map' && typeof initMap === 'function' && !window._mapInit) {
    setTimeout(initMap, 100);
    window._mapInit = true;
  }
}

function renderAll() {
  var content = document.getElementById('content');
  content.innerHTML = '';
  content.appendChild(renderOverview());
  content.appendChild(renderDay('day1', TRIP.days.day1));
  content.appendChild(renderDay('day2', TRIP.days.day2));
  content.appendChild(renderDay('day3', TRIP.days.day3));
  content.appendChild(renderDay('day4', TRIP.days.day4));
  content.appendChild(renderDay('day5', TRIP.days.day5));
  content.appendChild(renderMapSection());
  content.appendChild(renderDining());
  content.appendChild(renderNightlife());
  content.appendChild(renderLogistics());
  content.appendChild(renderBudget());
}

/* === OVERVIEW === */
function renderOverview() {
  var s = createSection('overview', 'Trip Overview', 'The essentials at a glance');
  var grid = el('div', 'card-grid');

  // Crew card
  var crew = el('div', 'card');
  crew.innerHTML = '<div class="card-label"><i class="bi bi-people"></i> The Crew</div><h3>5 Friends, 2 Cities</h3>';
  var badges = el('div', 'crew-grid');
  TRIP.crew.forEach(function(c) {
    var b = el('div', 'crew-badge' + (c.name === 'Adriel' ? ' birthday' : ''));
    var initials = c.name.charAt(0);
    b.innerHTML = '<div class="crew-initial">' + initials + '</div><span>' + c.name + '</span>';
    b.style.cursor = 'pointer';
    b.onclick = (function(person) { return function() { openCrewProfile(person); }; })(c.name);
    badges.appendChild(b);
  });
  crew.appendChild(badges);
  grid.appendChild(crew);

  // Flight Out
  var fo = el('div', 'card');
  fo.innerHTML = '<div class="card-label"><i class="bi bi-airplane"></i> Flight Out</div>' +
    '<h3>' + TRIP.flights.outbound.fromCity + ' &rarr; ' + TRIP.flights.outbound.toCity + '</h3>' +
    '<div class="card-detail"><i class="bi bi-calendar3"></i> ' + TRIP.flights.outbound.date + '</div>' +
    '<div class="card-detail"><i class="bi bi-clock"></i> Depart ' + TRIP.flights.outbound.depart + ' &rarr; Arrive ' + TRIP.flights.outbound.arrive + '</div>' +
    '<div class="card-detail"><i class="bi bi-stopwatch"></i> ' + TRIP.flights.outbound.duration + '</div>';
  grid.appendChild(fo);

  // Flight Return
  var fr = el('div', 'card');
  fr.innerHTML = '<div class="card-label"><i class="bi bi-airplane"></i> Flight Home</div>' +
    '<h3>' + TRIP.flights.returning.fromCity + ' &rarr; ' + TRIP.flights.returning.toCity + '</h3>' +
    '<div class="card-detail"><i class="bi bi-calendar3"></i> ' + TRIP.flights.returning.date + '</div>' +
    '<div class="card-detail"><i class="bi bi-clock"></i> Depart ' + TRIP.flights.returning.depart + ' &rarr; Arrive ' + TRIP.flights.returning.arrive + '</div>' +
    '<div class="card-detail"><i class="bi bi-stopwatch"></i> ' + TRIP.flights.returning.duration + '</div>';
  grid.appendChild(fr);

  // Train
  var tr = el('div', 'card');
  tr.innerHTML = '<div class="card-label"><i class="bi bi-train-front"></i> VIA Rail</div>' +
    '<h3>' + TRIP.train.route + '</h3>' +
    '<div class="card-detail"><i class="bi bi-calendar3"></i> ' + TRIP.train.date + '</div>' +
    '<div class="card-detail"><i class="bi bi-clock"></i> Depart ' + TRIP.train.depart + ' &rarr; Arrive ' + TRIP.train.arrive + '</div>' +
    '<div class="card-detail"><i class="bi bi-stopwatch"></i> ' + TRIP.train.duration + '</div>' +
    '<div class="card-detail"><i class="bi bi-wallet2"></i> ' + TRIP.train.price + '</div>';
  grid.appendChild(tr);

  // Montreal Lodging
  var ml = el('div', 'card');
  ml.innerHTML = '<div class="card-label"><i class="bi bi-house"></i> Montreal Home Base</div>' +
    '<h3>5945 Rue Bergevin</h3>' +
    '<div class="card-detail"><i class="bi bi-calendar3"></i> ' + TRIP.lodging.checkin + '</div>' +
    '<div class="card-detail"><i class="bi bi-key"></i> Checkout: ' + TRIP.lodging.checkout + '</div>' +
    '<div class="card-detail"><i class="bi bi-geo-alt"></i> ' + TRIP.lodging.note + '</div>';
  grid.appendChild(ml);

  // Rental Car
  var rc = el('div', 'card');
  rc.innerHTML = '<div class="card-label"><i class="bi bi-car-front"></i> Rental Car</div>' +
    '<h3>Montreal &mdash; ' + TRIP.rental.dates + '</h3>' +
    '<div class="card-detail"><i class="bi bi-wallet2"></i> ' + TRIP.rental.est + '/day est.</div>' +
    '<p style="margin-top:0.5rem;">' + TRIP.rental.purpose + '</p>';
  grid.appendChild(rc);

  // Concert
  var cc = el('div', 'card');
  cc.innerHTML = '<div class="card-label"><i class="bi bi-music-note-beamed"></i> Concert</div>' +
    '<h3>Olivia Rodrigo</h3>' +
    '<div class="card-detail"><i class="bi bi-calendar3"></i> Thu Oct 22 &mdash; 7:00 PM</div>' +
    '<div class="card-detail"><i class="bi bi-geo-alt"></i> Centre Bell, Montreal</div>' +
    '<div class="card-detail"><i class="bi bi-ticket-perforated"></i> Jessica + Adriel</div>';
  grid.appendChild(cc);

  s.appendChild(grid);
  return s;
}

/* === DAY RENDERING === */
function renderDay(id, day) {
  var tabId = id.replace('day', 'day');
  var num = id.replace('day', '');
  var s = createSection('day' + num, day.title, day.date + ' — ' + day.city);
  var tl = el('div', 'timeline');

  day.items.forEach(function(item, i) {
    var t = el('div', 'tl-item' + (item.tag === 'concert' ? ' highlight' : ''));
    t.style.animationDelay = (i * 0.08) + 's';
    var html = '<div class="tl-time">' + item.time + '</div>' +
      '<div class="tl-title">' + item.title + '</div>' +
      '<div class="tl-desc">' + item.desc + '</div>';
    if (item.tag) {
      html += '<span class="tl-tag ' + item.tag + '">' + item.tag + '</span>';
    }
    if (item.drive) {
      html += '<div class="drive-badge">🚗 ' + item.drive + '</div>';
    }
    t.innerHTML = html;

    // Add outfit collapsible
    if (item.tag === 'food' || item.tag === 'activity' || item.tag === 'concert') {
      var outfitDiv = el('div', 'collapsible');
      outfitDiv.setAttribute('data-outfit', id + '-' + i);
      outfitDiv.innerHTML = '<button class="collapsible-toggle" onclick="toggleCollapsible(this)">' +
        '<i class="bi bi-palette"></i> Outfit ideas <span class="arrow">&#9662;</span></button>' +
        '<div class="collapsible-body" id="outfit-' + id + '-' + i + '"></div>';
      t.appendChild(outfitDiv);
    }

    // Add food vote collapsible for food items
    if (item.tag === 'food') {
      var voteKey = id + '-food-' + i;
      var voteDiv = el('div', 'collapsible');
      voteDiv.setAttribute('data-vote', voteKey);
      voteDiv.innerHTML = '<button class="collapsible-toggle" onclick="toggleCollapsible(this)">' +
        '<i class="bi bi-hand-thumbs-up"></i> Vote + Suggest <span class="arrow">&#9662;</span></button>' +
        '<div class="collapsible-body" id="vote-' + voteKey + '"></div>';
      t.appendChild(voteDiv);
    }

    tl.appendChild(t);
  });

  s.appendChild(tl);
  return s;
}

/* === MAP === */
function renderMapSection() {
  var s = createSection('map', 'Trip Map', 'All locations across both cities');
  s.innerHTML += '<div id="map-container"></div>';
  return s;
}

/* === DINING === */
function renderDining() {
  var s = createSection('dining', 'Dining Guide', 'Curated picks for every meal');

  // Toronto
  var th = el('h2', '');
  th.style.cssText = 'font-family:Cormorant Garamond,serif;font-size:1.5rem;color:var(--cream);margin-bottom:1rem;';
  th.textContent = 'Toronto';
  s.appendChild(th);

  TRIP.dining.toronto.forEach(function(v) {
    s.appendChild(makeVenueCard(v));
  });

  // Montreal
  var mh = el('h2', '');
  mh.style.cssText = 'font-family:Cormorant Garamond,serif;font-size:1.5rem;color:var(--cream);margin:2rem 0 1rem;';
  mh.textContent = 'Montreal';
  s.appendChild(mh);

  TRIP.dining.montreal.forEach(function(v) {
    s.appendChild(makeVenueCard(v));
  });

  return s;
}

function makeVenueCard(v) {
  var c = el('div', 'venue-card');
  c.innerHTML = '<h3>' + v.name + '</h3>' +
    '<div class="venue-meta">' +
      '<span><i class="bi bi-egg-fried"></i> ' + v.type + '</span>' +
      '<span><i class="bi bi-wallet2"></i> ' + v.price + '</span>' +
      '<span><i class="bi bi-geo-alt"></i> ' + v.neighborhood + '</span>' +
      (v.cuisine ? '<span><i class="bi bi-tag"></i> ' + v.cuisine + '</span>' : '') +
    '</div>' +
    '<div class="venue-desc">' + v.desc + '</div>';
  return c;
}

/* === NIGHTLIFE === */
function renderNightlife() {
  var s = createSection('nightlife', 'Nightlife', 'Where to go after dark');

  var th = el('h2', '');
  th.style.cssText = 'font-family:Cormorant Garamond,serif;font-size:1.5rem;color:var(--cream);margin-bottom:1rem;';
  th.textContent = 'Toronto — Church-Wellesley Village';
  s.appendChild(th);

  TRIP.nightlife.toronto.forEach(function(v) {
    var c = el('div', 'venue-card');
    c.innerHTML = '<h3>' + v.name + '</h3>' +
      '<div class="venue-meta">' +
        '<span><i class="bi bi-stars"></i> ' + v.type + '</span>' +
        '<span><i class="bi bi-ticket-perforated"></i> ' + v.cover + '</span>' +
        '<span><i class="bi bi-clock"></i> ' + v.hours + '</span>' +
      '</div>' +
      '<div class="venue-desc">' + v.desc + '</div>';
    s.appendChild(c);
  });

  var mh = el('h2', '');
  mh.style.cssText = 'font-family:Cormorant Garamond,serif;font-size:1.5rem;color:var(--cream);margin:2rem 0 1rem;';
  mh.textContent = 'Montreal — Le Village';
  s.appendChild(mh);

  TRIP.nightlife.montreal.forEach(function(v) {
    var c = el('div', 'venue-card');
    c.innerHTML = '<h3>' + v.name + '</h3>' +
      '<div class="venue-meta">' +
        '<span><i class="bi bi-stars"></i> ' + v.type + '</span>' +
        '<span><i class="bi bi-ticket-perforated"></i> ' + v.cover + '</span>' +
        '<span><i class="bi bi-clock"></i> ' + v.hours + '</span>' +
      '</div>' +
      '<div class="venue-desc">' + v.desc + '</div>';
    s.appendChild(c);
  });

  return s;
}

/* === LOGISTICS === */
function renderLogistics() {
  var s = createSection('logistics', 'Logistics', 'Getting around + pro tips');
  var html = '<div class="card-grid">';

  // Toronto transport
  html += '<div class="card"><div class="card-label"><i class="bi bi-train-front"></i> Getting Around Toronto</div>' +
    '<h3>Transit + Walking</h3>' +
    '<p>UP Express from airport to Union Station: 25 min, CA$12.35<br>' +
    'TTC subway: CA$3.35/ride, day pass CA$13.50<br>' +
    'Uber/Lyft widely available<br>' +
    'Downtown core is very walkable</p></div>';

  // Montreal transport
  html += '<div class="card"><div class="card-label"><i class="bi bi-car-front"></i> Getting Around Montreal</div>' +
    '<h3>Metro + Rental Car</h3>' +
    '<p>STM Metro: CA$3.75/ride<br>' +
    'Old Montreal, Plateau, Le Village all walkable<br>' +
    'Rental car Oct 23-24 for exploring further out + airport<br>' +
    'Parking downtown: CA$15-30/day</p></div>';

  // Weather
  html += '<div class="card"><div class="card-label"><i class="bi bi-cloud-sun"></i> October Weather</div>' +
    '<h3>Pack Layers!</h3>' +
    '<p>Toronto: 5-14C (41-57F) — crisp fall weather<br>' +
    'Montreal: 3-12C (37-54F) — slightly cooler<br>' +
    'Bring a warm jacket, layers, comfortable walking shoes<br>' +
    'Rain is possible — pack an umbrella</p></div>';

  // Tips
  html += '<div class="card"><div class="card-label"><i class="bi bi-lightbulb"></i> Pro Tips</div>' +
    '<h3>Good to Know</h3>' +
    '<p>Canada uses CAD (roughly 0.73 USD)<br>' +
    'Tipping: 15-20% at restaurants<br>' +
    'Montreal is primarily French-speaking (English widely understood)<br>' +
    'Drinking age: 19 in Ontario, 18 in Quebec<br>' +
    'Poutine, bagels, and smoked meat are Montreal musts</p></div>';

  html += '</div>';
  s.innerHTML += html;
  return s;
}

/* === CONFIRMATIONS === */
function renderConfirmations() {
  var s = createSection('confirmations', 'Confirmations', 'All your bookings in one place');
  s.innerHTML += '<div class="conf-upload">' +
    '<input type="text" id="conf-label" placeholder="Label (e.g. Flight Booking)">' +
    '<br><input type="file" id="conf-files" accept="image/*" multiple>' +
    '<br><button class="upload-btn" onclick="uploadConfirmation()"><i class="bi bi-upload"></i> Upload</button>' +
    '</div>' +
    '<div class="conf-grid" id="conf-grid"></div>';
  return s;
}

/* === BUDGET === */
function renderBudget() {
  var s = createSection('budget', 'Budget', 'Estimated costs per person');
  var grid = el('div', 'budget-grid');

  TRIP.budget.forEach(function(b) {
    var item = el('div', 'budget-item');
    item.innerHTML = '<div class="amount">' + b.est + '</div>' +
      '<div class="label">' + b.item + '</div>' +
      '<p style="font-size:0.78rem;color:var(--text-muted);margin-top:0.3rem;">' +
      b.per + (b.note ? ' — ' + b.note : '') + '</p>';
    grid.appendChild(item);
  });

  s.appendChild(grid);

  // Payment tracker
  s.innerHTML += '<div class="payment-section">' +
    '<h2 style="font-family:Cormorant Garamond,serif;font-size:1.5rem;color:var(--cream);margin:2rem 0 1rem;">Payment Tracker</h2>' +
    '<div id="payment-tracker"></div></div>';

  return s;
}

/* === HELPERS === */
function el(tag, cls) {
  var e = document.createElement(tag);
  if (cls) e.className = cls;
  return e;
}

function createSection(id, title, subtitle) {
  var s = el('section', 'section');
  s.id = 'tab-' + id;
  s.innerHTML = '<h1 class="section-title">' + title + '</h1>' +
    '<p class="section-sub">' + subtitle + '</p>';
  return s;
}

function toggleCollapsible(btn) {
  btn.classList.toggle('open');
  var body = btn.nextElementSibling;
  body.classList.toggle('open');
}

/* === CREW PROFILE POPUP === */
var FRAME_SHAPES = {
  blob: '30% 70% 70% 30% / 30% 30% 70% 70%',
  flower: '50% 0% 50% 50% / 0% 50% 50% 50%',
  shield: '50% 50% 50% 50% / 20% 20% 60% 60%',
  diamond: '50% 50% 0% 50% / 50% 0% 50% 50%',
  organic: '40% 60% 55% 45% / 55% 40% 60% 45%',
  circle: '50%'
};

function openCrewProfile(name) {
  var person = TRIP.crew.find(function(c) { return c.name === name; });
  if (!person) return;

  var existing = document.getElementById('crew-popup');
  if (existing) existing.remove();

  var overlay = document.createElement('div');
  overlay.id = 'crew-popup';
  overlay.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.85);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;';
  overlay.onclick = function(e) { if (e.target === overlay) overlay.remove(); };

  var profileData = (typeof travelData !== 'undefined' && travelData.profiles && travelData.profiles[name]) || {};
  var photoSrc = profileData.photo || '';
  var frameShape = profileData.frame || 'blob';
  var shapeVal = FRAME_SHAPES[frameShape] || FRAME_SHAPES.blob;

  var card = document.createElement('div');
  card.style.cssText = 'background:var(--bg-card);border:1px solid var(--border);border-radius:16px;padding:2rem;max-width:420px;width:90%;max-height:80vh;overflow-y:auto;';

  // Profile pic or initials
  var initials = name.charAt(0);
  var photoHtml = '';
  if (photoSrc) {
    photoHtml = '<div class="profile-pic-wrap"><img src="' + photoSrc + '" class="profile-pic" style="border-radius:' + shapeVal + ';"></div>';
  } else {
    photoHtml = '<div class="profile-pic-wrap"><div class="profile-pic profile-initials" style="border-radius:' + shapeVal + ';">' + initials + '</div></div>';
  }

  // Frame shape picker
  var frameHtml = '<div style="margin-top:0.8rem;text-align:center;">' +
    '<p style="font-size:0.65rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.4rem;">Frame Shape</p>' +
    '<div style="display:flex;gap:0.4rem;justify-content:center;flex-wrap:wrap;">';
  Object.keys(FRAME_SHAPES).forEach(function(key) {
    var isActive = key === frameShape;
    frameHtml += '<button onclick="setCrewFrame(\'' + name + '\',\'' + key + '\')" style="' +
      'width:36px;height:36px;border-radius:' + FRAME_SHAPES[key] + ';' +
      'background:' + (isActive ? 'var(--accent)' : 'rgba(201,149,107,0.15)') + ';' +
      'border:2px solid ' + (isActive ? 'var(--accent-gold)' : 'var(--border)') + ';' +
      'cursor:pointer;transition:all 0.2s;font-size:0.5rem;color:' + (isActive ? 'var(--bg)' : 'var(--text-muted)') + ';">' +
      key.charAt(0).toUpperCase() + '</button>';
  });
  frameHtml += '</div></div>';

  // Payment status
  var paymentHtml = '<div style="margin-top:1.5rem;border-top:1px solid var(--border);padding-top:1rem;">' +
    '<h4 style="font-family:Cormorant Garamond,serif;font-size:1.1rem;color:var(--cream);margin-bottom:0.6rem;"><i class="bi bi-wallet2"></i> Payments</h4>';
  if (typeof travelData !== 'undefined') {
    TRIP.payments.forEach(function(p, pi) {
      // Skip if this payment doesn't apply to this person
      if (p.appliesTo && p.appliesTo.length > 0 && p.appliesTo.indexOf(name) === -1) return;
      var paidData = travelData.payments[pi] || {};
      var paid = (p.due === 'Paid') || (paidData[name] ? true : false);
      paymentHtml += '<div style="display:flex;justify-content:space-between;padding:0.3rem 0;font-size:0.82rem;">' +
        '<span style="color:var(--text-dim);">' + p.item + '</span>' +
        '<span style="color:' + (paid ? 'var(--forest)' : 'var(--text-muted)') + ';">' + (paid ? 'Paid' : (p.due || 'Unpaid')) + '</span></div>';
    });
  }
  paymentHtml += '</div>';

  // Outfits
  var outfitHtml = '<div style="margin-top:1rem;border-top:1px solid var(--border);padding-top:1rem;">' +
    '<h4 style="font-family:Cormorant Garamond,serif;font-size:1.1rem;color:var(--cream);margin-bottom:0.6rem;"><i class="bi bi-palette"></i> Outfits</h4>';
  var hasOutfits = false;
  if (typeof travelData !== 'undefined' && travelData.outfits) {
    Object.keys(travelData.outfits).forEach(function(key) {
      travelData.outfits[key].forEach(function(o) {
        if (o.name === name) {
          hasOutfits = true;
          outfitHtml += '<div style="display:flex;gap:0.5rem;align-items:center;margin-bottom:0.4rem;">';
          if (o.image) outfitHtml += '<img src="' + o.image + '" style="width:40px;height:40px;border-radius:6px;object-fit:cover;">';
          outfitHtml += '<span style="font-size:0.8rem;color:var(--text-dim);">' + (o.desc || key) + '</span></div>';
        }
      });
    });
  }
  if (!hasOutfits) outfitHtml += '<p style="font-size:0.8rem;color:var(--text-muted);">No outfits added yet</p>';
  outfitHtml += '</div>';

  card.innerHTML = '<button onclick="document.getElementById(\'crew-popup\').remove()" style="float:right;background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:1.2rem;"><i class="bi bi-x-lg"></i></button>' +
    photoHtml +
    '<h3 style="font-family:Cormorant Garamond,serif;font-size:1.5rem;text-align:center;color:var(--cream);">' + name + '</h3>' +
    '<p style="text-align:center;font-size:0.8rem;color:var(--accent);text-transform:uppercase;letter-spacing:0.15em;">' + person.role + '</p>' +
    '<div style="text-align:center;margin-top:0.8rem;">' +
      '<label style="display:inline-block;padding:0.4rem 1rem;background:rgba(201,149,107,0.1);border:1px solid rgba(201,149,107,0.2);border-radius:100px;cursor:pointer;font-size:0.75rem;color:var(--accent);">' +
        '<i class="bi bi-camera"></i> Set Photo' +
        '<input type="file" accept="image/*" style="display:none;" onchange="setCrewPhoto(\'' + name + '\', this)">' +
      '</label>' +
    '</div>' +
    frameHtml +
    paymentHtml + outfitHtml;

  overlay.appendChild(card);
  document.body.appendChild(overlay);
}

function setCrewFrame(name, frame) {
  if (typeof travelData === 'undefined') return;
  if (!travelData.profiles) travelData.profiles = {};
  if (!travelData.profiles[name]) travelData.profiles[name] = {};
  travelData.profiles[name].frame = frame;
  saveToCloud();
  document.getElementById('crew-popup').remove();
  openCrewProfile(name);
}

function setCrewPhoto(name, input) {
  var file = input.files[0];
  if (!file) return;
  var reader = new FileReader();
  reader.onload = function(e) {
    var img = new Image();
    img.onload = function() {
      var canvas = document.createElement('canvas');
      var size = Math.min(img.width, img.height, 300);
      canvas.width = size; canvas.height = size;
      canvas.getContext('2d').drawImage(img, 0, 0, size, size);
      var data = canvas.toDataURL('image/jpeg', 0.8);
      if (!travelData.profiles) travelData.profiles = {};
      if (!travelData.profiles[name]) travelData.profiles[name] = {};
      travelData.profiles[name].photo = data;
      saveToCloud();
      // Refresh popup
      document.getElementById('crew-popup').remove();
      openCrewProfile(name);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

/* === EDIT MODE === */
var editMode = false;

function initEditMode() {
  var btn = document.createElement('button');
  btn.id = 'edit-toggle';
  btn.innerHTML = '✏️';
  btn.style.cssText = 'position:fixed;bottom:1.5rem;right:1.5rem;z-index:200;width:48px;height:48px;border-radius:50%;background:var(--accent);color:var(--bg);border:none;font-size:1.2rem;cursor:pointer;box-shadow:0 4px 16px rgba(0,0,0,0.4);transition:all 0.3s;';
  btn.onclick = toggleEditMode;
  document.body.appendChild(btn);
}

function toggleEditMode() {
  editMode = !editMode;
  var btn = document.getElementById('edit-toggle');

  if (editMode) {
    btn.innerHTML = '💾';
    btn.style.background = 'var(--forest)';
    enableEditing();
  } else {
    btn.innerHTML = '✏️';
    btn.style.background = 'var(--accent)';
    disableEditing();
    saveEdits();
  }
}

function enableEditing() {
  // Make all text editable
  var editables = document.querySelectorAll('.tl-time, .tl-title, .tl-desc, .card h3, .card p, .card-detail, .venue-card h3, .venue-desc, .venue-meta, .section-title, .section-sub, .budget-item .amount, .budget-item .label, .conf-label');
  editables.forEach(function(el) {
    el.contentEditable = 'true';
    el.style.outline = '1px dashed rgba(201,149,107,0.3)';
    el.style.outlineOffset = '2px';
  });

  // Add delete buttons to timeline items
  var tlItems = document.querySelectorAll('.tl-item');
  tlItems.forEach(function(item) {
    if (!item.querySelector('.delete-btn')) {
      var del = document.createElement('button');
      del.className = 'delete-btn';
      del.innerHTML = '🗑️';
      del.style.cssText = 'position:absolute;top:0;right:0;background:rgba(139,58,58,0.3);border:1px solid rgba(139,58,58,0.5);border-radius:50%;width:28px;height:28px;cursor:pointer;font-size:0.75rem;display:flex;align-items:center;justify-content:center;';
      del.onclick = function() {
        if (confirm('Delete this item?')) {
          item.remove();
        }
      };
      item.appendChild(del);
    }
  });

  // Add "+" buttons to timelines
  var timelines = document.querySelectorAll('.timeline');
  timelines.forEach(function(tl) {
    if (!tl.querySelector('.add-item-btn')) {
      var addBtn = document.createElement('button');
      addBtn.className = 'add-item-btn';
      addBtn.innerHTML = '+ Add Item';
      addBtn.style.cssText = 'display:block;width:100%;padding:0.8rem;margin-top:1rem;background:rgba(201,149,107,0.08);border:1px dashed rgba(201,149,107,0.25);border-radius:10px;color:var(--accent);font-family:DM Sans,sans-serif;font-size:0.85rem;cursor:pointer;transition:all 0.2s;';
      addBtn.onmouseover = function() { this.style.background = 'rgba(201,149,107,0.15)'; };
      addBtn.onmouseout = function() { this.style.background = 'rgba(201,149,107,0.08)'; };
      addBtn.onclick = function() { addTimelineItem(tl); };
      tl.appendChild(addBtn);
    }
  });

  // Add "+" to card grids
  var grids = document.querySelectorAll('.card-grid');
  grids.forEach(function(g) {
    if (!g.querySelector('.add-card-btn')) {
      var addBtn = document.createElement('button');
      addBtn.className = 'add-card-btn';
      addBtn.innerHTML = '+ Add Card';
      addBtn.style.cssText = 'padding:1.5rem;background:rgba(201,149,107,0.05);border:1px dashed rgba(201,149,107,0.2);border-radius:var(--radius);color:var(--accent);font-family:DM Sans,sans-serif;font-size:0.85rem;cursor:pointer;transition:all 0.2s;min-height:120px;display:flex;align-items:center;justify-content:center;';
      addBtn.onclick = function() { addCard(g); };
      g.appendChild(addBtn);
    }
  });

  // Add delete to venue cards
  var venueCards = document.querySelectorAll('.venue-card');
  venueCards.forEach(function(vc) {
    if (!vc.querySelector('.delete-btn')) {
      var del = document.createElement('button');
      del.className = 'delete-btn';
      del.innerHTML = '🗑️';
      del.style.cssText = 'float:right;background:rgba(139,58,58,0.3);border:1px solid rgba(139,58,58,0.5);border-radius:50%;width:28px;height:28px;cursor:pointer;font-size:0.75rem;';
      del.onclick = function() {
        if (confirm('Delete this venue?')) vc.remove();
      };
      vc.prepend(del);
    }
  });
}

function disableEditing() {
  var editables = document.querySelectorAll('[contenteditable="true"]');
  editables.forEach(function(el) {
    el.contentEditable = 'false';
    el.style.outline = 'none';
    el.style.outlineOffset = '';
  });

  // Remove delete buttons
  var delBtns = document.querySelectorAll('.delete-btn');
  delBtns.forEach(function(b) { b.remove(); });

  // Remove add buttons
  var addBtns = document.querySelectorAll('.add-item-btn, .add-card-btn');
  addBtns.forEach(function(b) { b.remove(); });
}

function addTimelineItem(timeline) {
  var time = prompt('Time (e.g. ~3:00 PM):');
  if (!time) return;
  var title = prompt('Title:');
  if (!title) return;
  var desc = prompt('Description (optional):') || '';

  var item = document.createElement('div');
  item.className = 'tl-item';
  item.innerHTML = '<div class="tl-time">' + time + '</div>' +
    '<div class="tl-title">' + title + '</div>' +
    '<div class="tl-desc">' + desc + '</div>';

  // Insert before the add button
  var addBtn = timeline.querySelector('.add-item-btn');
  if (addBtn) {
    timeline.insertBefore(item, addBtn);
  } else {
    timeline.appendChild(item);
  }
}

function addCard(grid) {
  var label = prompt('Card label (e.g. Note, Reminder):');
  if (!label) return;
  var title = prompt('Title:');
  if (!title) return;
  var detail = prompt('Details (optional):') || '';

  var card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = '<div class="card-label">' + label + '</div>' +
    '<h3>' + title + '</h3>' +
    '<p>' + detail + '</p>';

  var addBtn = grid.querySelector('.add-card-btn');
  if (addBtn) {
    grid.insertBefore(card, addBtn);
  } else {
    grid.appendChild(card);
  }
}

function saveEdits() {
  // Save all section HTML to localStorage
  var sections = document.querySelectorAll('.section');
  var data = {};
  sections.forEach(function(s) {
    data[s.id] = s.innerHTML;
  });
  try {
    localStorage.setItem('adriel-trip-edits', JSON.stringify(data));
  } catch(e) {}
}

function loadEdits() {
  var saved = localStorage.getItem('adriel-trip-edits');
  if (!saved) return;
  try {
    var data = JSON.parse(saved);
    Object.keys(data).forEach(function(id) {
      // Skip sections with dynamic content
      if (id === 'tab-confirmations' || id === 'tab-budget' || id === 'tab-overview') return;
      var section = document.getElementById(id);
      if (section) {
        section.innerHTML = data[id];
      }
    });
  } catch(e) {}
}

// Init edit mode on load
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(function() {
    initEditMode();
    loadEdits();
    initTheme();
  }, 2600);
});

/* === THEME TOGGLE === */
var THEMES = ['auto', 'light', 'dark'];
var THEME_ICONS = { auto:'bi-circle-half', light:'bi-sun', dark:'bi-moon-stars' };
var currentThemeIdx = 0;

function initTheme() {
  var saved = localStorage.getItem('adriel-trip-theme');
  if (saved) {
    currentThemeIdx = THEMES.indexOf(saved);
    if (currentThemeIdx < 0) currentThemeIdx = 0;
  }
  applyTheme(THEMES[currentThemeIdx]);
}

function cycleTheme() {
  currentThemeIdx = (currentThemeIdx + 1) % THEMES.length;
  var theme = THEMES[currentThemeIdx];
  localStorage.setItem('adriel-trip-theme', theme);
  applyTheme(theme);
}

function applyTheme(theme) {
  var icon = document.getElementById('theme-icon');
  if (icon) {
    icon.className = 'bi ' + THEME_ICONS[theme];
  }

  if (theme === 'auto') {
    // Use system preference
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  } else {
    document.documentElement.setAttribute('data-theme', theme === 'dark' ? '' : 'light');
  }
}
