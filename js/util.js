const ALERT_SHOW_TIME = 10000;

const getRandomInt = (min, max) => {
  if (min >= 0 && max >= 0 && max > min) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } else {
    throw new Error('Неправильный диапазон чисел');
  }
};

const checkСommentLength = (str, maxLength) => str.length <= maxLength;

const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  alertContainer.style.color = '#ffe753';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

export {getRandomArrayElement, getRandomInt, checkСommentLength, isEscapeKey, showAlert};
