const controllTriggers = document.querySelectorAll(".controll-trigger");
const previewBoxBgInput = document.getElementById("preview-bg");
const previewBoxBgHexInput = document.getElementById("preview-bg-hex");
const previewContainerBgInput = document.getElementById("container-bg");
const previewContainerBgHexInput = document.getElementById("container-bg-hex");
const borderWidthInput = document.getElementById("border-width-input");
const radiusAllInput = document.getElementById("radius-all");

const previewBoxEl = document.querySelector(".generator__preview-box");
const previewContainerEl = document.querySelector(
  ".generator__preview-container"
);
const borderRadiusNumberEl = document.getElementById("radius-number");
const borderWidthNumberEl = document.getElementById("border-width-number");

let arrowDeg = 0;

const changeBg = (element, color) => {
  element.style.backgroundColor = color;
};

const syncColorAndTextInputs = (input, value) => {
  input.value = value;
};

const syncRangeAndNumPreview = (element, value) => {
  element.innerText = `${value}px`;
};

const changeBorderWidth = (e) => {
  const width = e.target.value;
  previewBoxEl.style.borderWidth = `${width}px`;
  syncRangeAndNumPreview(borderWidthNumberEl, width);
};

const updateBorderRadius = (e) => {
  const radius = e.target.value;
  previewBoxEl.style.borderRadius = `${radius}px`;
  syncRangeAndNumPreview(borderRadiusNumberEl, radius);
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
borderWidthInput.addEventListener("mousemove", changeBorderWidth);
borderWidthInput.addEventListener("change", changeBorderWidth);

radiusAllInput.addEventListener("mousemove", updateBorderRadius);
radiusAllInput.addEventListener("change", updateBorderRadius);

controllTriggers.forEach((trigger) => {
  trigger.addEventListener("click", openCloseControll);
});
