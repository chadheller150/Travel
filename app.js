// === Loading Screen ===
window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelector('.loading-screen').classList.add('hidden');
  }, 2800);
});

// === Tab Navigation ===
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab');
  const sections = document.querySelectorAll('.section');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      sections.forEach(s => s.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById(tab.dataset.target);
      target.classList.add('active');
      target.style.animation = 'none';
      target.offsetHeight;
      target.style.animation = '';
    });
  });

  createSparkles();
  initEditMode();
  loadSavedEdits();
});

// === Sparkle System ===
function createSparkles() {
  const container = document.querySelector('.sparkle-container');
  const colors = ['#ff7eb3', '#ff9a56', '#5ce1e6', '#ffcf56', '#00d4aa', '#b97aff'];

  for (let i = 0; i < 30; i++) {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    const color = colors[Math.floor(Math.random() * colors.length)];
    sparkle.style.background = color;
    sparkle.style.boxShadow = '0 0 6px ' + color;
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.animationDelay = Math.random() * 6 + 's';
    sparkle.style.animationDuration = (Math.random() * 4 + 4) + 's';
    const size = Math.random() * 4 + 2;
    sparkle.style.width = size + 'px';
    sparkle.style.height = size + 'px';
    container.appendChild(sparkle);
  }
}

// === Edit Mode ===
function initEditMode() {
  // Create edit toggle button
  const btn = document.createElement('button');
  btn.id = 'edit-toggle';
  btn.innerHTML = '✏️';
  btn.title = 'Toggle edit mode';
  btn.style.cssText = 'position:fixed;bottom:20px;right:20px;z-index:999;width:50px;height:50px;border-radius:50%;border:2px solid var(--accent);background:var(--card-bg);font-size:1.4em;cursor:pointer;box-shadow:0 4px 15px rgba(0,0,0,0.3);transition:all 0.3s;';
  document.body.appendChild(btn);

  let editing = false;

  btn.addEventListener('click', () => {
    editing = !editing;
    const editables = document.querySelectorAll('.timeline-content, .card .details, .card .meta, .checklist, .crew-grid');

    if (editing) {
      btn.innerHTML = '💾';
      btn.style.borderColor = '#5ce1e6';
      btn.style.boxShadow = '0 4px 20px rgba(92,225,230,0.4)';
      editables.forEach(el => {
        el.contentEditable = 'true';
        el.style.outline = '1px dashed rgba(92,225,230,0.3)';
        el.style.borderRadius = '8px';
        el.style.padding = '8px';
      });
      showToast('Edit mode ON — tap anywhere to edit, then tap 💾 to save');
    } else {
      btn.innerHTML = '✏️';
      btn.style.borderColor = 'var(--accent)';
      btn.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
      editables.forEach(el => {
        el.contentEditable = 'false';
        el.style.outline = '';
        el.style.padding = '';
      });
      saveEdits();
      showToast('Saved! Your changes are stored on this device.');
    }
  });
}

function saveEdits() {
  const sections = document.querySelectorAll('.section');
  const data = {};
  sections.forEach(s => {
    data[s.id] = s.innerHTML;
  });
  localStorage.setItem('dirty30-edits', JSON.stringify(data));
}

function loadSavedEdits() {
  const saved = localStorage.getItem('dirty30-edits');
  if (!saved) return;
  try {
    const data = JSON.parse(saved);
    Object.keys(data).forEach(id => {
      const section = document.getElementById(id);
      if (section) section.innerHTML = data[id];
    });
  } catch (e) {
    // If corrupted, ignore
  }
}

function showToast(msg) {
  let toast = document.getElementById('edit-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'edit-toast';
    toast.style.cssText = 'position:fixed;bottom:80px;right:20px;z-index:999;background:var(--card-bg);border:1px solid var(--neon-blue);color:var(--text);padding:12px 18px;border-radius:12px;font-size:0.85em;max-width:280px;box-shadow:0 4px 20px rgba(0,0,0,0.4);transition:opacity 0.3s;font-family:Outfit,sans-serif;';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.opacity = '1';
  setTimeout(() => { toast.style.opacity = '0'; }, 3500);
}
