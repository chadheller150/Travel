// === Live Weather via Open-Meteo (free, no API key) ===
// Fetches hourly forecast for Miami (25.76, -80.19) for Jul 25-28, 2026

const MIAMI_LAT = 25.76;
const MIAMI_LNG = -80.19;
const TRIP_DATES = ['2026-07-25', '2026-07-26', '2026-07-27', '2026-07-28'];
const DAY_NAMES = ['Saturday', 'Sunday', 'Monday', 'Tuesday'];
const DAY_IDS = ['saturday', 'sunday', 'monday', 'tuesday'];
const DAY_COLORS = ['#ffcf56', '#ff7eb3', '#5ce1e6', '#00d4aa'];

// Weather code to description/emoji
function weatherDesc(code) {
  if (code === 0) return { emoji: '☀️', desc: 'Clear sky' };
  if (code <= 3) return { emoji: '⛅', desc: 'Partly cloudy' };
  if (code <= 49) return { emoji: '🌫️', desc: 'Foggy' };
  if (code <= 55) return { emoji: '🌦️', desc: 'Light drizzle' };
  if (code <= 57) return { emoji: '🌧️', desc: 'Freezing drizzle' };
  if (code <= 65) return { emoji: '🌧️', desc: 'Rain' };
  if (code <= 67) return { emoji: '🌧️', desc: 'Freezing rain' };
  if (code <= 77) return { emoji: '🌨️', desc: 'Snow' };
  if (code <= 82) return { emoji: '🌧️', desc: 'Rain showers' };
  if (code <= 86) return { emoji: '🌨️', desc: 'Snow showers' };
  if (code >= 95) return { emoji: '⛈️', desc: 'Thunderstorm' };
  return { emoji: '🌤️', desc: 'Fair' };
}

// Rain alerts for specific events
function getRainAlerts(hourlyData, dateIdx) {
  const alerts = [];
  const date = TRIP_DATES[dateIdx];

  // Check specific time windows for each day's events
  if (dateIdx === 0) { // Saturday
    const brunchHours = getHoursInRange(hourlyData, date, 14, 17); // 2-5 PM
    if (brunchHours.avgRain > 40) alerts.push('⚠️ Rain likely during/after R House brunch');
    const nightHours = getHoursInRange(hourlyData, date, 22, 26); // 10 PM - 2 AM
    if (nightHours.avgRain > 30) alerts.push('🌂 Possible showers while out — clubs are indoor!');
  }
  if (dateIdx === 1) { // Sunday
    const boatHours = getHoursInRange(hourlyData, date, 14, 18); // 2-6 PM (boat)
    if (boatHours.avgRain > 50) alerts.push('⚠️ HIGH rain chance during boat tour! Check with captain day-of.');
    else if (boatHours.avgRain > 30) alerts.push('🌦️ Moderate rain chance during boat — watch sky.');
  }
  if (dateIdx === 2) { // Monday
    const beachHours = getHoursInRange(hourlyData, date, 11, 17); // 11 AM - 5 PM
    if (beachHours.avgRain > 50) alerts.push('⚠️ Rain likely during cabana — covered seating saves the day!');
    else if (beachHours.avgRain > 30) alerts.push('🌦️ Some showers possible — cabana is covered, no worries.');
  }
  if (dateIdx === 3) { // Tuesday
    const photoHours = getHoursInRange(hourlyData, date, 13, 15); // 1-3 PM
    if (photoHours.avgRain > 40) alerts.push('⚠️ Rain likely during photos — consider Brickell first, photos after.');
  }

  return alerts;
}

function getHoursInRange(hourlyData, date, startHour, endHour) {
  let totalRain = 0;
  let count = 0;
  hourlyData.time.forEach((t, i) => {
    if (!t.startsWith(date)) return;
    const hour = parseInt(t.split('T')[1].split(':')[0]);
    if (hour >= startHour && hour < (endHour > 24 ? 24 : endHour)) {
      totalRain += hourlyData.precipitation_probability[i] || 0;
      count++;
    }
  });
  return { avgRain: count > 0 ? totalRain / count : 0 };
}

async function fetchWeather() {
  const startDate = TRIP_DATES[0];
  const endDate = TRIP_DATES[3];

  const url = 'https://api.open-meteo.com/v1/forecast?latitude=' + MIAMI_LAT + '&longitude=' + MIAMI_LNG +
    '&hourly=temperature_2m,precipitation_probability,weathercode,relative_humidity_2m,apparent_temperature' +
    '&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weathercode,uv_index_max' +
    '&temperature_unit=fahrenheit&timezone=America%2FNew_York' +
    '&start_date=' + startDate + '&end_date=' + endDate;

  try {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error('Weather API error');
    const data = await resp.json();
    renderWeatherData(data);
  } catch (e) {
    console.log('Weather fetch failed, using static fallback:', e);
    // Leave the static HTML in overview as fallback
  }
}

function renderWeatherData(data) {
  const daily = data.daily;
  const hourly = data.hourly;

  // Update overview cards
  const overviewEl = document.getElementById('weather-overview');
  if (overviewEl) {
    let html = '';
    TRIP_DATES.forEach((date, i) => {
      const high = Math.round(daily.temperature_2m_max[i]);
      const low = Math.round(daily.temperature_2m_min[i]);
      const rainMax = daily.precipitation_probability_max[i];
      const uv = daily.uv_index_max[i];
      const wCode = daily.weathercode[i];
      const w = weatherDesc(wCode);
      const alerts = getRainAlerts(hourly, i);

      html += '<div class="card" style="border-left:3px solid ' + DAY_COLORS[i] + ';">';
      html += '<h3>' + w.emoji + ' ' + DAY_NAMES[i] + ' 7/' + (25 + i) + '</h3>';
      html += '<div class="details">';
      html += '<strong>' + high + '° / ' + low + '°</strong> — ' + w.desc + '<br>';
      html += '🌧️ <strong>' + rainMax + '% rain</strong>';
      if (uv >= 8) html += ' • 🔥 UV: ' + Math.round(uv) + ' (High)';
      if (alerts.length > 0) {
        html += '<br><br>';
        alerts.forEach(a => { html += '<em style="color:var(--warning);font-size:0.85em;">' + a + '</em><br>'; });
      }
      html += '</div></div>';
    });
    overviewEl.innerHTML = html;
  }

  // Render each day's detailed hourly breakdown
  TRIP_DATES.forEach((date, i) => {
    const dayEl = document.getElementById('weather-' + DAY_IDS[i]);
    if (!dayEl) return;

    const high = Math.round(daily.temperature_2m_max[i]);
    const low = Math.round(daily.temperature_2m_min[i]);
    const rainMax = daily.precipitation_probability_max[i];
    const wCode = daily.weathercode[i];
    const w = weatherDesc(wCode);
    const alerts = getRainAlerts(hourly, i);

    // Build hourly bars for key hours (8 AM - 2 AM)
    let hourlyHtml = '<div style="display:flex;gap:2px;margin-top:10px;overflow-x:auto;padding-bottom:4px;">';
    const keyHours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0, 1];

    keyHours.forEach(h => {
      const timeStr = date + 'T' + String(h).padStart(2, '0') + ':00';
      const idx = hourly.time.indexOf(timeStr);
      if (idx === -1) return;

      const rainProb = hourly.precipitation_probability[idx] || 0;
      const temp = Math.round(hourly.temperature_2m[idx]);
      const hCode = hourly.weathercode[idx];
      const hw = weatherDesc(hCode);

      // Color bar based on rain probability
      let barColor = 'rgba(52,211,153,0.6)'; // green = dry
      if (rainProb > 60) barColor = 'rgba(255,126,179,0.8)'; // pink = heavy
      else if (rainProb > 30) barColor = 'rgba(255,207,86,0.7)'; // yellow = moderate

      const displayHour = h === 0 ? '12a' : h > 12 ? (h - 12) + 'p' : h === 12 ? '12p' : h + 'a';

      hourlyHtml += '<div style="display:flex;flex-direction:column;align-items:center;min-width:36px;font-size:0.7em;">';
      hourlyHtml += '<div style="font-size:0.9em;">' + hw.emoji + '</div>';
      hourlyHtml += '<div style="width:20px;background:' + barColor + ';border-radius:3px;height:' + Math.max(rainProb * 0.4, 4) + 'px;margin:3px 0;"></div>';
      hourlyHtml += '<div style="color:var(--text-dim);">' + rainProb + '%</div>';
      hourlyHtml += '<div>' + temp + '°</div>';
      hourlyHtml += '<div style="color:var(--text-dim);">' + displayHour + '</div>';
      hourlyHtml += '</div>';
    });
    hourlyHtml += '</div>';

    let html = '<div class="card" style="margin-bottom:14px;border-left:3px solid ' + DAY_COLORS[i] + ';">';
    html += '<div style="display:flex;justify-content:space-between;align-items:center;">';
    html += '<h3 style="margin:0;">' + w.emoji + ' ' + high + '° / ' + low + '° — ' + w.desc + '</h3>';
    html += '<span style="font-size:0.75em;color:var(--text-dim);">🌧️ Up to ' + rainMax + '%</span>';
    html += '</div>';

    // Alerts
    if (alerts.length > 0) {
      html += '<div style="margin-top:8px;padding:8px;background:rgba(255,207,86,0.08);border-radius:8px;border:1px solid rgba(255,207,86,0.2);">';
      alerts.forEach(a => { html += '<div style="font-size:0.85em;color:var(--warning);">' + a + '</div>'; });
      html += '</div>';
    }

    // Hourly chart
    html += '<div style="margin-top:6px;font-size:0.75em;color:var(--text-dim);">Hourly forecast:</div>';
    html += hourlyHtml;
    html += '</div>';

    dayEl.innerHTML = html;
  });
}

// Fetch on page load
document.addEventListener('DOMContentLoaded', fetchWeather);
