import {renderPictures} from './render-picture.js';
import './add-new-picture.js';
import {closeWindow} from './add-new-picture.js';
import {setImgUploadFormSubmit} from './validate-new-picture.js';
import {getData} from './api.js';

getData((pictures) => {
  renderPictures(pictures);
});

setImgUploadFormSubmit(closeWindow);

