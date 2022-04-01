const body = document.querySelector('body');
const fullPicture = document.querySelector('.big-picture');
const fullPictureImg = fullPicture.querySelector('.big-picture__img').querySelector('img');
const fullPictureLikes = fullPicture.querySelector('.likes-count');
const fullPictureCommentsCount = fullPicture.querySelector('.comments-count');
const fullPictureDescription = fullPicture.querySelector('.social__caption');
const pictureButtonCancel = fullPicture.querySelector('#picture-cancel');
const commentsList = fullPicture.querySelector('.social__comments');
const commentsButtonLoader = fullPicture.querySelector('.social__comments-loader');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

const renderComment = (comments) => {
  const commentsListFragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const commentСopy = commentTemplate.cloneNode(true);
    commentСopy.querySelector('.social__picture').src = comment.avatar;
    commentСopy.querySelector('.social__picture').alt = comment.name;
    commentСopy.querySelector('.social__text').textContent = comment.message;
    commentsListFragment.appendChild(commentСopy);
  });

  commentsList.appendChild(commentsListFragment);
};

const addThumbnailClickHandler = (thumbnail, picture) => {
  thumbnail.addEventListener('click', function (evt) {
    evt.preventDefault();
    fullPicture.classList.remove('hidden');
    fullPictureCommentsCount.classList.add('hidden');
    commentsButtonLoader.classList.add('hidden');
    body.classList.add('modal-open');
    fullPictureImg.src = picture.url;
    fullPictureLikes.textContent = picture.likes;
    fullPictureDescription.textContent = picture.description;
    fullPictureCommentsCount.textContent = picture.comments.length;
    const fullPictureComments = picture.comments;
    renderComment(fullPictureComments);
  });
};

const showFullPicture = (thumbnails, pictures) => {
  for (let i = 0; i < thumbnails.length; i++) {
    addThumbnailClickHandler(thumbnails[i], pictures[i]);
  }
};

pictureButtonCancel.addEventListener('click', function(){
  fullPicture.classList.add('hidden');
  commentsList.innerHTML = '';
  body.classList.remove('modal-open');
});

document.addEventListener('keydown', function(evt) {
  if (evt.key === 'Escape'){
    fullPicture.classList.add('hidden');
    commentsList.innerHTML = '';
    body.classList.remove('modal-open');
  }
});

export {showFullPicture};
