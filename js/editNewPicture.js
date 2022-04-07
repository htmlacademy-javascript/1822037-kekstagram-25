const scaleControlSmallerElement = document.querySelector('.scale__control--smaller');
const scaleControlBiggerElement = document.querySelector('.scale__control--bigger');
const scaleControlInputElement = document.querySelector('.scale__control--value');
const fullPictureImg = document.querySelector('.img-upload__preview img');
scaleControlBiggerElement.setAttribute('disabled', 'disabled')

const editScale = () => {
  let size = 1;
  const step = 0.25;
  scaleControlSmallerElement.addEventListener('click', () => {
    size = size - step;
    fullPictureImg.style  = `transform: scale(${size})`;
    scaleControlBiggerElement.removeAttribute('disabled')
    if (size === 0.25) {
      scaleControlSmallerElement.setAttribute('disabled', 'disabled')
    }
    console.log(size)
    let sizeString = size.toString();
    if (sizeString.startsWith('1')) {
      scaleControlInputElement.value = sizeString + '00%';
    } else if(sizeString.endsWith('5') && sizeString.length == 3) {
      scaleControlInputElement.value = sizeString.substring(2) + '0%';
    } else {
      scaleControlInputElement.value = sizeString.substring(2) + '%';
    }
  });

  scaleControlBiggerElement.addEventListener('click', () => {
    if (size < 1) {
      size = size + step;
      fullPictureImg.style  = `transform: scale(${size})`;
      scaleControlSmallerElement.removeAttribute('disabled')
      console.log(size)
    } else if (size === 1) {
      scaleControlBiggerElement.setAttribute('disabled', 'disabled')
    }

    let sizeString = size.toString();
    if (sizeString.startsWith('1')) {
      scaleControlInputElement.value = sizeString + '00%';
    } else if (sizeString.endsWith('5') && sizeString.length == 3) {
      scaleControlInputElement.value = sizeString.substring(2) + '0%';
    } else {
      scaleControlInputElement.value = sizeString.substring(2) + '%';
    }
  });
};

const effectsListElement = document.querySelector('.effects__list');
let oldClass = fullPictureImg.classList.add('effects__preview--none');
effectsListElement.addEventListener('change', (evt) => {
  if (evt.target.closest('.effects__radio')) {
    const newEffectClass = `effects__preview--${evt.target.value}`;
    oldClass = fullPictureImg.classList.value;
    console.log(oldClass);
    console.log(newEffectClass);
    fullPictureImg.classList.replace(oldClass, newEffectClass);
  }
});

const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');



noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 80,
  step: 1,
  connect: 'lower',
});

sliderElement.noUiSlider.on('update', () => {
  valueElement.value = sliderElement.noUiSlider.get();
});

console.log(valueElement.value);
export {editScale}
