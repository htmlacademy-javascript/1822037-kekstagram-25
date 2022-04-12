import {isEscapeKey} from './util.js';
import './editNewPicture.js';
import './validateNewPicture.js';

const body = document.body;
const imgUploadOverlayElement = document.querySelector('.img-upload__overlay');
const imgUploadInputElement = document.querySelector('.img-upload__input');
const imgUploadButtonCancelElement = document.querySelector('#upload-cancel');

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
  openWindow();
  if (imgUploadInputElement.value){
    imgUploadButtonCancelElement.addEventListener('click', closeWindow);
  }
});
