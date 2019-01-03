'use strict';

(function () {
  var AVATARS_MAX = 6;
  var AVATARS_MIN = 1;
  var bigPicture = document.querySelector('.big-picture');
  var image = document.querySelector('.big-picture__img > img');
  var likes = document.querySelector('.likes-count');
  var commentsCount = document.querySelector('.comments-count');
  var commentsList = document.querySelector('.social__comments');
  var caption = document.querySelector('.social__caption');
  var onCloseButtonClick = function () {
    closeBigPicture();
  };
  var onPictureEscPress = function (evt) {
    if (evt.keyCode === window.data.ESC_KEYCODE) {
      closeBigPicture();
    }
  };

  var renderBigPicture = function (photo) {
    image.src = photo.url;
    likes.textContent = photo.likes;
    commentsCount.textContent = photo.comments.length;

    var commentsFragment = document.createDocumentFragment();
    for (var k = 0; k < photo.comments.length; k++) {
      var commentElement = document.createElement('li');
      commentElement.className = 'social__comment';
      commentElement.innerHTML = '<img class="social__picture" src="img/avatar-' + window.data.getRandomNumber(AVATARS_MIN, AVATARS_MAX) + '.svg" alt="Аватар комментатора фотографии" width="35" height="35"></img>';
      commentElement.innerHTML += '<p class="social__text">' + photo.comments[k] + '</p>';
      commentsFragment.appendChild(commentElement);
    }

    commentsList.appendChild(commentsFragment);

    caption.textContent = photo.description;
    pictureCancelButton.addEventListener('click', onCloseButtonClick);
    document.addEventListener('keydown', onPictureEscPress);
  };

  var commentCount = document.querySelector('.social__comment-count');
  commentCount.classList.add('visually-hidden');
  var commentsLoader = document.querySelector('.comments-loader');
  commentsLoader.classList.add('visually-hidden');

  var picturePreview = document.querySelectorAll('.picture');
  for (var m = 0; m < picturePreview.length; m++) {
    (function (pic) {
      picturePreview[m].addEventListener('click', function () {
        bigPicture.classList.remove('hidden');
        commentsList.innerHTML = '';
        renderBigPicture(pic);
      });
    })(window.data.pictures[m]);
  }

  var pictureCancelButton = document.querySelector('#picture-cancel');

  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    pictureCancelButton.removeEventListener('click', onCloseButtonClick);
    document.removeEventListener('keydown', onPictureEscPress);
  };
})();
