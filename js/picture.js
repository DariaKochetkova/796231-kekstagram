'use strict';

(function () {

  var OBJECTS_QUANTITY = 25;

  var picturesContainer = document.querySelector('.pictures');
  var similarPictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  var onLoad = function (pictures) {
    var renderPicture = function (picture) {
      var pictureElement = similarPictureTemplate.cloneNode(true);
      pictureElement.querySelector('.picture__img').src = picture.url;
      pictureElement.querySelector('.picture__likes').textContent = picture.likes;
      pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

      return pictureElement;
    };
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < OBJECTS_QUANTITY; j++) {
      fragment.appendChild(renderPicture(pictures[j]));
    }
    picturesContainer.appendChild(fragment);

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
      if (evt.keyCode === window.utils.ESC_KEYCODE) {
        closeBigPicture();
      }
    };

    var renderBigPicture = function (picture) {
      image.src = picture.url;
      likes.textContent = picture.likes;
      commentsCount.textContent = picture.comments.length;

      var commentsFragment = document.createDocumentFragment();
      for (var k = 0; k < picture.comments.length; k++) {
        var commentElement = document.createElement('li');
        commentElement.className = 'social__comment';
        commentElement.innerHTML = '<img class="social__picture" src=' + picture.comments[k].avatar + ' alt="Аватар комментатора фотографии" width="35" height="35"></img>';
        commentElement.innerHTML += '<p class="social__text">' + picture.comments[k].message + '</p>';
        commentsFragment.appendChild(commentElement);
      }

      commentsList.appendChild(commentsFragment);

      caption.textContent = picture.description;
      pictureCancelButton.addEventListener('click', onCloseButtonClick);
      document.addEventListener('keydown', onPictureEscPress);
    };

    var picturePreview = document.querySelectorAll('.picture');
    for (var m = 0; m < picturePreview.length; m++) {
      (function (picture) {
        picturePreview[m].addEventListener('click', function () {
          bigPicture.classList.remove('hidden');
          commentsList.innerHTML = '';
          renderBigPicture(picture);
        });
      })(pictures[m]);
    }

    var pictureCancelButton = document.querySelector('#picture-cancel');

    var closeBigPicture = function () {
      bigPicture.classList.add('hidden');
      pictureCancelButton.removeEventListener('click', onCloseButtonClick);
      document.removeEventListener('keydown', onPictureEscPress);
    };
  };
  window.load(onLoad);
})();
