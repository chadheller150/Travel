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
      // Re-trigger animations
      target.style.animation = 'none';
      target.offsetHeight;
      target.style.animation = '';
    });
  });

  // Create sparkles
  createSparkles();
});

// === Sparkle System ===
function createSparkles() {
  const container = document.querySelector('.sparkle-container');
  const colors = ['#ff6ec7', '#a855f7', '#22d3ee', '#fbbf24', '#34d399', '#f472b6'];

  for (let i = 0; i < 30; i++) {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    const color = colors[Math.floor(Math.random() * colors.length)];
    sparkle.style.background = color;
    sparkle.style.boxShadow = `0 0 6px ${color}`;
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.animationDelay = Math.random() * 6 + 's';
    sparkle.style.animationDuration = (Math.random() * 4 + 4) + 's';
    const size = Math.random() * 4 + 2;
    sparkle.style.width = size + 'px';
    sparkle.style.height = size + 'px';
    container.appendChild(sparkle);
  }
}
