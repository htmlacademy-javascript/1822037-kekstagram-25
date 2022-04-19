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
const imgUploadScaleContainerElement = document.querySelector('.img-upload__scale');
const previewPictureImgElement = document.querySelector('.img-upload__preview img');
const effectsListElement = document.querySelector('.effects__list');
const effectLevelContainerElement = document.querySelector('.img-upload__effect-level');
const effectLevelSliderElement = document.querySelector('.effect-level__slider');
const effectLevelValueElement = document.querySelector('.effect-level__value');

scaleControlBiggerElement.disabled = true;
const onFullPictureImgResize = (evt) => {
  if (evt.target.closest('.scale__control--smaller')) {
    size = size - step;
    previewPictureImgElement.style.transform = `scale(${size})`;
    scaleControlBiggerElement.disabled = false;
    if (size === 0.25) {
      scaleControlSmallerElement.disabled = true;
    }
  } else if (evt.target.closest('.scale__control--bigger')) {
    if (size < 1) {
      size = size + step;
      previewPictureImgElement.style = `transform: scale(${size})`;
      scaleControlSmallerElement.disabled = false;
    } else if (size === 1) {
      scaleControlBiggerElement.disabled = true;
    }
  }
  scaleControlInputElement.value = `${(size * 100)}%`;
};

const resetSize = () => {
  size = 1;
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

imgUploadScaleContainerElement.addEventListener('click', onFullPictureImgResize);

effectsListElement.addEventListener('change', (evt) => {
  if (evt.target.closest('.effects__radio')) {
    previewPictureImgElement.classList.value = `effects__preview--${evt.target.value}`;
  }
});

effectsListElement.addEventListener('change', (evt) => {
  effectLevelContainerElement.classList.remove('hidden');
  if (evt.target.closest('.effects__radio')) {
    effectLevelSliderElement.noUiSlider.updateOptions(effectNames[evt.target.value].options);
  }
});

effectLevelSliderElement.noUiSlider.on('update', () => {
  effectLevelValueElement.value = effectLevelSliderElement.noUiSlider.get();
  if (previewPictureImgElement.classList.contains('effects__preview--chrome')) {
    previewPictureImgElement.style.filter = `grayscale(${effectLevelValueElement.value})`;
  } else if (previewPictureImgElement.classList.contains('effects__preview--sepia')) {
    previewPictureImgElement.style.filter = `sepia(${effectLevelValueElement.value})`;
  } else if (previewPictureImgElement.classList.contains('effects__preview--marvin')) {
    previewPictureImgElement.style.filter = `invert(${effectLevelValueElement.value}%)`;
  } else if (previewPictureImgElement.classList.contains('effects__preview--phobos')) {
    previewPictureImgElement.style.filter = `blur(${effectLevelValueElement.value}px)`;
  } else if (previewPictureImgElement.classList.contains('effects__preview--heat')) {
    previewPictureImgElement.style.filter = `brightness(${effectLevelValueElement.value})`;
  } else {
    effectLevelContainerElement.classList.add('hidden');
    previewPictureImgElement.style.filter = '';
    effectLevelValueElement.value = 0;
  }
});

export { resetSize };
