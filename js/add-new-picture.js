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
const imgUploadHashtagsInputElement = document.querySelector('.text__hashtags');
const imgUploadDescriptionInputElement = document.querySelector('.text__description');

const onInputStopEscapeKey = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    evt.stopPropagation();
  }
};

const onWindowClose = () => {
  imgUploadOverlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
  imgUploadHashtagsInputElement.removeEventListener('keydown', onInputStopEscapeKey);
  imgUploadDescriptionInputElement.removeEventListener('keydown', onInputStopEscapeKey);
  resetForm();
};

const onWindowOpen = () => {
  imgUploadOverlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
  imgUploadHashtagsInputElement.addEventListener('keydown', onInputStopEscapeKey);
  imgUploadDescriptionInputElement.addEventListener('keydown', onInputStopEscapeKey);
};

function onPopupEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onWindowClose();
  }
}

imgUploadInputElement.addEventListener('change', () => {
  const file = imgUploadInputElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    previewPictureImgElement.src = URL.createObjectURL(file);
    imgUploadButtonCancelElement.addEventListener('click', onWindowClose);
    onWindowOpen();
  }
});

export { onWindowClose };
