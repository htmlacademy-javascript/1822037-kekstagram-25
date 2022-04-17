import {isEscapeKey} from './util.js';

const bodyElement = document.body;
const fullPictureContainerElement = document.querySelector('.big-picture');
const fullPictureImgElement = fullPictureContainerElement.querySelector('.big-picture__img img');
const fullPictureLikesCountElement = fullPictureContainerElement.querySelector('.likes-count');
const fullPictureCommentsCountElement = fullPictureContainerElement.querySelector('.comments-count');
const fullPictureDescriptionElement = fullPictureContainerElement.querySelector('.social__caption');
const pictureButtonCancelElement = fullPictureContainerElement.querySelector('.big-picture__cancel');
const commentsListElement = fullPictureContainerElement.querySelector('.social__comments');
const commentsButtonLoaderElement = fullPictureContainerElement.querySelector('.social__comments-loader');
const commentTemplateElement = document.querySelector('#comment').content.querySelector('.social__comment');

const closeWindow = () => {
  fullPictureContainerElement.classList.add('hidden');
  commentsListElement.innerHTML = '';
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
};

const openWindow = () => {
  fullPictureContainerElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
};

function onPopupEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeWindow();
  }
}

const renderComments = (comments) => {
  const commentsListFragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const commentCopy = commentTemplateElement.cloneNode(true);
    commentCopy.querySelector('.social__picture').src = comment.avatar;
    commentCopy.querySelector('.social__picture').alt = comment.name;
    commentCopy.querySelector('.social__text').textContent = comment.message;
    commentsListFragment.appendChild(commentCopy);
  });

  commentsListElement.appendChild(commentsListFragment);
};

const openFullPictureWindow = (picture) => {
  commentsButtonLoaderElement.classList.add('hidden');
  fullPictureImgElement.src = picture.url;
  fullPictureLikesCountElement.textContent = picture.likes;
  fullPictureDescriptionElement.textContent = picture.description;
  fullPictureCommentsCountElement.textContent = picture.comments.length;
  renderComments(picture.comments);
  openWindow();
};

pictureButtonCancelElement.addEventListener('click', () => {
  closeWindow();
});

export {openFullPictureWindow};
