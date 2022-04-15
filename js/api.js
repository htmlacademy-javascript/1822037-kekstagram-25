import {showAlert} from './util.js';

const getData = (onSuccess) => {
  fetch('https://25.javascript.pages.academy/kekstagram/data')
  .then((response) => {
    if (response.ok) {
      return (response);
    } else {
      showAlert('Не удалось загрузить фотографии')
    }
  })
  .then((response) => response.json())
    .then((pictures) => {
      onSuccess(pictures);
    })
    .catch(() => {
      showAlert('Не удалось загрузить фотографии');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://25.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
  .then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      onFail();
    }
  })
  .catch(() => {
    onFail();
  });
};

export {getData, sendData};
