let soundEnabled = true;

const keySound = new Audio("/sounds/key.mp3");
const enterSound = new Audio("/sounds/enter.mp3");

export function loadSoundPreference() {
  const stored = localStorage.getItem("terminal-sound");
  soundEnabled = stored !== "off";
}

export function setSound(enabled: boolean) {
  soundEnabled = enabled;
  localStorage.setItem("terminal-sound", enabled ? "on" : "off");
}

export function playKeySound() {
  if (!soundEnabled) return;
  keySound.currentTime = 0;
  keySound.play().catch(() => {});
}

export function playEnterSound() {
  if (!soundEnabled) return;
  enterSound.currentTime = 0;
  enterSound.play().catch(() => {});
}
