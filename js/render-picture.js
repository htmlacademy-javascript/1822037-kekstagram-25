import {openFullPictureWindow} from './open-full-picture-window.js';

const pictureListElement = document.querySelector('.pictures');
const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');

const renderPictures = (pictures) => {
  const pictureListFragment = document.createDocumentFragment();

  pictures.forEach((photo) => {
    const picture = pictureTemplateElement.cloneNode(true);
    picture.querySelector('.picture__img').src = photo.url;
    picture.querySelector('.picture__comments').textContent = photo.comments.length;
    picture.querySelector('.picture__likes').textContent = photo.likes;
    picture.addEventListener('click', (evt) => {
      evt.preventDefault();
      openFullPictureWindow(photo);
    });

    pictureListFragment.appendChild(picture);
  });

  pictureListElement.appendChild(pictureListFragment);
};

export {renderPictures};
