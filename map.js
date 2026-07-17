let mapInitialized = false;

function initMap() {
  if (mapInitialized) return;

  const mapEl = document.getElementById('map');
  if (!mapEl || mapEl.offsetHeight === 0) return;

  mapInitialized = true;

  const locations = [
    { name: "MIA Rental Car Center", lat: 25.7959, lng: -80.2870, icon: "✈️", cat: "transport" },
    { name: "Airbnb - 1627 SW 13th St", lat: 25.7617, lng: -80.2150, icon: "🏠", cat: "stay" },
    { name: "R House Wynwood", lat: 25.8003, lng: -80.1992, icon: "🍳", cat: "food" },
    { name: "Palace Bar", lat: 25.7637, lng: -80.1301, icon: "👑", cat: "food" },
    { name: "KoKo - Coconut Grove", lat: 25.7285, lng: -80.2420, icon: "🌮", cat: "food" },
    { name: "Orange Blossom", lat: 25.7918, lng: -80.1396, icon: "🥂", cat: "food" },
    { name: "Twist", lat: 25.7789, lng: -80.1371, icon: "💃", cat: "nightlife" },
    { name: "Mangos Tropical Cafe", lat: 25.7700, lng: -80.1303, icon: "🌴", cat: "nightlife" },
    { name: "Bar Gaythering", lat: 25.7902, lng: -80.1409, icon: "🍸", cat: "nightlife" },
    { name: "Azucar Nightclub", lat: 25.7507, lng: -80.2380, icon: "🩩", cat: "nightlife" },
    { name: "Kimpton Surfcomber", lat: 25.7918, lng: -80.1306, icon: "🏖️", cat: "activity" },
    { name: "South Pointe Park", lat: 25.7636, lng: -80.1325, icon: "📸", cat: "activity" },
    { name: "Brickell City Centre", lat: 25.7659, lng: -80.1918, icon: "🛍️", cat: "activity" },
  ];

  const map = L.map('map').setView([25.7750, -80.1800], 12);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap &copy; CARTO',
    subdomains: 'abcd', maxZoom: 19
  }).addTo(map);

  locations.forEach(loc => {
    const marker = L.marker([loc.lat, loc.lng], {
      icon: L.divIcon({
        html: '<div style="font-size:24px;text-align:center;filter:drop-shadow(0 2px 6px rgba(0,0,0,0.7))">' + loc.icon + '</div>',
        className: 'emoji-marker', iconSize: [32, 32], iconAnchor: [16, 16]
      })
    }).addTo(map);
    marker.bindPopup('<b style="color:#0f1923;font-family:Outfit,sans-serif">' + loc.name + '</b>');
  });

  const routes = [
    { from: [25.7959, -80.2870], to: [25.8003, -80.1992] },
    { from: [25.8003, -80.1992], to: [25.7617, -80.2150] },
    { from: [25.7617, -80.2150], to: [25.7789, -80.1371] },
    { from: [25.7617, -80.2150], to: [25.7285, -80.2420] },
    { from: [25.7617, -80.2150], to: [25.7918, -80.1306] },
  ];

  routes.forEach(r => {
    L.polyline([r.from, r.to], { color: '#ff7eb3', weight: 2, opacity: 0.5, dashArray: '8 6' }).addTo(map);
  });

  // Fix map size after it becomes visible
  setTimeout(() => map.invalidateSize(), 100);
}

// Try to init on tab click (when map section becomes visible)
document.addEventListener('DOMContentLoaded', () => {
  // Observer to detect when map section becomes visible
  const observer = new MutationObserver(() => {
    const mapSection = document.getElementById('map-section');
    if (mapSection && mapSection.classList.contains('active')) {
      setTimeout(initMap, 50);
    }
  });

  const sections = document.querySelectorAll('.section');
  sections.forEach(s => observer.observe(s, { attributes: true, attributeFilter: ['class'] }));

  // Also try immediately in case map tab is active on load
  initMap();
});
