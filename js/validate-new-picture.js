import { checkCommentLength, isEscapeKey } from './util.js';
import { sendData } from './api.js';
import { resetSize } from './edit-new-picture.js';

const maxCommentLength = 140;
const imgUploadFormElement = document.querySelector('.img-upload__form');
const previewPictureImgElement = document.querySelector('.img-upload__preview img');
const effectLevelContainerElement = imgUploadFormElement.querySelector('.img-upload__effect-level');
const scaleControlSmallerElement = document.querySelector('.scale__control--smaller');
const messageSuccessTemplateElement = document.querySelector('#success').content.querySelector('.success');
const messageSuccessElement = messageSuccessTemplateElement.cloneNode(true);
const messageSuccessButtonElement = messageSuccessElement.querySelector('.success__button');
const messageErrorTemplateElement = document.querySelector('#error').content.querySelector('.error');
const messageErrorElement = messageErrorTemplateElement.cloneNode(true);
const messageErrorButtonElement = messageErrorElement.querySelector('.error__button');
const imgUploadButtonSubmitElement = imgUploadFormElement.querySelector('.img-upload__submit');
document.body.appendChild(messageSuccessElement);
document.body.appendChild(messageErrorElement);
messageSuccessElement.classList.add('hidden');
messageErrorElement.classList.add('hidden');

const pristine = new Pristine(imgUploadFormElement, {
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
  }
};

pristine.addValidator(imgUploadFormElement.querySelector('.text__hashtags'), validateHashtagsQuantity, 'не более 5-ти хэш-тегов');

const validateHashtagsLength = (value) => {
  const hashtags = value.trim().toLowerCase().split(/\s+/);
  for (const hashtag of hashtags) {
    if (hashtag.length >= 20) {
      return false;
    }
  }
  return true;
};

pristine.addValidator(imgUploadFormElement.querySelector('.text__hashtags'), validateHashtagsLength, 'максимальная длина хэш-тега 20 символов');

const validateHashtagsDuplicate = (value) => {
  const hashtags = value.trim().toLowerCase().split(/\s+/);
  for (let i = 0; i <= hashtags.length - 1; i++) {
    if (hashtags.slice(i + 1).includes(hashtags[i])) {
      return false;
    }
  }
  return true;
};

pristine.addValidator(imgUploadFormElement.querySelector('.text__hashtags'), validateHashtagsDuplicate, 'хэш-теги не должны повторятся');

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

pristine.addValidator(imgUploadFormElement.querySelector('.text__hashtags'), validateHashtagsSymbols, 'хэш-тег должен начинатся с символа # и содержать только буквы и цифры');

const validateComments = (value) => checkCommentLength(value, maxCommentLength);

pristine.addValidator(imgUploadFormElement.querySelector('.text__description'), validateComments, 'длина комментария не более 140 символов');

const onMessageSuccessEscKeydown = (evt) => {
  onPopupEscKeydown(evt, messageSuccessElement);
};

const onMessageErrorEscKeydown = (evt) => {
  onPopupEscKeydown(evt, messageErrorElement);
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
  messageSuccessElement.classList.remove('hidden');

  messageSuccessButtonElement.addEventListener('click', () => {
    closeWindow(messageSuccessElement);
  });

  messageSuccessElement.addEventListener('click', (evt) => {
    if (!evt.target.closest('.success__inner')) {
      closeWindow(messageSuccessElement);
    }
  });

  document.addEventListener('keydown', onMessageSuccessEscKeydown);
};

const showMessageError = () => {
  messageErrorElement.classList.remove('hidden');

  messageErrorButtonElement.addEventListener('click', () => {
    closeWindow(messageErrorElement);
  });

  messageErrorElement.addEventListener('click', (evt) => {
    if (!evt.target.closest('.error__inner')) {
      closeWindow(messageErrorElement);
    }
  });

  document.addEventListener('keydown', onMessageErrorEscKeydown);
};

const resetForm = () => {
  previewPictureImgElement.style.filter = '';
  previewPictureImgElement.classList.value = 'effects__preview--none';
  previewPictureImgElement.style.transform = 'scale(1)';
  scaleControlSmallerElement.disabled = false;
  effectLevelContainerElement.classList.add('hidden');
  imgUploadFormElement.reset();
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
  imgUploadFormElement.addEventListener('submit', (evt) => {
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
