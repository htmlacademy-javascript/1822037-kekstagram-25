import {openFullPictureWindow} from './openFullPictureWindow.js';

const pictureList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderPictures = (pictures) => {
  const pictureListFragment = document.createDocumentFragment();

  pictures.forEach((photo) => {
    const picture = pictureTemplate.cloneNode(true);
    picture.querySelector('.picture__img').src = photo.url;
    picture.querySelector('.picture__comments').textContent = photo.comments.length;
    picture.querySelector('.picture__likes').textContent = photo.likes;
    picture.addEventListener('click', (evt) => {
      evt.preventDefault();
      openFullPictureWindow(photo);
    });

    pictureListFragment.appendChild(picture);
  });

  pictureList.appendChild(pictureListFragment);
};

export {renderPictures};
