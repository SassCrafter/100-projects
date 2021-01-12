const RADIUS_INITIAL_VALUE = 5;
//const borderTopRightRadius = 5;
//const borderBottomLeftRadius = 5;
//const borderTopLeftRadius = 5;
//const borderBottomRightRadius = 5;

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
const borderValuesRadioInputs = document.querySelectorAll(
  'input[type="radio"]'
);
const borderRadiusInputs = document.querySelectorAll(
  ".generator__input--radius"
);

const topLeftInput = document.getElementById("topLeft-input");
const topRightInput = document.getElementById("topRight-input");
const bottomLeftInput = document.getElementById("bottomLeft-input");
const bottomRightInput = document.getElementById("bottomRight-input");

const valuesContainer = document.querySelectorAll(".generator__values");

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
  element.innerText = value;
};

const updateBorderStyles = (e) => {
  const input = e.target;
  const method = input.dataset.borderChange;
  borderPrefix = input.id === "border-width-input" ? "px" : "";
  previewBoxEl.style[method] = input.value + borderPrefix;
  updateBorderStyleCopyText(e);
  if (method === "borderWidth") {
    updateNumDisplay(borderWidthNumberEl, input.value);
  } else if (method === "borderColor") {
    syncColorAndTextInputs(borderColorHexInput, input.value);
  }
};

const updateBorderStyleCodeText = (
  element,
  width,
  style = "solid",
  color = "#800000"
) => {
  const text = `${width}px ${style} ${color}`;
  element.innerText = text;
};

const updateBorderRadius = (e) => {
  let borderRadiusText;
  const input = e.target;
  const radius = input.value;
  const radiusType = input.dataset.radius;
  const numberEl = input.previousElementSibling.children[0];
  if (radiusType === "all") {
    previewBoxEl.style.borderRadius = `${radius}px`;
    borderRadiusText = `${radius}px`;
  } else if (radiusType === "one-corner") {
    previewBoxEl.style[input.dataset.corner] = `${radius}px`;
    borderRadiusText = `${topLeftInput.value}px ${topRightInput.value}px ${bottomLeftInput.value}px ${bottomRightInput.value}px`;
  }
  updateNumDisplay(numberEl, radius);
  updateNumDisplay(copyBorderRadiusTextEl, borderRadiusText);
};

const updateBorderStyleCopyText = (e) => {
  const borderWidth = borderWidthInput.value;
  const borderStyle = borderStyleInput.value;
  const borderColor = borderColorInput.value;
  updateBorderStyleCodeText(
    copyBorderStyleTextEl,
    borderWidth,
    borderStyle,
    borderColor
  );
};

const showBorderInputs = (e) => {
  const input = e.target;
  const inputsContainer = document.querySelector(
    `[data-radio-border='${input.dataset.radio}'`
  );
  valuesContainer.forEach((container) => {
    if (!container.classList.contains("hidden")) {
      container.classList.add("hidden");
    }
  });

  inputsContainer.classList.remove("hidden");
};

const copyToClipBoard = (selector) => {
  const r = document.createRange();
  r.selectNode(document.querySelector(selector));
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(r);
  document.execCommand("copy");
  window.getSelection().removeAllRanges();
};

const reset = (e) => {
  console.log("reset");
  borderRadiusInputs.forEach((input) => {
    input.value = RADIUS_INITIAL_VALUE;
    const numEl = input.previousElementSibling.children[0];
    updateNumDisplay(numEl, input.value);
    updateBorderStyleCopyText();
  });
  previewBoxEl.style.borderRadius = RADIUS_INITIAL_VALUE + "px";
  const inputDataAttr = e.target.dataset.radio;
  const text =
    inputDataAttr === "1"
      ? RADIUS_INITIAL_VALUE + "px"
      : `${RADIUS_INITIAL_VALUE}px ${RADIUS_INITIAL_VALUE}px ${RADIUS_INITIAL_VALUE}px ${RADIUS_INITIAL_VALUE}px`;
  updateNumDisplay(copyBorderRadiusTextEl, text);
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

borderValuesRadioInputs.forEach((input) => {
  input.addEventListener("click", (e) => {
    showBorderInputs(e);
    reset(e);
  });
});

borderRadiusInputs.forEach((input) => {
  input.addEventListener("mousemove", updateBorderRadius);
  input.addEventListener("change", updateBorderRadius);
});

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
