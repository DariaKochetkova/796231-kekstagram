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

  var fragment = document.createDocumentFragment();
  for (var j = 0; j < window.data.OBJECTS_QUANTITY; j++) {
    fragment.appendChild(renderPicture(window.data.pictures[j]));
  }
  picturesContainer.appendChild(fragment);
})();
