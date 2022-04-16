import { checkСommentLength, isEscapeKey } from './util.js';
import { sendData } from './api.js';
import { resetSize } from './editNewPicture.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const previewPictureImg = document.querySelector('.img-upload__preview img');
const effectLevelContainer = imgUploadForm.querySelector('.img-upload__effect-level');
const scaleControlSmallerElement = document.querySelector('.scale__control--smaller');
const messageSuccessTemplate = document.querySelector('#success').content.querySelector('.success');
const messageSuccess = messageSuccessTemplate.cloneNode(true);
const messageSuccessButtonElement = messageSuccess.querySelector('.success__button');
const messageErrorTemplate = document.querySelector('#error').content.querySelector('.error');
const messageError = messageErrorTemplate.cloneNode(true);
const messageErrorButtonElement = messageError.querySelector('.error__button');
const imgUploadButtonSubmitElement = imgUploadForm.querySelector('.img-upload__submit');
document.body.appendChild(messageSuccess);
document.body.appendChild(messageError);
messageSuccess.classList.add('hidden');
messageError.classList.add('hidden');

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__text',
  errorClass: 'img-upload__text--invalid',
  successClass: 'img-upload__text--valid',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'div',
  errorTextClass: 'form__error'
});

const validateHashtagsQuantity = (value) => {
  const hashtags = value.trim().toLowerCase().split(/\s+/);
  if (hashtags.length <= 5) {
    return true;
  } else {
    return false;
  }
};

pristine.addValidator(imgUploadForm.querySelector('.text__hashtags'), validateHashtagsQuantity, 'не более 5-ти хэш-тегов');

const validateHashtagsLength = (value) => {
  const hashtags = value.trim().toLowerCase().split(/\s+/);
  for (const hashtag of hashtags) {
    if (hashtag.length >= 20) {
      return false;
    }
  }
  return true;
};

pristine.addValidator(imgUploadForm.querySelector('.text__hashtags'), validateHashtagsLength, 'максимальная длина хэш-тега 20 символов');

const validateHashtagsDuplicate = (value) => {
  const hashtags = value.trim().toLowerCase().split(/\s+/);
  for (let i = 0; i <= hashtags.length - 1; i++) {
    if (hashtags.slice(i + 1).includes(hashtags[i])) {
      return false;
    }
  }
  return true;
};

pristine.addValidator(imgUploadForm.querySelector('.text__hashtags'), validateHashtagsDuplicate, 'хэш-теги не должны повторятся');

const rex = /^#[a-zа-яё0-9]/i;

const validateHashtagsSymbols = (value) => {
  const value1 = value.trim().toLowerCase();
  if (value1) {
    const hashtags = value1.split(/\s+/);
    for (const hashtag of hashtags) {
      if (!rex.test(hashtag)) {
        return false;
      }
    }
  }
  return true;
};

pristine.addValidator(imgUploadForm.querySelector('.text__hashtags'), validateHashtagsSymbols, 'хэш-тег должен начинатся с символа # и содержать только буквы и цифры');

const validateComments = (value) => checkСommentLength(value, 140);

pristine.addValidator(imgUploadForm.querySelector('.text__description'), validateComments, 'длина комментария не более 140 символов');

const onMessageSuccessEscKeydown = (evt) => {
  onPopupEscKeydown(evt, messageSuccess);
};

const onMessageErrorEscKeydown = (evt) => {
  onPopupEscKeydown(evt, messageError);
};

const closeWindow = (window) => {
  window.classList.add('hidden');
  document.removeEventListener('keydown', onMessageSuccessEscKeydown);
  document.removeEventListener('keydown', onMessageErrorEscKeydown);
};

function onPopupEscKeydown(evt, window) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeWindow(window);
  }
}


const showMessageSuccess = () => {
  messageSuccess.classList.remove('hidden');

  messageSuccessButtonElement.addEventListener('click', () => {
    closeWindow(messageSuccess);
  });

  messageSuccess.addEventListener('click', (evt) => {
    if (!evt.target.closest('.success__inner')) {
      closeWindow(messageSuccess);
    }
  });

  document.addEventListener('keydown', onMessageSuccessEscKeydown);
};

const showMessageError = () => {
  messageError.classList.remove('hidden');

  messageErrorButtonElement.addEventListener('click', () => {
    closeWindow(messageError);
  });

  messageError.addEventListener('click', (evt) => {
    if (!evt.target.closest('.error__inner')) {
      closeWindow(messageError);
    }
  });

  document.addEventListener('keydown', onMessageErrorEscKeydown);
};

const resetForm = () => {
  previewPictureImg.style.filter = '';
  previewPictureImg.classList.value = 'effects__preview--none';
  previewPictureImg.style.transform = 'scale(1)';
  scaleControlSmallerElement.disabled = false;
  effectLevelContainer.classList.add('hidden');
  imgUploadForm.reset();
  resetSize();
};

const blockSubmitButton = () => {
  imgUploadButtonSubmitElement.disabled = true;
  imgUploadButtonSubmitElement.textContent = 'Публикуем...';
};

const unblockSubmitButton = () => {
  imgUploadButtonSubmitElement.disabled = false;
  imgUploadButtonSubmitElement.textContent = 'Опубликовать';
};

const setImgUploadFormSubmit = (onSuccess) => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          showMessageSuccess();
          unblockSubmitButton();
        },
        () => {
          showMessageError();
          unblockSubmitButton();
        },
        new FormData(evt.target)
      );
    }
  });
};

export { setImgUploadFormSubmit, resetForm };
