const autoTextEl = document.getElementById("auto-text");
const autoText = autoTextEl.dataset.text;
const range = document.getElementById("text-speed");

let speed = 300 / range.value;
let counter = 0;

const showText = () => {
  const length = autoText.length;
  if (counter > length) counter = 0;
  autoTextEl.textContent = autoText.slice(0, counter + 1);
  counter++;
  setTimeout(showText, speed);
};

const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

const rangeHandler = (e) => {
  const label = e.target.previousElementSibling;
  const value = +e.target.value;
  speed = 300 / value;

  const rangeWidth = getComputedStyle(e.target).getPropertyValue("width");
  const labelWidth = getComputedStyle(label).getPropertyValue("width");

  const numWidth = +rangeWidth.substring(0, rangeWidth.length - 2);
  const numLabelWidth = +labelWidth.substring(0, labelWidth.length - 2);

  const max = +e.target.max;
  const min = +e.target.min;

  const left =
    value * (numWidth / max) -
    numLabelWidth / 2 +
    scale(value, min, max, 10, 15);

  label.style.left = `${left}px`;

  label.textContent = value;
  console.log(rangeWidth, labelWidth);
};

showText();

range.addEventListener("change", rangeHandler);
range.addEventListener("mousemove", rangeHandler);
