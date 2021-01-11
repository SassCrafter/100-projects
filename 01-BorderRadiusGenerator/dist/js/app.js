const controllTriggers = document.querySelectorAll(".controll-trigger");
const previewBoxBgInput = document.getElementById("preview-bg");
const previewBoxBgHexInput = document.getElementById("preview-bg-hex");
const previewContainerBgInput = document.getElementById("container-bg");
const previewContainerBgHexInput = document.getElementById("container-bg-hex");
const borderWidthInput = document.getElementById("border-width-input");
const radiusAllInput = document.getElementById("radius-all");
const borderStyleInput = document.getElementById("border-style-input");
const borderColorInput = document.getElementById("border-color-input");
const borderColorHexInput = document.getElementById("border-color-hex");
const borderInputs = document.querySelectorAll("[data-border-change]");

const previewBoxEl = document.querySelector(".generator__preview-box");
const previewContainerEl = document.querySelector(
  ".generator__preview-container"
);
const borderRadiusNumberEl = document.getElementById("radius-number");
const borderWidthNumberEl = document.getElementById("border-width-number");
const copyCodeEl = document.querySelector(".generator__code");
const copyBorderRadiusTextEl = document.getElementById("radius-text");
const copyBorderStyleTextEl = document.getElementById("border-width-text");

let arrowDeg = 0;
let borderPrefix = "px";

const changeBg = (element, color) => {
  element.style.backgroundColor = color;
};

const syncColorAndTextInputs = (input, value) => {
  input.value = value;
};

const updateNumDisplay = (element, value) => {
  element.innerText = `${value}px`;
};

const updateBorderStyles = (e) => {
  const input = e.target;
  const method = input.dataset.borderChange;
  borderPrefix = input.id === "border-width-input" ? "px" : "";
  previewBoxEl.style[method] = input.value + borderPrefix;
  updateCopyText(e);
  if (method === "borderWidth") {
    updateNumDisplay(borderWidthNumberEl, input.value);
  } else if (method === "borderColor") {
    syncColorAndTextInputs(borderColorHexInput, input.value);
  }
};

const updateInnerText = (
  element,
  width,
  style = "solid",
  color = "#800000"
) => {
  const text = `${width}px ${style} ${color}`;
  element.innerText = text;
};

const updateBorderRadius = (e) => {
  const radius = e.target.value;
  previewBoxEl.style.borderRadius = `${radius}px`;
  updateNumDisplay(borderRadiusNumberEl, radius);
  updateNumDisplay(copyBorderRadiusTextEl, radius);
};

const updateCopyText = (e) => {
  const borderWidth = borderWidthInput.value;
  const borderStyle = borderStyleInput.value;
  const borderColor = borderColorInput.value;
  updateInnerText(copyBorderStyleTextEl, borderWidth, borderStyle, borderColor);
};

const copyToClipBoard = (selector) => {
  const r = document.createRange();
  r.selectNode(document.querySelector(selector));
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(r);
  document.execCommand("copy");
  window.getSelection().removeAllRanges();
};

const openCloseControll = (e) => {
  let controllBody;
  let arrow;
  arrowDeg += 180;
  if (arrowDeg >= 360) deg = 0;
  if (!e.target.classList.contains("controll-trigger")) {
    controllBody = e.target.parentElement.nextElementSibling;
    arrow = e.target.nextElementSibling;
    e.target.parentElement.classList.toggle("open");
  } else {
    arrow = e.target.querySelector("i");
    e.target.classList.toggle("open");
    controllBody = e.target.nextElementSibling;
  }
  controllBody.classList.toggle("open");
  arrow.style = `transform: rotate(${arrowDeg}deg)`;
};

previewBoxBgInput.addEventListener("change", (e) => {
  const color = e.target.value;
  changeBg(previewBoxEl, color);
  syncColorAndTextInputs(previewBoxBgHexInput, color);
});
previewBoxBgHexInput.addEventListener("input", (e) => {
  const color = e.target.value;
  changeBg(previewBoxEl, color);
  syncColorAndTextInputs(previewBoxBgInput, color);
});

previewContainerBgInput.addEventListener("change", (e) => {
  const color = e.target.value;
  changeBg(previewContainerEl, color);
  syncColorAndTextInputs(previewContainerBgHexInput, color);
});
previewContainerBgHexInput.addEventListener("input", (e) => {
  const color = e.target.value;
  changeBg(previewContainerEl, color);
  syncColorAndTextInputs(previewContainerBgInput, color);
});

// Border Inputs Event Listeners
borderInputs.forEach((input) => {
  input.addEventListener("mousemove", updateBorderStyles);
  input.addEventListener("change", updateBorderStyles);
});

radiusAllInput.addEventListener("mousemove", updateBorderRadius);
radiusAllInput.addEventListener("change", updateBorderRadius);

copyCodeEl.addEventListener("click", () => {
  const tip = copyCodeEl.querySelector(".generator__code-tip");
  tip.classList.add("clicked");
  setTimeout(() => {
    tip.classList.remove("clicked");
  }, 500);
  copyToClipBoard("#code-box");
});

controllTriggers.forEach((trigger) => {
  trigger.addEventListener("click", openCloseControll);
});
