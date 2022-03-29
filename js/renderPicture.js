import {createPhotos} from './data.js';

const pictureList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const randomPicture = createPhotos();

const pictureListFragment = document.createDocumentFragment();

randomPicture.forEach((photo) => {
  const picture = pictureTemplate.cloneNode(true);
  picture.querySelector('.picture__img').src = photo.url;
  picture.querySelector('.picture__comments').textContent = photo.comments;
  picture.querySelector('.picture__likes').textContent = photo.likes;
  pictureListFragment.appendChild(picture);
});

pictureList.appendChild(pictureListFragment);
