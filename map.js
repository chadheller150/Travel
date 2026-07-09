function initMap() {
  const locations = [
    { name: "MIA Rental Car Center", lat: 25.7959, lng: -80.2870, icon: "✈️", cat: "transport" },
    { name: "Airbnb - 1627 SW 13th St", lat: 25.7617, lng: -80.2150, icon: "🏠", cat: "stay" },
    { name: "R House Wynwood", lat: 25.8003, lng: -80.1992, icon: "🍳", cat: "food" },
    { name: "Palace Bar", lat: 25.7637, lng: -80.1301, icon: "👑", cat: "food" },
    { name: "KoKo - Coconut Grove", lat: 25.7285, lng: -80.2420, icon: "🌮", cat: "food" },
    { name: "Orange Blossom", lat: 25.7918, lng: -80.1396, icon: "🥂", cat: "food" },
    { name: "Twist", lat: 25.7789, lng: -80.1371, icon: "💃", cat: "nightlife" },
    { name: "E11even", lat: 25.7840, lng: -80.1920, icon: "🎵", cat: "nightlife" },
    { name: "Mangos Tropical Cafe", lat: 25.7700, lng: -80.1303, icon: "🌴", cat: "nightlife" },
    { name: "Bar Gaythering", lat: 25.7902, lng: -80.1409, icon: "🍸", cat: "nightlife" },
    { name: "Azucar Nightclub", lat: 25.7507, lng: -80.2380, icon: "🪩", cat: "nightlife" },
    { name: "Kimpton Surfcomber", lat: 25.7918, lng: -80.1306, icon: "🏖️", cat: "activity" },
    { name: "South Pointe Park", lat: 25.7636, lng: -80.1325, icon: "📸", cat: "activity" },
    { name: "Brickell City Centre", lat: 25.7659, lng: -80.1918, icon: "🛍️", cat: "activity" },
  ];

  const map = L.map('map').setView([25.7750, -80.1800], 12);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
    subdomains: 'abcd', maxZoom: 19
  }).addTo(map);

  const colors = { transport: '#64b5f6', stay: '#ffd700', food: '#ff7043', nightlife: '#e040fb', activity: '#00e676' };

  locations.forEach(loc => {
    const marker = L.marker([loc.lat, loc.lng], {
      icon: L.divIcon({
        html: `<div style="font-size:22px;text-align:center;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.5))">${loc.icon}</div>`,
        className: 'emoji-marker', iconSize: [30, 30], iconAnchor: [15, 15]
      })
    }).addTo(map);
    marker.bindPopup(`<b style="color:#1a1a2e">${loc.name}</b>`);
  });

  // Draw route lines between key stops
  const routes = [
    { from: [25.7959, -80.2870], to: [25.8003, -80.1992], label: "Airport → R House", time: "15 min" },
    { from: [25.8003, -80.1992], to: [25.7617, -80.2150], label: "R House → Airbnb", time: "12 min" },
    { from: [25.7617, -80.2150], to: [25.7789, -80.1371], label: "Airbnb → South Beach", time: "20 min" },
    { from: [25.7617, -80.2150], to: [25.7285, -80.2420], label: "Airbnb → KoKo", time: "10 min" },
    { from: [25.7617, -80.2150], to: [25.7918, -80.1306], label: "Airbnb → Surfcomber", time: "20 min" },
  ];

  routes.forEach(r => {
    L.polyline([r.from, r.to], { color: '#e040fb', weight: 2, opacity: 0.4, dashArray: '8 6' }).addTo(map);
  });
}

document.addEventListener('DOMContentLoaded', initMap);
