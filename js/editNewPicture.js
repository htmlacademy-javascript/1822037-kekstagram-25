const scaleControlSmallerElement = document.querySelector('.scale__control--smaller');
const scaleControlBiggerElement = document.querySelector('.scale__control--bigger');
const scaleControlInputElement = document.querySelector('.scale__control--value');
const fullPictureImg = document.querySelector('.img-upload__preview img');
const effectsListElement = document.querySelector('.effects__list');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');
const effectLevelSliderElement = document.querySelector('.effect-level__slider');
const effectLevelValueElement = document.querySelector('.effect-level__value');


scaleControlBiggerElement.setAttribute('disabled', 'disabled');

let size = 1;
const step = 0.25;

scaleControlSmallerElement.addEventListener('click', () => {
  size = size - step;
  fullPictureImg.style  = `transform: scale(${size})`;
  scaleControlBiggerElement.removeAttribute('disabled');
  if (size === 0.25) {
    scaleControlSmallerElement.setAttribute('disabled', 'disabled');
  }

  const sizeString = size.toString();

  if (sizeString.startsWith('1')) {
    scaleControlInputElement.value = `${sizeString}00%`;
  } else if(sizeString.endsWith('5') && sizeString.length === 3) {
    scaleControlInputElement.value = `${sizeString.substring(2)}0%`;
  } else {
    scaleControlInputElement.value = `${sizeString.substring(2)}%`;
  }
});

scaleControlBiggerElement.addEventListener('click', () => {
  if (size < 1) {
    size = size + step;
    fullPictureImg.style  = `transform: scale(${size})`;
    scaleControlSmallerElement.removeAttribute('disabled');
  } else if (size === 1) {
    scaleControlBiggerElement.setAttribute('disabled', 'disabled');
  }

  const sizeString = size.toString();

  if (sizeString.startsWith('1')) {
    scaleControlInputElement.value = `${sizeString}00%`;
  } else if(sizeString.endsWith('5') && sizeString.length === 3) {
    scaleControlInputElement.value = `${sizeString.substring(2)}0%`;
  } else {
    scaleControlInputElement.value = `${sizeString.substring(2)}%`;
  }
});

let oldEffectsClass = fullPictureImg.classList.add('effects__preview--none');

effectsListElement.addEventListener('change', (evt) => {
  if (evt.target.closest('.effects__radio')) {
    const newEffectClass = `effects__preview--${evt.target.value}`;
    oldEffectsClass = fullPictureImg.classList.value;
    fullPictureImg.classList.replace(oldEffectsClass, newEffectClass);
  }
});

noUiSlider.create(effectLevelSliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

effectsListElement.addEventListener('change', (evt) => {
  effectLevelContainer.classList.remove('hidden');
  if (evt.target.closest('.effects__radio') && evt.target.value === 'marvin') {
    effectLevelSliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100
      },
      start: 100,
      step: 1
    });
  } else if (evt.target.closest('.effects__radio') && evt.target.value === 'phobos') {
    effectLevelSliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3
      },
      start: 3,
      step: 0.1
    });
  } else if (evt.target.closest('.effects__radio') && evt.target.value === 'heat') {
    effectLevelSliderElement.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3
      },
      start: 3,
      step: 0.1
    });
  } else {
    effectLevelSliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1
    });
    effectLevelSliderElement.noUiSlider.set(1);
  }
});

effectLevelSliderElement.noUiSlider.on('update', () => {
  effectLevelValueElement.value = effectLevelSliderElement.noUiSlider.get();
  if (fullPictureImg.classList.contains('effects__preview--chrome')) {
    fullPictureImg.style.filter = `grayscale(${effectLevelValueElement.value})`;
  } else if (fullPictureImg.classList.contains('effects__preview--sepia')) {
    fullPictureImg.style.filter = `sepia(${effectLevelValueElement.value})`;
  } else if (fullPictureImg.classList.contains('effects__preview--marvin')) {
    fullPictureImg.style.filter = `invert(${effectLevelValueElement.value}%)`;
  } else if (fullPictureImg.classList.contains('effects__preview--phobos')) {
    fullPictureImg.style.filter = `blur(${effectLevelValueElement.value}px)`;
  } else if (fullPictureImg.classList.contains('effects__preview--heat')) {
    fullPictureImg.style.filter = `brightness(${effectLevelValueElement.value})`;
  } else {
    effectLevelContainer.classList.add('hidden');
    fullPictureImg.style.filter = '';
    effectLevelValueElement.value = 0;
  }
});
