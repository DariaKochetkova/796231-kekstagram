'use strict';

(function () {
  var MAX_NEW_PICTURES = 10;
  var MAX_COMMENTS = 5;
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
  var commentsCount = document.querySelector('.social__comment-count');
  var commentsList = document.querySelector('.social__comments');
  var caption = document.querySelector('.social__caption');
  var pictureCancelButton = document.querySelector('#picture-cancel');
  var imagesFilters = document.querySelector('.img-filters');
  var popularPicturesButton = document.querySelector('#filter-popular');
  var newPicturesButton = document.querySelector('#filter-new');
  var discussedPicturesButton = document.querySelector('#filter-discussed');
  var commentsLoader = document.querySelector('.social__comments-loader');

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
        bigPicture.classList.add('modal-open');
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

  var createComment = function (comment) {
    var commentElement = document.createElement('li');
    commentElement.className = 'social__comment';
    var commentAvatar = document.createElement('img');
    commentAvatar.className = 'social__picture';
    commentAvatar.src = comment.avatar;
    commentAvatar.alt = 'Аватар комментатора фотографии';
    commentAvatar.width = '35';
    commentAvatar.height = '35';
    var commentElementText = document.createElement('p');
    commentElementText.className = 'social__text';
    commentElementText.textContent = comment.message;
    commentElement.appendChild(commentAvatar);
    commentElement.appendChild(commentElementText);
    return commentElement;
  };

  var renderBigPicture = function (picture) {

    image.src = picture.url;
    likes.textContent = picture.likes;
    caption.textContent = picture.description;

    var commentsFragment = document.createDocumentFragment();
    var loadedComments = 0;

    var loadComments = function (comments) {
      commentsLoader.classList.toggle('hidden', comments.length <= MAX_COMMENTS);
      loadedComments += Math.min(comments.length, MAX_COMMENTS);
      commentsCount.innerHTML = loadedComments + ' из <span class="comments-count">' + picture.comments.length + '</span> комментариев';
      comments.slice(0, MAX_COMMENTS).forEach(function (comment) {
        commentsFragment.appendChild(createComment(comment));
      });
      commentsList.appendChild(commentsFragment);
    };

    loadComments(picture.comments);

    var onCommentsLoaderClick = function () {
      loadComments(picture.comments.slice(loadedComments));
    };

    var onCloseButtonClick = function () {
      closeBigPicture();
    };
    var onPictureEscPress = function (evt) {
      if (evt.keyCode === window.utils.ESC_KEYCODE) {
        closeBigPicture();
      }
    };
    var closeBigPicture = function () {
      bigPicture.classList.add('hidden');
      pictureCancelButton.removeEventListener('click', onCloseButtonClick);
      document.removeEventListener('keydown', onPictureEscPress);
      commentsLoader.removeEventListener('click', onCommentsLoaderClick);
    };

    commentsLoader.addEventListener('click', onCommentsLoaderClick);
    pictureCancelButton.addEventListener('click', onCloseButtonClick);
    document.addEventListener('keydown', onPictureEscPress);
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
