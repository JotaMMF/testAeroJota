/* =========================================================
   FLIPCLOCK WIDGET
   Requires: jQuery, FlipClock 0.7.8
========================================================= */
let flipClockInstance = null;

/* =========================================================
   GREETING
========================================================= */
function updateGreeting(targetId = "greeting") {
    const el = document.getElementById(targetId);
    if (!el) return;

    const hour = new Date().getHours(); // uses local timezone automatically

    let text;
    if (hour >= 5 && hour < 12)       text = "Good morning 🌅";
    else if (hour >= 12 && hour < 18)  text = "Good afternoon ☀️";
    else if (hour >= 18 && hour < 22)  text = "Good evening 🌇";
    else                               text = "Good night 🌙";

    el.textContent = text;
}

/* =========================================================
   INIT FLIPCLOCK
========================================================= */
function initFlipClock(selector) {
    const el = document.querySelector(selector);
    if (!el || typeof window.jQuery === "undefined") return;
    if (flipClockInstance) return flipClockInstance;

    flipClockInstance = $(el).FlipClock({
        clockFace: "TwentyFourHourClock",
        showSeconds: false
    });

    return flipClockInstance;
}

/* =========================================================
   INIT ON LOAD
========================================================= */
window.addEventListener("DOMContentLoaded", () => {
    initFlipClock("#flipClock");
    updateGreeting();
    setInterval(updateGreeting, 60000);
});