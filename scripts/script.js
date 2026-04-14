
/* =========================================================
   ARIA TAB SYSTEM
   - Handles switching between tab panels
========================================================= */

const tabs = document.querySelectorAll('[role="tab"]');
const panels = document.querySelectorAll('[role="tabpanel"]');

function activateTab(tab) {
	const targetId = tab.getAttribute("aria-controls");

	// Reset all tabs
	tabs.forEach(t => t.setAttribute("aria-selected", "false"));

	// Activate selected tab
	tab.setAttribute("aria-selected", "true");

	// Show matching panel, hide others
	panels.forEach(panel => {
		panel.hidden = panel.id !== targetId;
	});
}

// Attach tab listeners
tabs.forEach(tab => {
	tab.addEventListener("click", () => activateTab(tab));
});


/* =========================================================
   ACCORDION SYSTEM (OPTIONAL)
   - Smooth expand/collapse using max-height
========================================================= */

document.querySelectorAll(".accordion").forEach(details => {
	const content = Array.from(details.children).slice(1);

	details.addEventListener("toggle", () => {
		const section = content[0];
		if (!section) return;

		if (details.open) {
			section.style.maxHeight = section.scrollHeight + "px";
		} else {
			section.style.maxHeight = "0px";
		}
	});
});


/* =========================================================
   AUDIO PLAYER (RANDOM MUSIC)
========================================================= */

const player = document.getElementById("audioPlayer");

const songs = [
	"https://files.catbox.moe/9pk0tz.mp3",
	"https://files.catbox.moe/va5q43.mp3",
	"https://files.catbox.moe/dhv4hb.mp3",
	"https://files.catbox.moe/ih2z66.mp3"
];

function playRandomSong() {
	const index = Math.floor(Math.random() * songs.length);

	player.src = songs[index];
	player.play();
}

// Volume control
player.volume = 0.10;

// Auto-next song
player.addEventListener("ended", playRandomSong);

// Start on page load
window.addEventListener("load", playRandomSong);


/* =========================================================
   SIDE MENU (JSON LOADER - NEOCITIES SAFE)
   - Builds icon grid in right panel
   - Works on Neocities static hosting
========================================================= */

const grid = document.getElementById("sideGrid");

async function loadGrid() {
	if (!grid) return;

	try {
		// Use relative path (safe for Neocities)
		const res = await fetch("./data/links.json", {
			cache: "no-cache"
		});

		if (!res.ok) {
			throw new Error(`HTTP error: ${res.status}`);
		}

		const data = await res.json();

		renderGrid(data);

	} catch (err) {
		console.error("Failed to load links.json:", err);

		// fallback UI so it doesn't look broken
		grid.innerHTML = `
			<div style="color:white;opacity:0.7;padding:10px;">
				Links failed to load
			</div>
		`;
	}
}

/**
 * Render grid items
 */
function renderGrid(data) {
	grid.innerHTML = data.map(item => `
		<a class="side-item" href="${item.url}" target="_blank" rel="noopener noreferrer">
			<i class="${item.icon}"></i>
			<span>${item.name}</span>
		</a>
	`).join("");
}

/* Run after page load */
window.addEventListener("load", loadGrid);