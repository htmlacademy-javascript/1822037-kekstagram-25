import {isEscapeKey, checkСommentLength} from './util.js';

const body = document.body;
const imgUploadOverlayElement = document.querySelector('.img-upload__overlay');
const imgUploadInputElement = document.querySelector('.img-upload__input');
const imgUploadButtonCancelElement = document.querySelector('#upload-cancel');
const imgUploadForm = document.querySelector('.img-upload__form');

const closeWindow = () => {
  imgUploadOverlayElement.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
};

const openWindow = () => {
  imgUploadOverlayElement.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
};

function onPopupEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeWindow();
  }
}

imgUploadInputElement.addEventListener('change', () => {
  if (imgUploadInputElement.value){
    openWindow();
    imgUploadButtonCancelElement.addEventListener('click', () => {
      closeWindow();
    });
  }
});

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__text',
  errorClass: 'img-upload__text--invalid',
  successClass: 'img-upload__text--valid',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'div',
  errorTextClass: 'form__error'
});

const errorMessage = 'не более 5-ти хэш-тегов<br>максимальная длина хэш-тега 20 символов<br>хэш-теги не должны повторятся<br>хэш-тег должен содержать только буквы и цифры<br>хэш-тег должен начинатся с символа #';
const rex = /^#[a-zа-яё0-9]{1,20}$/i;

const validateHashtags = (value) => {
  const hashtags = value.trim().toLowerCase().split(/\s+/);
  if(hashtags.length <= 5) {
    for (let i = 0; i <= hashtags.length-1; i++) {
      if (!rex.test(hashtags[i]) || hashtags.slice(i+1).includes(hashtags[i])) {
        return false;
      }
    }
    return true;
  }
  return false;
};

pristine.addValidator(imgUploadForm.querySelector('.text__hashtags'), validateHashtags, errorMessage);

const validateComments = (value) => checkСommentLength(value, 140);

pristine.addValidator(imgUploadForm.querySelector('.text__description'), validateComments, 'длина комментария не более 140 символов');

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
