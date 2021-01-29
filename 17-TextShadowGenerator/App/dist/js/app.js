const DEFAULT_SHADOW = {
  id: 1,
  hLen: 3,
  vLen: 3,
  blurRadius: 2,
  opacity: 1,
  shadowColor: "#A82727",
};

const previewTextEl = document.getElementById("preview-text");
const previewContainer = document.getElementById("preview-container");

const textInputs = document.querySelectorAll(".text-inputs");

const shadowInputs = document.querySelectorAll(".shadow-input");

const textColorInput = document.getElementById("text-color");
const textColorHexInput = document.getElementById("text-color-hex");

const bgColorInput = document.getElementById("bg-color");
const bgColorHexInput = document.getElementById("bg-color-hex");

const shadowOpacityInput = document.getElementById("opacity");

const addShadowBtn = document.getElementById("add-shadow");

const copyToClipboardBtn = document.getElementById('copy-btn');

const firstShadow = document.querySelector('.first-shadow');

let shadowCounter = 2;

const shadows = [DEFAULT_SHADOW];

// Functions

// Helper Functions

const getRandomNumber = (min, max) => {
  // 5, 10
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const syncInputs = (value, firstInput, secondInput) => {
  firstInput.value = value;
  secondInput.value = value;
};

const syncInputAndText = (value, textEl) => {
  textEl.textContent = value;
};

const hexToRgba = (h, op) => {
  let r = 0,
    g = 0,
    b = 0;

  // 3 digits
  if (h.length == 4) {
    r = "0x" + h[1] + h[1];
    g = "0x" + h[2] + h[2];
    b = "0x" + h[3] + h[3];

    // 6 digits
  } else if (h.length == 7) {
    r = "0x" + h[1] + h[2];
    g = "0x" + h[3] + h[4];
    b = "0x" + h[5] + h[6];
  }

  return "rgba(" + +r + "," + +g + "," + +b + "," + op + ")";
};

const RGBToHex = (r, g, b) => {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);

  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;

  return "#" + r + g + b;
};

// Preview Functions
const changePreviewText = (value) => {
  previewTextEl.style.color = value;
};

const changePreviewContainerBg = (value) => {
  previewContainer.style.backgroundColor = value;
};


// Shadows functions 
const createShadowObject = () => {
  const shadowObj = {
    id: shadowCounter,
    hLen: getRandomNumber(-20, 20),
    vLen: getRandomNumber(-20, 20),
    blurRadius: getRandomNumber(0, 25),
    opacity: getRandomNumber(0, 100) / 100,
    shadowColor: RGBToHex(
      getRandomNumber(0, 255),
      getRandomNumber(0, 255),
      getRandomNumber(0, 255)
    ),
  };
  shadows.push(shadowObj);
  console.log(shadows);
  return shadowObj;
};

const checkIfOneShadow = () => {
  const firstShadow = document.querySelector(".shadows-list li.first-shadow");
  if (firstShadow.nextElementSibling) firstShadow.classList.add("active");
};

const removeShadowLi = (e) => {
  const shadowToRemove = e.target.closest("li");
  const shadowId = +shadowToRemove.querySelector("span").dataset.shnum - 1;

  shadows.splice(shadowId, 1);
  for (let i = shadowId; i < shadows.length; i++) {
    shadows[i].id -= 1;
  }
  updateCode(updateTextShadow());

  let nextShadow = shadowToRemove.nextElementSibling;
  // If next el has nex-shadow class than update id, content, data-attr;
  while (nextShadow.classList.contains("new-shadow")) {
    const shadowIdEl = nextShadow.querySelector("span[data-shnum]");
    // Get shadow id number and decrease by 1;
    const shadowIdNum = +shadowIdEl.id.split("-")[1] - 1;
    shadowIdEl.id = `shadow-${shadowIdNum}`;
    shadowIdEl.textContent = shadowIdNum;
    shadowIdEl.dataset.shnum = shadowIdNum;
    nextShadow = nextShadow.nextElementSibling;
  }

  if (shadowToRemove.classList.contains("active")) {
    shadowToRemove.previousElementSibling.classList.add("active");
  }
  shadowToRemove.remove();
  shadowCounter--;
};

const updateNewShadowInputs = (obj) => {
  const { ...shadowProps } = obj;
  shadowInputs.forEach((input, idx) => {
    if (input.type === "range") {
      const textPreview = input.previousElementSibling.querySelector("span");
      input.value = shadowProps[input.dataset.type];
      syncInputAndText(input.value, textPreview);
    } else if (input.type === "color") {
      input.value = shadowProps[input.dataset.type];
      syncInputs(input.value, input, shadowInputs[idx + 1]);
    }
  });
};

const renderShadowLi = (hookId) => {
  const shadowLi = document.createElement("li");
  shadowLi.className = "new-shadow active";
  shadowLi.innerHTML = `
        <span id="shadow-${shadowCounter}" data-shnum='${shadowCounter}'>${shadowCounter}</span>
        <span class="delete-shadow" id="delete-shadow">
            <i class="fas fa-times"></i>
        </span>
    `;

  const shadowObj = createShadowObject();

  updateNewShadowInputs(shadowObj);

  document.getElementById(hookId).insertBefore(shadowLi, addShadowBtn);
  shadowLi.addEventListener('click', toggleActiveShadowHandler);
  shadowLi
    .querySelector("#delete-shadow")
    .addEventListener("click", removeShadowLi);
  shadowCounter++;
  return shadowLi;
};

const getTextShadowString = (obj) => {
  const { hLen, vLen, blurRadius, opacity, shadowColor } = obj;
  return `${hLen}px ${vLen}px ${blurRadius}px ${hexToRgba(
    shadowColor,
    opacity
  )}`;
};

const updateTextShadow = () => {
  let str = "";
  shadows.forEach((shadow, idx) => {
    const prefix = idx === shadows.length - 1 ? "" : ",";
    str += getTextShadowString(shadow) + prefix;
  });
  previewTextEl.style.textShadow = str;
  updateCode(str);
  return str;
};

const updateCode = (str) => {
  document.getElementById("code-string").textContent = `text-shadow: ${str};`;
};

// Handlers

const textInputHandler = (e) => {
  const value = e.target.value;
  const type =
    e.target.dataset.type === "text-color"
      ? changePreviewText(value)
      : changePreviewContainerBg(value);
  syncInputs(value, textColorInput, textColorHexInput);
};

const addShadowHanlder = () => {
  const shadowLi = renderShadowLi("shadow-list");
  if (shadowLi.previousElementSibling) {
    shadowLi.previousElementSibling.classList.remove("active");
  }
  updateTextShadow();
};

const updateShadowHandler = (e) => {
  const type = e.target.type;
  const idx = document.querySelector(".shadows-list li.active > span").dataset
    .shnum;
  const shadow = shadows.find((el) => el.id === +idx);
  if (type === "range") {
    // Querying for range value preview el
    const inputValuePreviewEl = e.target.previousElementSibling.querySelector(
      "span"
    );
    syncInputAndText(e.target.value, inputValuePreviewEl);
  } else if (type === "color") {
    syncInputs(e.target.value, e.target, e.target.nextElementSibling);
  } else if (type === "text") {
    syncInputs(e.target.value, e.target, e.target.previousElementSibling);
  }
  shadow[e.target.dataset.type] = e.target.value;
  updateTextShadow();
};

const toggleActiveShadowHandler = (e) => {
  if (e.target.classList.contains('delete-shadow') || e.target.classList.contains('fas')) return;
  const shadowEl = e.target.closest('li');
  const span = shadowEl.querySelector('span');
  const id = +span.dataset.shnum;
  const shadowObj = shadows.find(el => el.id === id);
  updateNewShadowInputs(shadowObj);
  document.querySelectorAll('.shadows-list li').forEach(el => {
    el.classList.remove('active');
  })
  shadowEl.classList.add('active');
  console.log(shadowEl);
}

const copyToClipBoard = (id) => {
  var r = document.createRange();
  r.selectNode(document.getElementById(id));
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(r);
  document.execCommand('copy');
  window.getSelection().removeAllRanges();
}

const copyHandler = () => {
  copyToClipBoard('code-string');
  const tooltip = document.querySelector('.generator__item--code .tooltip');
  tooltip.classList.add('show');
  setTimeout(() => {
    tooltip.classList.remove('show');
  }, 1000);
}

// Event Listeners

textInputs.forEach((input) => {
  input.addEventListener("change", textInputHandler);
});

firstShadow.addEventListener('click', toggleActiveShadowHandler);

shadowInputs.forEach((input) => {
  input.addEventListener("change", updateShadowHandler);
  if (input.type === "range")
    input.addEventListener("mousemove", updateShadowHandler);
});

addShadowBtn.addEventListener("click", addShadowHanlder);

copyToClipboardBtn.addEventListener('click', copyHandler);
