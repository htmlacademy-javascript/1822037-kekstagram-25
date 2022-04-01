import './data.js';
import {renderPictures} from './renderPicture.js';
import {createPhotos} from './data.js';
import {checkСommentLength} from './util.js';
import {showFullPicture} from './showFullPicture.js';

checkСommentLength('строка', 12);
const pictures = createPhotos();
renderPictures(pictures);
const thumbnails = document.querySelectorAll('.picture');
showFullPicture(thumbnails, pictures);

