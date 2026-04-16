/* =========================================================
   TAB SYSTEM (ARIA ACCESSIBLE)
========================================================= */

const tabs = document.querySelectorAll('[role="tab"]');
const panels = document.querySelectorAll('[role="tabpanel"]');

function activateTab(tab) {
	if (!tab) return;

	const targetId = tab.getAttribute("aria-controls");

	tabs.forEach(t => t.setAttribute("aria-selected", "false"));
	tab.setAttribute("aria-selected", "true");

	panels.forEach(panel => {
		panel.hidden = panel.id !== targetId;
	});
}

if (tabs.length && panels.length) {
	tabs.forEach((tab, i) => {
		tab.addEventListener("click", () => activateTab(tab));
		tab.setAttribute("aria-selected", i === 0 ? "true" : "false");
	});

	panels.forEach((p, i) => {
		p.hidden = i !== 0;
	});
}


/* =========================================================
   ACCORDION SYSTEM
========================================================= */

document.querySelectorAll("details.accordion").forEach(details => {
	const section = details.querySelector(":scope > *:not(summary)");
	if (!section) return;

	details.addEventListener("toggle", () => {
		section.style.maxHeight = details.open
			? section.scrollHeight + "px"
			: "0px";
	});
});


/* =========================================================
   AUDIO PLAYER
========================================================= */

const player = document.getElementById("audioPlayer");

const songs = [
	"https://files.catbox.moe/9pk0tz.mp3",
	"https://files.catbox.moe/va5q43.mp3",
	"https://files.catbox.moe/dhv4hb.mp3",
	"https://files.catbox.moe/ih2z66.mp3"
];

let lastIndex = -1;

function playRandomSong() {
	if (!player) return;

	let index;
	do {
		index = Math.floor(Math.random() * songs.length);
	} while (index === lastIndex);

	lastIndex = index;

	player.src = songs[index];
	player.play().catch(() => {});
}

if (player) {
	player.volume = 0.10;
	player.addEventListener("ended", playRandomSong);
}

window.addEventListener("click", () => {
	playRandomSong();
}, { once: true });


/* =========================================================
   SIDE GRID LOADER
========================================================= */

const grid = document.getElementById("sideGrid");

/* Helper */
function createEl(tag, className, text) {
	const el = document.createElement(tag);
	if (className) el.className = className;
	if (text) el.textContent = text;
	return el;
}

/* Icon handler */
function createIcon(iconValue, name) {
	if (!iconValue) return createEl("span", "icon-fallback", "📁");

	if (iconValue.includes("/") || iconValue.startsWith("http")) {
		const img = createEl("img");
		img.src = iconValue;
		img.alt = name || "icon";
		return img;
	}

	if (iconValue.startsWith("fa")) {
		return createEl("i", iconValue);
	}

	return createEl("span", "icon-fallback", iconValue);
}

/* Tile */
function createTile(item) {
	const link = createEl("a", "side-item");

	link.href = item.url || "#";
	link.target = "_blank";
	link.rel = "noopener noreferrer";

	if (item.description) {
		link.title = item.description;
	}

	const icon = createIcon(item.icon, item.name);

	const textWrap = createEl("span", "label");
	const text = createEl("span", "title", item.name || "Untitled");

	textWrap.appendChild(text);

	if (item.description) {
		const desc = createEl("small", "desc", item.description);
		textWrap.appendChild(desc);
	}

	link.appendChild(icon);
	link.appendChild(textWrap);

	if (item.class) {
		link.classList.add(item.class);
	}

	return link;
}

/* Render grid */
function renderGrid(data) {
	if (!grid) return;

	grid.innerHTML = "";

	const fragment = document.createDocumentFragment();

	data.forEach(item => {
		fragment.appendChild(createTile(item));
	});

	grid.appendChild(fragment);
}

/* Load grid JSON */
async function loadGrid() {
	if (!grid) return;

	try {
		const res = await fetch("./data/links.json", {
			cache: "no-store"
		});

		if (!res.ok) throw new Error(`HTTP ${res.status}`);

		const data = await res.json();

		if (!Array.isArray(data)) {
			throw new Error("JSON is not an array");
		}

		renderGrid(data);

	} catch (err) {
		console.error("GRID LOAD FAILURE:", err);

		grid.innerHTML = `
			<div class="grid-error">⚠ Failed to load links</div>
		`;
	}
}


/* =========================================================
   GENERIC PROJECT LIST LOADER
========================================================= */

async function loadProjectList(elementId, jsonPath) {
	const listEl = document.getElementById(elementId);
	if (!listEl) return;

	try {
		const res = await fetch(jsonPath, {
			cache: "no-store"
		});

		if (!res.ok) throw new Error(`HTTP ${res.status}`);

		const data = await res.json();

		if (!Array.isArray(data)) {
			throw new Error("JSON must be an array");
		}

		listEl.innerHTML = "";

		const fragment = document.createDocumentFragment();

		data.forEach(item => {
			const li = createEl("li");
			const p = createEl("p");

			const link = createEl("a");
			link.href = item.url || "#";
			link.target = "_blank";
			link.rel = "noopener noreferrer";
			link.textContent = item.name || "Untitled";

			p.appendChild(link);
			li.appendChild(p);
			fragment.appendChild(li);
		});

		listEl.appendChild(fragment);

	} catch (err) {
		console.error(`LOAD FAILURE (${elementId}):`, err);
		listEl.innerHTML = `<li>⚠ Failed to load</li>`;
	}
}

/* =========================================================
   RANDOM BACKGROUND IMAGE
   - Picks a random image from /img
   - Overrides CSS background
========================================================= */

const backgrounds = [
	"./img/asadal.jpg",
	"./img/asadal2.jpg",
	"./img/asadal3.jpg",
	"./img/asadal4.jpg",
	"./img/asadal5.jpg"
	// 👉 add more images here
];

function setRandomBackground() {
	if (!backgrounds.length) return;

	const index = Math.floor(Math.random() * backgrounds.length);
	const selected = backgrounds[index];

	document.body.style.backgroundImage = `url("${selected}")`;
}

/* =========================================================
   TEXT LETTER SPLITTER (LEBOUNCE)
   - Wraps each letter in <span>
   - Enables per-letter animation automatically
========================================================= */

function applyLeBounce() {
	const elements = document.querySelectorAll(".lebounce");

	elements.forEach(el => {
		const text = el.textContent;
		el.textContent = "";

		[...text].forEach((char, i) => {
			const span = document.createElement("span");

			span.textContent = char === " " ? "\u00A0" : char;
			span.style.animationDelay = `${i * 0.1}s`;

			el.appendChild(span);
		});
	});
}

/* =========================================================
   INIT
========================================================= */

window.addEventListener("DOMContentLoaded", () => {
	setRandomBackground();

	loadGrid();
	loadProjectList("githubProjects", "./data/projects.json");
	loadProjectList("codepenProjects", "./data/codepen.json");

	applyLeBounce(); // 👈 ADD THIS
});