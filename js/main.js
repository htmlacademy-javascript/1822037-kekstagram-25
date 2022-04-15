import {renderPictures} from './renderPicture.js';
import './addNewPicture.js';
import {closeWindow} from './addNewPicture.js';
import {setImgUploadFormSubmit} from './validateNewPicture.js';
import {getData} from './api.js';

getData((pictures) => {
  renderPictures(pictures);
});

setImgUploadFormSubmit(closeWindow);

