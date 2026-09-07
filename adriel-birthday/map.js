/* ============================================================
   MAP.JS — Leaflet map with pins for both cities
   ============================================================ */

function initMap() {
  var container = document.getElementById('map-container');
  if (!container) return;

  // Center between Toronto and Montreal
  var map = L.map('map-container', {
    center: [44.5, -76.5],
    zoom: 6,
    scrollWheelZoom: true
  });

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: 'CartoDB',
    maxZoom: 19
  }).addTo(map);

  // Custom markers
  TRIP.locations.forEach(function(loc) {
    var icon = L.divIcon({
      html: '<div style="font-size:1.5rem;text-align:center;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.5));">' + loc.emoji + '</div>',
      className: 'emoji-marker',
      iconSize: [36, 36],
      iconAnchor: [18, 18]
    });

    var marker = L.marker([loc.lat, loc.lng], { icon: icon }).addTo(map);
    marker.bindPopup(
      '<div style="font-family:DM Sans,sans-serif;padding:4px;">' +
        '<strong style="font-size:0.9rem;">' + loc.emoji + ' ' + loc.name + '</strong>' +
        '<br><span style="font-size:0.8rem;color:#888;">' + loc.city + '</span>' +
      '</div>'
    );
  });

  // Draw route lines
  // Toronto cluster
  var torontoLocs = TRIP.locations.filter(function(l) { return l.city === 'Toronto'; });
  if (torontoLocs.length > 1) {
    var torontoCoords = torontoLocs.map(function(l) { return [l.lat, l.lng]; });
    L.polyline(torontoCoords, {
      color: '#c9956b', weight: 2, opacity: 0.4, dashArray: '6,8'
    }).addTo(map);
  }

  // Montreal cluster
  var montrealLocs = TRIP.locations.filter(function(l) { return l.city === 'Montreal'; });
  if (montrealLocs.length > 1) {
    var montrealCoords = montrealLocs.map(function(l) { return [l.lat, l.lng]; });
    L.polyline(montrealCoords, {
      color: '#4a7c5c', weight: 2, opacity: 0.4, dashArray: '6,8'
    }).addTo(map);
  }

  // Train route line (Toronto Union → Montreal Gare Centrale)
  var union = TRIP.locations.find(function(l) { return l.name.indexOf('Union Station') >= 0; });
  var gare = TRIP.locations.find(function(l) { return l.name.indexOf('Gare Centrale') >= 0; });
  if (union && gare) {
    L.polyline([[union.lat, union.lng], [gare.lat, gare.lng]], {
      color: '#e8c87e', weight: 2.5, opacity: 0.5, dashArray: '10,8'
    }).addTo(map);

    // Midpoint label
    var midLat = (union.lat + gare.lat) / 2;
    var midLng = (union.lng + gare.lng) / 2;
    var label = L.divIcon({
      html: '<div style="font-family:DM Sans,sans-serif;font-size:0.7rem;color:#e8c87e;white-space:nowrap;background:rgba(26,20,18,0.8);padding:2px 8px;border-radius:10px;">🚂 VIA Rail ~5h</div>',
      className: '',
      iconAnchor: [50, 10]
    });
    L.marker([midLat, midLng], { icon: label, interactive: false }).addTo(map);
  }

  // Fit bounds to show everything
  var allCoords = TRIP.locations.map(function(l) { return [l.lat, l.lng]; });
  map.fitBounds(allCoords, { padding: [40, 40] });

  // Legend
  var legend = L.control({ position: 'bottomleft' });
  legend.onAdd = function() {
    var div = L.DomUtil.create('div', '');
    div.style.cssText = 'background:rgba(26,20,18,0.9);padding:10px 14px;border-radius:10px;font-family:DM Sans,sans-serif;font-size:0.72rem;color:#a89a8c;line-height:1.8;border:1px solid #3a322c;';
    div.innerHTML = '<div style="color:#f5efe6;font-weight:600;margin-bottom:4px;">Legend</div>' +
      '<span style="color:#c9956b;">---</span> Toronto stops<br>' +
      '<span style="color:#4a7c5c;">---</span> Montreal stops<br>' +
      '<span style="color:#e8c87e;">---</span> VIA Rail route';
    return div;
  };
  legend.addTo(map);
}
