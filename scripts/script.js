
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
   SIDE GRID LOADER (ELITE VERSION)
   - Safe DOM creation (NO innerHTML injection risks)
   - Supports FontAwesome, images, emoji fallback
   - Handles errors cleanly
   - Beginner-friendly comments
========================================================= */

const grid = document.getElementById("sideGrid");

/* =========================================================
   HELPER: CREATE ELEMENT (SHORTCUT FUNCTION)
   Makes element creation cleaner and readable
========================================================= */
function createEl(tag, className, text) {
	const el = document.createElement(tag);

	if (className) el.className = className;
	if (text) el.textContent = text;

	return el;
}

/* =========================================================
   CREATE ICON (SMART HANDLER)
   Supports:
   - FontAwesome (fa-solid fa-house)
   - Images (img/icon.png)
   - Emoji fallback (🌐)
========================================================= */
function createIcon(iconValue, name) {
	let icon;

	if (!iconValue) {
		icon = createEl("span", "icon-fallback", "📁");
		return icon;
	}

	// IMAGE ICON
	if (iconValue.includes("/") || iconValue.startsWith("http")) {
		icon = createEl("img");
		icon.src = iconValue;
		icon.alt = name || "icon";
		return icon;
	}

	// FONT AWESOME ICON
	if (iconValue.startsWith("fa")) {
		icon = createEl("i", iconValue);
		return icon;
	}

	// EMOJI / TEXT
	icon = createEl("span", "icon-fallback", iconValue);
	return icon;
}

/* =========================================================
   CREATE ONE TILE
========================================================= */
function createTile(item) {

	const link = createEl("a", "side-item");

	// BASIC ATTRIBUTES
	link.href = item.url || "#";
	link.target = "_blank";
	link.rel = "noopener noreferrer";

	// TOOLTIP (nice UX bonus)
	if (item.description) {
		link.title = item.description;
	}

	// ICON
	const icon = createIcon(item.icon, item.name);

	// TEXT LABEL
	const textWrap = createEl("span", "label");
	const text = createEl("span", "title", item.name || "Untitled");

	textWrap.appendChild(text);

	// OPTIONAL DESCRIPTION (visible)
	if (item.description) {
		const desc = createEl("small", "desc", item.description);
		textWrap.appendChild(desc);
	}

	// ASSEMBLE
	link.appendChild(icon);
	link.appendChild(textWrap);

	// OPTIONAL CUSTOM CLASS (from JSON)
	if (item.class) {
		link.classList.add(item.class);
	}

	return link;
}

/* =========================================================
   RENDER GRID
========================================================= */
function renderGrid(data) {

	// Clear safely
	grid.innerHTML = "";

	const fragment = document.createDocumentFragment();

	data.forEach(item => {
		const tile = createTile(item);
		fragment.appendChild(tile);
	});

	grid.appendChild(fragment);
}

/* =========================================================
   LOAD JSON
========================================================= */
async function loadGrid() {
	if (!grid) return;

	try {
		const res = await fetch("./data/links.json", {
			cache: "no-store"
		});

		if (!res.ok) throw new Error(`HTTP ${res.status}`);

		const data = await res.json();

		// Validate: must be array
		if (!Array.isArray(data)) {
			throw new Error("JSON is not an array");
		}

		renderGrid(data);

	} catch (err) {
		console.error("GRID LOAD FAILURE:", err);

		grid.innerHTML = `
			<div class="grid-error">
				⚠ Failed to load links
			</div>
		`;
	}
}

/* =========================================================
   INIT
========================================================= */
window.addEventListener("DOMContentLoaded", loadGrid);