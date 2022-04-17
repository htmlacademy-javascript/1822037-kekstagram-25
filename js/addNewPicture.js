import {isEscapeKey} from './util.js';
import './editNewPicture.js';
import './validateNewPicture.js';
import {resetForm} from './validateNewPicture.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const body = document.body;
const imgUploadOverlayElement = document.querySelector('.img-upload__overlay');
const imgUploadInputElement = document.querySelector('.img-upload__input');
const imgUploadButtonCancelElement = document.querySelector('#upload-cancel');
const previewPictureImg = document.querySelector('.img-upload__preview img');

const closeWindow = () => {
  imgUploadOverlayElement.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
  resetForm();
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
  const file = imgUploadInputElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    previewPictureImg.src = URL.createObjectURL(file);
    imgUploadButtonCancelElement.addEventListener('click', closeWindow);
    openWindow();
  }
});

export {openWindow, closeWindow};
