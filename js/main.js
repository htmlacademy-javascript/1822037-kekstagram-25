import './data.js';
import {renderPictures} from './renderPicture.js';
import {createPhotos} from './data.js';
import {createComments} from './data.js';
import {checkСommentLength} from './util.js';

createComments();
checkСommentLength('строка', 12);

const pictures = createPhotos();
renderPictures(pictures);
