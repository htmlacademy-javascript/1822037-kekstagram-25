let size = 1;
const step = 0.25;
const effectNames = {
  none: {
    options: {

    }
  },
  chrome: {
    filterName: 'grayscale',
    unit: '',
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
      connect: 'lower',
    },
  },
  sepia: {
    filterName: 'sepia',
    unit: '',
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
      connect: 'lower',
    },
  },
  marvin: {
    filterName: 'invert',
    unit: '',
    options: {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
      connect: 'lower',
    },
  },
  phobos: {
    filterName: 'blur',
    unit: '',
    options: {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
      connect: 'lower',
    },
  },

  heat: {
    filterName: 'brightness',
    unit: '',
    options: {
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
      connect: 'lower',
    },
  },
};
const scaleControlSmallerElement = document.querySelector('.scale__control--smaller');
const scaleControlBiggerElement = document.querySelector('.scale__control--bigger');
const scaleControlInputElement = document.querySelector('.scale__control--value');
const imgUploadScaleContainer = document.querySelector('.img-upload__scale');
const fullPictureImg = document.querySelector('.img-upload__preview img');
const effectsListElement = document.querySelector('.effects__list');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');
const effectLevelSliderElement = document.querySelector('.effect-level__slider');
const effectLevelValueElement = document.querySelector('.effect-level__value');

scaleControlBiggerElement.setAttribute('disabled', 'disabled');
const onfullPictureImgResize = (evt) => {
  if (evt.target.closest('.scale__control--smaller')) {
    size = size - step;
    fullPictureImg.style.transform = `scale(${size})`;
    scaleControlBiggerElement.removeAttribute('disabled');
    if (size === 0.25) {
      scaleControlSmallerElement.setAttribute('disabled', 'disabled');
    }
  } else if (evt.target.closest('.scale__control--bigger')) {
    if (size < 1) {
      size = size + step;
      fullPictureImg.style  = `transform: scale(${size})`;
      scaleControlSmallerElement.removeAttribute('disabled');
    } else if (size === 1) {
      scaleControlBiggerElement.setAttribute('disabled', 'disabled');
    }
  }
  scaleControlInputElement.value = `${(size * 100)}%`;
};

noUiSlider.create(effectLevelSliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

imgUploadScaleContainer.addEventListener('click', onfullPictureImgResize);

effectsListElement.addEventListener('change', (evt) => {
  if (evt.target.closest('.effects__radio')) {
    fullPictureImg.classList.value = `effects__preview--${evt.target.value}`;
  }
});

effectsListElement.addEventListener('change', (evt) => {
  effectLevelContainer.classList.remove('hidden');
  if (evt.target.closest('.effects__radio')) {
    effectLevelSliderElement.noUiSlider.updateOptions(effectNames[evt.target.value].options);
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
