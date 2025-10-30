const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current");
const durationEl = document.getElementById("duration");
const back10 = document.getElementById("back10");
const forward10 = document.getElementById("forward10");
const loopBtn = document.getElementById("loop");

let isPlaying = false;
let isLoop = false;

playBtn.addEventListener("click", () => {
  if (isPlaying) {
    audio.pause();
    playBtn.innerHTML = "&#9654;"; // ▶
  } else {
    audio.play();
    playBtn.innerHTML = "&#10073;&#10073;"; // ||
  }
  isPlaying = !isPlaying;
});

audio.addEventListener("timeupdate", () => {
  const { currentTime, duration } = audio;
  progress.value = (currentTime / duration) * 100;
  currentTimeEl.textContent = formatTime(currentTime);
  durationEl.textContent = formatTime(duration);
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

back10.addEventListener("click", () => { audio.currentTime -= 10; });
forward10.addEventListener("click", () => { audio.currentTime += 10; });
loopBtn.addEventListener("click", () => {
  audio.currentTime = 0;
  audio.play();
});

function formatTime(sec) {
  if (isNaN(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}