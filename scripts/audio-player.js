/* =========================================================
   AUDIO PLAYER
========================================================= */

const player = document.getElementById("audioPlayer");
const nowPlaying = document.getElementById("nowPlaying");
const randomSongBtn = document.getElementById("randomSongBtn");

let songs = [];
let lastIndex = -1;


/* ---------------------------------------------------------
   LOAD SONGS FROM JSON
--------------------------------------------------------- */

async function loadSongs() {
	try {
		const res = await fetch("./data/music.json");
		songs = await res.json();
	} catch (err) {
		console.error("Failed to load music.json", err);
	}
}


/* ---------------------------------------------------------
   PLAY RANDOM SONG
--------------------------------------------------------- */

function playRandomSong() {
	if (!player || songs.length === 0) return;

	let index;

	do {
		index = Math.floor(Math.random() * songs.length);
	} while (songs.length > 1 && index === lastIndex);

	lastIndex = index;

	const song = songs[index];

	player.src = song.url;

	// ✅ TEXT DISPLAY FIX
	if (nowPlaying) {
		nowPlaying.textContent = `${song.author} - ${song.title}`;
	}

	player.play().catch(() => {});
}


/* ---------------------------------------------------------
   INIT
--------------------------------------------------------- */

async function initAudioPlayer() {
	if (!player) return;

	player.volume = 0.10;

	await loadSongs();

	player.addEventListener("ended", playRandomSong);

	// ✅ BUTTON FIX
	if (randomSongBtn) {
		randomSongBtn.addEventListener("click", playRandomSong);
	}
}

initAudioPlayer();


/* ---------------------------------------------------------
   AUTOSTART ON FIRST USER INTERACTION
--------------------------------------------------------- */

window.addEventListener("click", () => {
	playRandomSong();
}, { once: true });