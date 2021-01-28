const previewTextEl = document.getElementById('preview-text');
const previewContainer = document.getElementById('preview-container');

const textInputs = document.querySelectorAll('.text-inputs');

const shadowInputs = document.querySelectorAll('.shadow-input');

const textColorInput = document.getElementById('text-color');
const textColorHexInput = document.getElementById('text-color-hex');

const bgColorInput = document.getElementById('bg-color');
const bgColorHexInput = document.getElementById('bg-color-hex');

const shadowOpacityInput = document.getElementById('opacity');

const addShadowBtn = document.getElementById('add-shadow');

let shadowCounter = 2;

// Functions

const syncInputs = (value, firstInput, secondInput) => {
    firstInput.value = value;
    secondInput.value = value;
}

const syncInputAndText = (value, textEl) => {
    textEl.textContent = value;
}

const changePreviewText = (value) => {
    previewTextEl.style.color = value;
}

const changePreviewContainerBg = (value) => {
    previewContainer.style.backgroundColor = value;
}

const hexToRgba = (h, op) => {
    let r = 0, g = 0, b = 0;

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
}


const textInputHandler = e => {
    const value = e.target.value;
    const type = e.target.dataset.type === 'text-color' ? changePreviewText(value) : changePreviewContainerBg(value);
    syncInputs(value, textColorInput, textColorHexInput);
    
}



const getTextShadowString = () => {
    let str = '';
    shadowInputs.forEach(input => {
        if (input.type === 'range' && input.id !== 'opacity') {
            str += `${input.value}px `
        } else if (input.type === 'color') {
            str += `${hexToRgba(input.value, shadowOpacityInput.value)}`;
        }
    });
    //console.log(str);
    return str;
}

const updateCode = () => {
    document.getElementById('code-string').textContent = `text-shadow: ${getTextShadowString()};`;
}

const updateTextShadow = () => {
    previewTextEl.style.textShadow = `${getTextShadowString()}`;
    updateCode();
}

const changeShadowHandler = e => {
    const type = e.target.type;
    if (type === 'range') {
        // Querying for range value preview el
        const inputValuePreviewEl = e.target.previousElementSibling.querySelector('span');
        syncInputAndText(e.target.value, inputValuePreviewEl);
    } else if (type === 'color') {
        syncInputs(e.target.value, e.target, e.target.nextElementSibling);
    } else if (type === 'text') {
        syncInputs(e.target.value, e.target, e.target.previousElementSibling);
    }
    updateTextShadow();
}

const removeShadowLi = e => {
    const shadowToRemove = e.target.closest('li');
    let nextShadow = shadowToRemove.nextElementSibling;
    
    // If next el has nex-shadow class than update id, content, data-attr;
    while( nextShadow.classList.contains('new-shadow') ) {
        const shadowIdEl = nextShadow.querySelector('span[data-shnum]');
        // Get shadow id number and decrease by 1;
        const shadowIdNum = +shadowIdEl.id.split('-')[1] - 1;
        shadowIdEl.id =  `shadow-${shadowIdNum}`;
        shadowIdEl.textContent = shadowIdNum;
        shadowIdEl.dataset.shnum = shadowIdNum;
        nextShadow = nextShadow.nextElementSibling;
    }
    shadowToRemove.remove();
    shadowCounter--;
    
}

const renderShadowLi = (hookId) => {
    const shadowLi = document.createElement('li');
    shadowLi.className = 'new-shadow active';
    shadowLi.innerHTML = `
        <span id="shadow-${shadowCounter}" data-shnum='${shadowCounter}'>${shadowCounter}</span>
        <span class="delete-shadow" id="delete-shadow">
            <i class="fas fa-times"></i>
        </span>
    `;
    document.getElementById(hookId).insertBefore(shadowLi, addShadowBtn);
    shadowLi.querySelector('#delete-shadow').addEventListener('click', removeShadowLi);
    shadowCounter++;
    return shadowLi
}


const addShadowHanlder = () => {
    const shadowLi = renderShadowLi('shadow-list');;
    if (shadowLi.previousElementSibling) {
        shadowLi.previousElementSibling.classList.remove('active');
    }
}




// Event Listeners

textInputs.forEach(input => {
    input.addEventListener('change', textInputHandler);
});

shadowInputs.forEach(input => {
    input.addEventListener('change', changeShadowHandler);
    if (input.type === 'range') input.addEventListener('mousemove', changeShadowHandler);
})

addShadowBtn.addEventListener('click', addShadowHanlder);