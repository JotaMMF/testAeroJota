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