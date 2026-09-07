/* ============================================================
   APP.JS — Main rendering logic
   ============================================================ */

document.addEventListener('DOMContentLoaded', function() {
  // Loader
  setTimeout(function() {
    document.getElementById('loader').style.opacity = '0';
    setTimeout(function() {
      document.getElementById('loader').style.display = 'none';
      document.getElementById('app').style.display = 'block';
    }, 500);
  }, 2400);

  // Tab navigation
  var navBtns = document.querySelectorAll('.nav-btn');
  navBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      navBtns.forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      showTab(btn.dataset.tab);
    });
  });

  // Initial render
  renderAll();
  showTab('overview');
});

function showTab(tab) {
  var sections = document.querySelectorAll('.section');
  sections.forEach(function(s) { s.classList.remove('active'); });
  var el = document.getElementById('tab-' + tab);
  if (el) {
    el.classList.remove('active');
    void el.offsetWidth; // reflow for animation
    el.classList.add('active');
  }
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
  content.appendChild(renderConfirmations());
  content.appendChild(renderBudget());
}

/* === OVERVIEW === */
function renderOverview() {
  var s = createSection('overview', 'Trip Overview', 'The essentials at a glance');
  var grid = el('div', 'card-grid');

  // Crew card
  var crew = el('div', 'card');
  crew.innerHTML = '<div class="card-label">The Crew</div><h3>5 Friends, 2 Cities</h3>';
  var badges = el('div', 'crew-grid');
  TRIP.crew.forEach(function(c) {
    var b = el('div', 'crew-badge' + (c.name === 'Adriel' ? ' birthday' : ''));
    b.innerHTML = '<div class="avatar-placeholder">' + c.emoji + '</div><span>' + c.name + '</span>';
    badges.appendChild(b);
  });
  crew.appendChild(badges);
  grid.appendChild(crew);

  // Flight Out
  var fo = el('div', 'card');
  fo.innerHTML = '<div class="card-label">Flight Out</div>' +
    '<h3>' + TRIP.flights.outbound.fromCity + ' → ' + TRIP.flights.outbound.toCity + '</h3>' +
    '<div class="card-detail"><span class="icon">📅</span> ' + TRIP.flights.outbound.date + '</div>' +
    '<div class="card-detail"><span class="icon">✈️</span> ' + TRIP.flights.outbound.airline + ' — ' + TRIP.flights.outbound.duration + '</div>';
  grid.appendChild(fo);

  // Flight Return
  var fr = el('div', 'card');
  fr.innerHTML = '<div class="card-label">Flight Home</div>' +
    '<h3>' + TRIP.flights.returning.fromCity + ' → ' + TRIP.flights.returning.toCity + '</h3>' +
    '<div class="card-detail"><span class="icon">📅</span> ' + TRIP.flights.returning.date + '</div>' +
    '<div class="card-detail"><span class="icon">✈️</span> ' + TRIP.flights.returning.airline + ' — ' + TRIP.flights.returning.duration + '</div>';
  grid.appendChild(fr);

  // Train
  var tr = el('div', 'card');
  tr.innerHTML = '<div class="card-label">VIA Rail</div>' +
    '<h3>' + TRIP.train.route + '</h3>' +
    '<div class="card-detail"><span class="icon">📅</span> ' + TRIP.train.date + '</div>' +
    '<div class="card-detail"><span class="icon">🕐</span> ' + TRIP.train.duration + '</div>' +
    '<div class="card-detail"><span class="icon">💰</span> ' + TRIP.train.price + '</div>' +
    '<p style="margin-top:0.5rem;">' + TRIP.train.note + '</p>';
  grid.appendChild(tr);

  // Rental Car
  var rc = el('div', 'card');
  rc.innerHTML = '<div class="card-label">Rental Car</div>' +
    '<h3>Montreal — ' + TRIP.rental.dates + '</h3>' +
    '<div class="card-detail"><span class="icon">🚗</span> ' + TRIP.rental.est + '/day est.</div>' +
    '<p style="margin-top:0.5rem;">' + TRIP.rental.purpose + '</p>';
  grid.appendChild(rc);

  // Concert
  var cc = el('div', 'card');
  cc.innerHTML = '<div class="card-label">🎵 Concert</div>' +
    '<h3>Olivia Rodrigo</h3>' +
    '<div class="card-detail"><span class="icon">📅</span> Thu Oct 22 — 7:00 PM</div>' +
    '<div class="card-detail"><span class="icon">📍</span> Centre Bell, Montreal</div>' +
    '<div class="card-detail"><span class="icon">🎟️</span> Jessica + Adriel</div>';
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
        '👗 Outfit ideas <span class="arrow">▾</span></button>' +
        '<div class="collapsible-body" id="outfit-' + id + '-' + i + '"></div>';
      t.appendChild(outfitDiv);
    }

    tl.appendChild(t);
  });

  s.appendChild(tl);
  return s;
}

/* === DINING === */
function renderDining() {
  var s = createSection('dining', 'Dining Guide', 'Curated picks for every meal');

  // Toronto
  var th = el('h2', '');
  th.style.cssText = 'font-family:Cormorant Garamond,serif;font-size:1.5rem;color:var(--cream);margin-bottom:1rem;';
  th.textContent = '🍁 Toronto';
  s.appendChild(th);

  TRIP.dining.toronto.forEach(function(v) {
    s.appendChild(makeVenueCard(v));
  });

  // Montreal
  var mh = el('h2', '');
  mh.style.cssText = 'font-family:Cormorant Garamond,serif;font-size:1.5rem;color:var(--cream);margin:2rem 0 1rem;';
  mh.textContent = '🍂 Montreal';
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
      '<span>🍽️ ' + v.type + '</span>' +
      '<span>💰 ' + v.price + '</span>' +
      '<span>📍 ' + v.neighborhood + '</span>' +
      (v.cuisine ? '<span>🏷️ ' + v.cuisine + '</span>' : '') +
    '</div>' +
    '<div class="venue-desc">' + v.desc + '</div>';
  return c;
}

/* === NIGHTLIFE === */
function renderNightlife() {
  var s = createSection('nightlife', 'Nightlife', 'Where to go after dark');

  var th = el('h2', '');
  th.style.cssText = 'font-family:Cormorant Garamond,serif;font-size:1.5rem;color:var(--cream);margin-bottom:1rem;';
  th.textContent = '🍁 Toronto — Church-Wellesley Village';
  s.appendChild(th);

  TRIP.nightlife.toronto.forEach(function(v) {
    var c = el('div', 'venue-card');
    c.innerHTML = '<h3>' + v.name + '</h3>' +
      '<div class="venue-meta">' +
        '<span>🎭 ' + v.type + '</span>' +
        '<span>🎟️ ' + v.cover + '</span>' +
        '<span>🕐 ' + v.hours + '</span>' +
      '</div>' +
      '<div class="venue-desc">' + v.desc + '</div>';
    s.appendChild(c);
  });

  var mh = el('h2', '');
  mh.style.cssText = 'font-family:Cormorant Garamond,serif;font-size:1.5rem;color:var(--cream);margin:2rem 0 1rem;';
  mh.textContent = '🍂 Montreal — Le Village';
  s.appendChild(mh);

  TRIP.nightlife.montreal.forEach(function(v) {
    var c = el('div', 'venue-card');
    c.innerHTML = '<h3>' + v.name + '</h3>' +
      '<div class="venue-meta">' +
        '<span>🎭 ' + v.type + '</span>' +
        '<span>🎟️ ' + v.cover + '</span>' +
        '<span>🕐 ' + v.hours + '</span>' +
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
  html += '<div class="card"><div class="card-label">Getting Around Toronto</div>' +
    '<h3>Transit + Walking</h3>' +
    '<p>UP Express from airport to Union Station: 25 min, CA$12.35<br>' +
    'TTC subway: CA$3.35/ride, day pass CA$13.50<br>' +
    'Uber/Lyft widely available<br>' +
    'Downtown core is very walkable</p></div>';

  // Montreal transport
  html += '<div class="card"><div class="card-label">Getting Around Montreal</div>' +
    '<h3>Metro + Rental Car</h3>' +
    '<p>STM Metro: CA$3.75/ride<br>' +
    'Old Montreal, Plateau, Le Village all walkable<br>' +
    'Rental car Oct 23-24 for exploring further out + airport<br>' +
    'Parking downtown: CA$15-30/day</p></div>';

  // Weather
  html += '<div class="card"><div class="card-label">October Weather</div>' +
    '<h3>Pack Layers!</h3>' +
    '<p>Toronto: 5-14C (41-57F) — crisp fall weather<br>' +
    'Montreal: 3-12C (37-54F) — slightly cooler<br>' +
    'Bring a warm jacket, layers, comfortable walking shoes<br>' +
    'Rain is possible — pack an umbrella</p></div>';

  // Tips
  html += '<div class="card"><div class="card-label">Pro Tips</div>' +
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
    '<br><button class="upload-btn" onclick="uploadConfirmation()">Upload</button>' +
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
