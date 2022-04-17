import { isEscapeKey } from './util.js';
import './edit-new-picture.js';
import './validate-new-picture.js';
import { resetForm } from './validate-new-picture.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const bodyElement = document.body;
const imgUploadOverlayElement = document.querySelector('.img-upload__overlay');
const imgUploadInputElement = document.querySelector('.img-upload__input');
const imgUploadButtonCancelElement = document.querySelector('.img-upload__cancel');
const previewPictureImgElement = document.querySelector('.img-upload__preview img');

const closeWindow = () => {
  imgUploadOverlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
  resetForm();
};

const openWindow = () => {
  imgUploadOverlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
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
    previewPictureImgElement.src = URL.createObjectURL(file);
    imgUploadButtonCancelElement.addEventListener('click', closeWindow);
    openWindow();
  }
});

export { openWindow, closeWindow };
