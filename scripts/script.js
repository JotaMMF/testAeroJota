const tabs = document.querySelectorAll('[role="tab"]');
const panels = document.querySelectorAll('[role="tabpanel"]');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const targetId = tab.getAttribute('aria-controls');

    // 1️⃣ Update aria-selected on all tabs
    tabs.forEach(t => t.setAttribute('aria-selected', 'false'));
    tab.setAttribute('aria-selected', 'true');

    // 2️⃣ Show the correct panel, hide others
    panels.forEach(panel => {
      if (panel.id === targetId) {
        panel.hidden = false;
      } else {
        panel.hidden = true;
      }
    });
  });
});

document.querySelectorAll(".accordion").forEach((details) => {
  const content = Array.from(details.children).slice(1);

  details.addEventListener("toggle", () => {
    const section = content[0];

    if (details.open) {
      section.style.maxHeight = section.scrollHeight + "px";
    } else {
      section.style.maxHeight = "0px";
    }
  });
});

const player = document.getElementById("audioPlayer");

player.addEventListener("ended", () => {
  playRandomSong();
});

player.volume = 0.25;

// MUSIC PLAYER
const songs = [
  "https://files.catbox.moe/9pk0tz.mp3",
  "https://files.catbox.moe/va5q43.mp3",
  "https://files.catbox.moe/dhv4hb.mp3",
  "https://files.catbox.moe/ih2z66.mp3"
];

function playRandomSong() {
  const randomIndex = Math.floor(Math.random() * songs.length);
  player.src =  songs[randomIndex];
  player.play();
}

// Play a random song when page loads
window.onload = playRandomSong;


