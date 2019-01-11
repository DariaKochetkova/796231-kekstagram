'use strict';

(function () {
  var MAX_NEW_PICTURES = 10;
  var picturesContainer = document.querySelector('.pictures');
  var similarPictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  var messageContainer = document.querySelector('main');
  var errorMessageTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');

  var bigPicture = document.querySelector('.big-picture');
  var image = document.querySelector('.big-picture__img > img');
  var likes = document.querySelector('.likes-count');
  var commentsCount = document.querySelector('.comments-count');
  var commentsList = document.querySelector('.social__comments');
  var caption = document.querySelector('.social__caption');
  var pictureCancelButton = document.querySelector('#picture-cancel');
  var imagesFilters = document.querySelector('.img-filters');
  var popularPicturesButton = document.querySelector('#filter-popular');
  var newPicturesButton = document.querySelector('#filter-new');
  var discussedPicturesButton = document.querySelector('#filter-discussed');

  var renderPicture = function (picture) {
    var pictureElement = similarPictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

    return pictureElement;
  };
  var renderPictures = function (pictures) {
    var fragment = document.createDocumentFragment();
    picturePreviews = pictures.map(function (picture) {
      var element = renderPicture(picture);
      element.addEventListener('click', function () {
        bigPicture.classList.remove('hidden');
        commentsList.innerHTML = '';
        renderBigPicture(picture);
      });
      return fragment.appendChild(element);
    });
    picturesContainer.appendChild(fragment);
  };
  var removePictures = function (pictures) {
    pictures.forEach(function (picture) {
      picture.remove();
    });
  };
  var renderBigPicture = function (picture) {
    image.src = picture.url;
    likes.textContent = picture.likes;
    commentsCount.textContent = picture.comments.length;

    var commentsFragment = document.createDocumentFragment();
    var COMMENTS_MAX = 5;
    for (var k = 0; k < COMMENTS_MAX; k++) {
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

    var commentsLoader = document.querySelector('.social__comments-loader');
    var onCommentsLoaderClick = function () {
      commentsList.innerHTML = '';
      var currentComments = k;
      COMMENTS_MAX += k;
      for (k = currentComments; k < COMMENTS_MAX; k++) {
        commentElement = document.createElement('li');
        commentElement.className = 'social__comment';
        commentAvatar = document.createElement('img');
        commentAvatar.className = 'social__picture';
        commentAvatar.src = picture.comments[k].avatar;
        commentAvatar.alt = 'Аватар комментатора фотографии';
        commentAvatar.width = '35';
        commentAvatar.height = '35';
        commentElementText = document.createElement('p');
        commentElementText.className = 'social__text';
        commentElementText.textContent = picture.comments[k].message;
        commentElement.appendChild(commentAvatar);
        commentElement.appendChild(commentElementText);
        commentsFragment.appendChild(commentElement);
      }
      commentsList.appendChild(commentsFragment);
    };
    commentsLoader.addEventListener('click', onCommentsLoaderClick);

    caption.textContent = picture.description;
    pictureCancelButton.addEventListener('click', onCloseButtonClick);
    document.addEventListener('keydown', onPictureEscPress);
  };
  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    pictureCancelButton.removeEventListener('click', onCloseButtonClick);
    document.removeEventListener('keydown', onPictureEscPress);
  };
  var changeActiveButton = function (button) {
    var currentActiveButton = document.querySelector('.img-filters__button--active');
    currentActiveButton.classList.remove('img-filters__button--active');
    button.classList.add('img-filters__button--active');
  };
  var updatePictures = function (pictures) {
    removePictures(picturePreviews);
    window.debounce(function () {
      renderPictures(pictures);
    });
  };

  var onCloseButtonClick = function () {
    closeBigPicture();
  };
  var onPictureEscPress = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      closeBigPicture();
    }
  };

  var picturePreviews;

  var onLoad = function (pictures) {

    renderPictures(pictures);

    imagesFilters.classList.remove('img-filters--inactive');

    var onPopularPicsButtonClick = function () {
      changeActiveButton(popularPicturesButton);
      updatePictures(pictures);
    };

    var onNewPicsButtonClick = function () {
      changeActiveButton(newPicturesButton);
      var newPictures = pictures.slice().sort(function () {
        return 0.5 - Math.random();
      }).slice(0, MAX_NEW_PICTURES);
      updatePictures(newPictures);
    };

    var onDiscussedPicsButtonClick = function () {
      changeActiveButton(discussedPicturesButton);
      var discussedPictures = pictures.slice().sort(function (left, right) {
        return right.comments.length - left.comments.length;
      });
      updatePictures(discussedPictures);
    };
    popularPicturesButton.addEventListener('click', onPopularPicsButtonClick);
    newPicturesButton.addEventListener('click', onNewPicsButtonClick);
    discussedPicturesButton.addEventListener('click', onDiscussedPicsButtonClick);
  };

  var onError = function (message) {
    var errorMessage = errorMessageTemplate.cloneNode(true);
    var errorButton = errorMessage.querySelector('.error__button');
    errorMessage.querySelector('.error__title').textContent = message;
    messageContainer.appendChild(errorMessage);

    window.setMessageListeners(errorMessage, errorButton);
  };
  window.backend.getPictures(onLoad, onError);
})();
