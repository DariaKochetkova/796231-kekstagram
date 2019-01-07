'use strict';

(function () {
  var picturesContainer = document.querySelector('.pictures');
  var similarPictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  var renderPicture = function (picture) {
    var pictureElement = similarPictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

    return pictureElement;
  };

  var bigPicture = document.querySelector('.big-picture');
  var image = document.querySelector('.big-picture__img > img');
  var likes = document.querySelector('.likes-count');
  var commentsCount = document.querySelector('.comments-count');
  var commentsList = document.querySelector('.social__comments');
  var caption = document.querySelector('.social__caption');
  var onLoad = function (pictures) {
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < pictures.length; j++) {
      fragment.appendChild(renderPicture(pictures[j]));
    }
    picturesContainer.appendChild(fragment);

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
        var commentAvatar = document.createElement('img');
        commentAvatar.className = 'social__picture';
        commentAvatar.src = picture.comments[k].avatar;
        commentAvatar.alt = 'Аватар комментатора фотографии';
        commentAvatar.width = '35';
        commentAvatar.height = '35';
        var commentElementText = document.createElement('p');
        commentElementText.className = 'social__text';
        commentElementText.textContent = picture.comments[k].message;
        commentElement.appendChild(commentAvatar);
        commentElement.appendChild(commentElementText);
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
  window.backend.getPictures(onLoad);
})();
