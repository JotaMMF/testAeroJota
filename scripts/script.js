
/* =========================================================
   TAB SYSTEM (ARIA ACCESSIBLE)
   - Handles switching between tab panels
========================================================= */

const tabs = document.querySelectorAll('[role="tab"]');
const panels = document.querySelectorAll('[role="tabpanel"]');

/**
 * Activates a tab and shows its matching panel
 */
function activateTab(tab) {
	if (!tab) return;

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

/* Initialize tabs safely */
if (tabs.length && panels.length) {
	tabs.forEach((tab, i) => {
		tab.addEventListener("click", () => activateTab(tab));

		// Set initial ARIA state
		tab.setAttribute("aria-selected", i === 0 ? "true" : "false");
	});

	// Show first panel by default
	panels.forEach((p, i) => {
		p.hidden = i !== 0;
	});
}


/* =========================================================
   ACCORDION SYSTEM (SMOOTH DETAILS ANIMATION)
   - Works with <details> elements
========================================================= */

document.querySelectorAll("details.accordion").forEach(details => {
	const section = details.querySelector(":scope > *:not(summary)");

	if (!section) return;

	details.addEventListener("toggle", () => {
		if (details.open) {
			section.style.maxHeight = section.scrollHeight + "px";
		} else {
			section.style.maxHeight = "0px";
		}
	});
});


/* =========================================================
   AUDIO PLAYER (RANDOM BACKGROUND MUSIC)
   - Safe start (user interaction required by browsers)
========================================================= */

const player = document.getElementById("audioPlayer");

const songs = [
	"https://files.catbox.moe/9pk0tz.mp3",
	"https://files.catbox.moe/va5q43.mp3",
	"https://files.catbox.moe/dhv4hb.mp3",
	"https://files.catbox.moe/ih2z66.mp3"
];

let lastIndex = -1;

/**
 * Plays a random song without repeating the last one
 */
function playRandomSong() {
	if (!player) return;

	let index;
	do {
		index = Math.floor(Math.random() * songs.length);
	} while (index === lastIndex);

	lastIndex = index;

	player.src = songs[index];
	player.play().catch(() => {
		// Autoplay may be blocked until user interaction
	});
}

/* Audio setup */
if (player) {
	player.volume = 0.10;
	player.addEventListener("ended", playRandomSong);
}

/* Start audio ONLY after user interaction (fixes DOMException) */
window.addEventListener("click", () => {
	playRandomSong();
}, { once: true });


/* =========================================================
   SIDE GRID (JSON LOADER - NEOCITIES SAFE)
   - Builds Win7-style icon grid from links.json
========================================================= */

const grid = document.getElementById("sideGrid");

/**
 * Safely escapes HTML to prevent injection issues
 */
function escapeHTML(str) {
	return String(str)
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;");
}

/**
 * Renders grid items
 */
function renderGrid(data) {
	grid.innerHTML = data.map(item => `
		<a class="side-item" href="${item.url}" target="_blank" rel="noopener noreferrer">
			<i class="${item.icon}"></i>
			<span>${escapeHTML(item.name)}</span>
		</a>
	`).join("");
}

/**
 * Loads JSON file for side grid
 */
async function loadGrid() {
	if (!grid) return;

	try {
		const res = await fetch("./data/links.json", {
			cache: "no-store"
		});

		if (!res.ok) throw new Error(`HTTP ${res.status}`);

		const data = await res.json();
		renderGrid(data);

	} catch (err) {
		console.error("Failed to load links.json:", err);

		grid.innerHTML = `
			<div style="color:#1a1a1a;opacity:0.7;padding:10px;">
				Links failed to load
			</div>
		`;
	}
}

/* Load grid after page is ready */
window.addEventListener("DOMContentLoaded", loadGrid);