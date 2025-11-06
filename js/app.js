// Update time in status bar
function updateTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const timeElement = document.getElementById('current-time');
  if (timeElement) {
    timeElement.textContent = `${hours}:${minutes}`;
  }
}

// Update time on load and every minute
updateTime();
setInterval(updateTime, 60000);

