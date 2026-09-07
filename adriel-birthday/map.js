/* ============================================================
   MAP.JS — Leaflet map with theme toggle + destinations list
   ============================================================ */

var tripMap = null;
var mapTileLayer = null;

var MAP_TILES = {
  dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
  light: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
};

function getMapTheme() {
  var theme = document.documentElement.getAttribute('data-theme');
  if (theme === 'light') return 'light';
  return 'dark';
}

function initMap() {
  var container = document.getElementById('map-container');
  if (!container) return;

  var theme = getMapTheme();

  tripMap = L.map('map-container', {
    center: [44.5, -76.5],
    zoom: 6,
    scrollWheelZoom: true
  });

  mapTileLayer = L.tileLayer(MAP_TILES[theme], {
    attribution: 'CartoDB',
    maxZoom: 19
  }).addTo(tripMap);

  // Markers
  TRIP.locations.forEach(function(loc) {
    var icon = L.divIcon({
      html: '<div class="map-marker">' + loc.emoji + '</div>',
      className: 'map-marker-wrap',
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });

    var marker = L.marker([loc.lat, loc.lng], { icon: icon }).addTo(tripMap);
    marker.bindPopup(
      '<div style="font-family:DM Sans,sans-serif;padding:4px;">' +
        '<strong style="font-size:0.9rem;">' + loc.emoji + ' ' + loc.name + '</strong>' +
        '<br><span style="font-size:0.8rem;color:#888;">' + loc.city + '</span>' +
      '</div>'
    );
  });

  // Route lines
  var torontoLocs = TRIP.locations.filter(function(l) { return l.city === 'Toronto'; });
  if (torontoLocs.length > 1) {
    L.polyline(torontoLocs.map(function(l) { return [l.lat, l.lng]; }), {
      color: '#c9956b', weight: 2, opacity: 0.4, dashArray: '6,8'
    }).addTo(tripMap);
  }

  var montrealLocs = TRIP.locations.filter(function(l) { return l.city === 'Montreal'; });
  if (montrealLocs.length > 1) {
    L.polyline(montrealLocs.map(function(l) { return [l.lat, l.lng]; }), {
      color: '#4a7c5c', weight: 2, opacity: 0.4, dashArray: '6,8'
    }).addTo(tripMap);
  }

  // Train route
  var union = TRIP.locations.find(function(l) { return l.name.indexOf('Union Station') >= 0; });
  var gare = TRIP.locations.find(function(l) { return l.name.indexOf('Gare Centrale') >= 0; });
  if (union && gare) {
    L.polyline([[union.lat, union.lng], [gare.lat, gare.lng]], {
      color: '#e8c87e', weight: 2.5, opacity: 0.5, dashArray: '10,8'
    }).addTo(tripMap);
  }

  // Fit bounds
  var allCoords = TRIP.locations.map(function(l) { return [l.lat, l.lng]; });
  tripMap.fitBounds(allCoords, { padding: [40, 40] });

  // Build destinations list
  buildDestinationsList();

  // Watch for theme changes
  var observer = new MutationObserver(function() { updateMapTheme(); });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
}

function updateMapTheme() {
  if (!tripMap || !mapTileLayer) return;
  var theme = getMapTheme();
  mapTileLayer.setUrl(MAP_TILES[theme]);
}

function buildDestinationsList() {
  var listEl = document.getElementById('map-destinations');
  if (!listEl) return;

  var cities = {};
  TRIP.locations.forEach(function(loc) {
    var city = loc.city || 'Other';
    if (!cities[city]) cities[city] = [];
    cities[city].push(loc);
  });

  var html = '';
  var cityOrder = ['Toronto', 'Montreal', 'Laurentians'];
  var cityColors = { Toronto: '#c9956b', Montreal: '#4a7c5c', Laurentians: '#e8c87e' };

  cityOrder.forEach(function(city) {
    var locs = cities[city];
    if (!locs) return;

    html += '<div class="dest-city-group">' +
      '<div class="dest-city-header">' +
        '<span class="dest-city-dot" style="background:' + (cityColors[city] || 'var(--accent)') + ';"></span>' +
        '<span class="dest-city-name">' + city + '</span>' +
        '<span class="dest-city-count">' + locs.length + '</span>' +
      '</div>' +
      '<div class="dest-list">';

    locs.forEach(function(loc) {
      html += '<div class="dest-item" onclick="flyToLocation(' + loc.lat + ',' + loc.lng + ')">' +
        '<span class="dest-emoji">' + loc.emoji + '</span>' +
        '<span class="dest-name">' + loc.name + '</span>' +
      '</div>';
    });

    html += '</div></div>';
  });

  listEl.innerHTML = html;
}

function flyToLocation(lat, lng) {
  if (!tripMap) return;
  tripMap.flyTo([lat, lng], 14, { duration: 1.2 });
}
