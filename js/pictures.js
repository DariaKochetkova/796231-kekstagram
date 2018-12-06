'use strict';

var pictures = [];
var descriptions = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];
var comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var OBJECTS_QUANTITY = 25;
var COMMENTS_MAX = 10;
var COMMENTS_MIN = 5;
var LIKES_MAX = 200;
var LIKES_MIN = 15;
var AVATARS_MAX = 6;
var AVATARS_MIN = 1;
var ESC_KEYCODE = 27;
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
var getRandomElement = function (arr) {
  return arr[getRandomNumber(0, arr.length - 1)];
};
var getRandomComment = function () {
  var commentsQuantity = getRandomNumber(COMMENTS_MIN, COMMENTS_MAX);
  var currentComments = [];
  for (var i = 0; i < commentsQuantity; i++) {
    var randomComment = getRandomElement(comments);
    currentComments[i] = randomComment;
  }
  return currentComments;
};

for (var i = 0; i < OBJECTS_QUANTITY; i++) {
  pictures[i] = {
    url: 'photos/' + (i + 1) + '.jpg',
    likes: getRandomNumber(LIKES_MIN, LIKES_MAX),
    comments: getRandomComment(),
    description: getRandomElement(descriptions)
  };
}

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

var renderBigPicture = function (photo) {
  image.src = photo.url;
  likes.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;

  var commentsFragment = document.createDocumentFragment();
  for (var k = 0; k < photo.comments.length; k++) {
    var commentElement = document.createElement('li');
    commentElement.className = 'social__comment';
    commentElement.innerHTML = '<img class="social__picture" src="img/avatar-' + getRandomNumber(AVATARS_MIN, AVATARS_MAX) + '.svg" alt="Аватар комментатора фотографии" width="35" height="35"></img>';
    commentElement.innerHTML += '<p class="social__text">' + photo.comments[k] + '</p>';
    commentsFragment.appendChild(commentElement);
  }

  commentsList.appendChild(commentsFragment);

  caption.textContent = photo.description;
};

var commentCount = document.querySelector('.social__comment-count');
commentCount.classList.add('visually-hidden');
var commentsLoader = document.querySelector('.comments-loader');
commentsLoader.classList.add('visually-hidden');

var uploadFile = document.querySelector('#upload-file');
var editPhotoForm = document.querySelector('.img-upload__overlay');
uploadFile.addEventListener('change', function () {
  editPhotoForm.classList.remove('hidden');
});

var picturePreview = document.querySelectorAll('.picture');
for (var m = 0; m < picturePreview.length; m++) {
  (function (pic) {
    picturePreview[m].addEventListener('click', function () {
      bigPicture.classList.remove('hidden');
      commentsList.innerHTML = '';
      renderBigPicture(pic);
    });
  })(pictures[m]);
}

var pictureCancelButton = document.querySelector('#picture-cancel');
var cancelButton = document.querySelector('#upload-cancel');

var closeBigPicture = function () {
  bigPicture.classList.add('hidden');
};

var closeEditPhotoForm = function () {
  editPhotoForm.classList.add('hidden');
};

pictureCancelButton.addEventListener('click', function () {
  closeBigPicture();
});
pictureCancelButton.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeBigPicture();
  }
});

cancelButton.addEventListener('click', function () {
  closeEditPhotoForm();
});
cancelButton.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeEditPhotoForm();
  }
});

var pin = document.querySelector('.effect-level__pin');
var scale = document.querySelector('.effect-level__line');
var rangeScale = document.querySelector('.img-upload__effect-level');
var imagePreview = document.querySelector('.img-upload__preview');
var effectButtons = document.querySelectorAll('.effects__radio');

var effect = {
  chrome: 'grayscale',
  sepia: 'sepia',
  marvin: 'invert',
  phobos: 'blur',
  heat: 'brightness'
};
var effectDepthMax = {
  chrome: 1,
  sepia: 1,
  marvin: 100,
  phobos: 3,
  heat: 3
};

var effectDepthMin = {
  chrome: 0,
  sepia: 0,
  marvin: 0,
  phobos: 0,
  heat: 1
};

var effectString = {
  chrome: '',
  sepia: '',
  marvin: '%',
  phobos: 'px',
  heat: ''
};

var className = 'effects__preview--';
var currentEffect = 'heat';
var currentFilter = className + currentEffect;
var setEffectDepth = function (effectName, value) {
  imagePreview.style.filter = effect[effectName] + '(' + value + effectString[effectName] + ')';
  if (effectName === 'none') {
    imagePreview.style.filter = 'none';
  }
};

var changeFilter = function (filterName) {
  if (currentFilter) {
    imagePreview.classList.remove(currentFilter);
  }
  imagePreview.classList.add(className + filterName);
  currentFilter = className + filterName;

  return currentFilter;
};

imagePreview.classList.add(currentFilter);
for (var l = 0; l < effectButtons.length; l++) {
  effectButtons[l].addEventListener('change', function (evt) {
    var effectName = evt.target.value;
    currentEffect = effectName;
    if (effectName === 'none') {
      rangeScale.classList.add('hidden');
    } else {
      rangeScale.classList.remove('hidden');
    }
    changeFilter(effectName);
    setEffectDepth(effectName, effectDepthMax[effectName]);
  });
}

pin.addEventListener('mouseup', function () {
  var getPinPosition = function () {
    return (pin.offsetLeft / scale.offsetWidth * 100);
  };
  var getValue = function (max, min) {
    return getPinPosition() * (max - min) / 100 + min;
  };
  setEffectDepth(currentEffect, getValue(effectDepthMax[currentEffect], effectDepthMin[currentEffect]));
});

var valueInput = document.querySelector('.scale__control--value');
var effcetIncrease = document.querySelector('.scale__control--bigger');
var effcetDecrease = document.querySelector('.scale__control--smaller');
var PIC_SIZE_DEFAULT = 100;
var clickStep = 25;
var picSize = PIC_SIZE_DEFAULT;
var setPicSize = function () {
  imagePreview.style = 'transform: scale(' + picSize / 100 + ')';
};

valueInput.value = PIC_SIZE_DEFAULT + '%';

effcetDecrease.addEventListener('click', function () {
  if (picSize > 25) {
    picSize -= clickStep;
    valueInput.value = picSize + '%';
    setPicSize();
  }
});

effcetIncrease.addEventListener('click', function () {
  if (picSize < 100) {
    picSize += clickStep;
    valueInput.value = picSize + '%';
    setPicSize();
  }
});
