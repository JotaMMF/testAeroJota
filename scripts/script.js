/* =========================================================
   TAB SYSTEM (SCOPED PER WINDOW)
   - Each .window becomes an independent tab group
   - Fixes global tab conflict issue
========================================================= */

function initTabs(container) {
	const tabs = container.querySelectorAll('[role="tab"]');
	const panels = container.querySelectorAll('[role="tabpanel"]');

	if (!tabs.length || !panels.length) return;

	function activateTab(tab) {
		const targetId = tab.getAttribute("aria-controls");

		// Only affect tabs inside this container
		tabs.forEach(t => t.setAttribute("aria-selected", "false"));
		tab.setAttribute("aria-selected", "true");

		panels.forEach(panel => {
			panel.hidden = panel.id !== targetId;
		});
	}

	tabs.forEach((tab, i) => {
		tab.addEventListener("click", () => activateTab(tab));

		// initial state per group
		tab.setAttribute("aria-selected", i === 0 ? "true" : "false");
	});

	// show first panel per group
	panels.forEach((p, i) => {
		p.hidden = i !== 0;
	});
}

/* Init all tab containers */
function initAllTabs() {
	document.querySelectorAll(".tabs").forEach(initTabs);
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
	player.play().catch(() => { });
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
		img.loading = "lazy";
		img.decoding = "async";
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
   UNIVERSAL LIST LOADER
   - Supports objects OR simple strings
   - Reusable for ANY <ul>
========================================================= */

/* =========================================================
   UNIVERSAL JSON LIST LOADER
   ---------------------------------------------------------
   PURPOSE:
   - Loads data from JSON into any <ul>
   - Supports:
	 • Simple lists (["HTML", "CSS"])
	 • Link objects ({name, url})
   - Keeps DOM creation safe (no innerHTML injection)
========================================================= */

async function loadList(elementId, jsonPath, options = {}) {
	const listEl = document.getElementById(elementId);
	if (!listEl) return;

	/* -----------------------------
	   OPTIONS (configurable behavior)
	------------------------------ */
	const {
		type = "auto",        // "simple" | "links" | "auto"
		bullet = false        // forces bullet styling if needed
	} = options;

	try {
		/* -----------------------------
		   FETCH JSON DATA
		------------------------------ */
		const res = await fetch(jsonPath, { cache: "no-store" });

		if (!res.ok) {
			throw new Error(`HTTP ${res.status}`);
		}

		const data = await res.json();

		if (!Array.isArray(data)) {
			throw new Error("JSON must be an array");
		}

		/* -----------------------------
		   CLEAR OLD CONTENT
		------------------------------ */
		listEl.textContent = "";

		const fragment = document.createDocumentFragment();

		/* -----------------------------
		   BUILD LIST ITEMS
		------------------------------ */
		data.forEach(item => {
			const li = document.createElement("li");

			/* =========================
			   SIMPLE LIST (strings)
			========================= */
			if (type === "simple" || typeof item === "string") {
				li.textContent = item;
			}

			/* =========================
			   LINK LIST (objects)
			========================= */
			else if (type === "links" || typeof item === "object") {
				const p = document.createElement("p");

				const a = document.createElement("a");
				a.href = item.url || "#";
				a.target = "_blank";
				a.rel = "noopener noreferrer";
				a.textContent = item.name || "Untitled";

				p.appendChild(a);
				li.appendChild(p);
			}

			fragment.appendChild(li);
		});

		listEl.appendChild(fragment);

		/* -----------------------------
		   OPTIONAL BULLET MODE
		   (used for knowledge section)
		------------------------------ */
		if (bullet) {
			listEl.classList.add("bullet-list");
		}

	} catch (err) {
		console.error(`LIST LOAD ERROR (${elementId}):`, err);
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
	"./img/asadal2.jpg"
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

	// Projects (links)
	loadList("githubProjects", "./data/projects.json", { type: "links" });
	loadList("codepenProjects", "./data/codepen.json", { type: "links" });

	loadList("skillsList", "./data/skills.json", {
		type: "simple",
		bullet: true
	});

	loadList("knowledgeList", "./data/knowledge.json", {
		type: "simple",
		bullet: true
	});

	applyLeBounce();
	initAllTabs();
});