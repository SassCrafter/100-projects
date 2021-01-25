const loaderEl = document.getElementById("loader-bg");
const loaderTextEl = document.getElementById("loader-text");
let loading = 0;
let int = setInterval(blurring, 30);

function blurring() {
  loading++;

  if (loading > 99) {
    clearInterval(int);
    loaderTextEl.hidden = true;
  }
  //loaderEl.style.opacity = scale(loading, 0, 100, 0, 1);
  loaderTextEl.textContent = `${loading}%`;
  loaderEl.style.filter = `blur(${scale(loading, 0, 100, 30, 0)}px)`;
}

const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};
