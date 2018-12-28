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
var onCloseButtonClick = function () {
  closeBigPicture();
};
var onPictureEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
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
    commentElement.innerHTML = '<img class="social__picture" src="img/avatar-' + getRandomNumber(AVATARS_MIN, AVATARS_MAX) + '.svg" alt="Аватар комментатора фотографии" width="35" height="35"></img>';
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
  })(pictures[m]);
}

var pictureCancelButton = document.querySelector('#picture-cancel');
var cancelButton = document.querySelector('#upload-cancel');

var closeBigPicture = function () {
  bigPicture.classList.add('hidden');
  pictureCancelButton.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onPictureEscPress);
};

var uploadFile = document.querySelector('#upload-file');
var editPhotoForm = document.querySelector('.img-upload__overlay');
uploadFile.addEventListener('change', function () {
  editPhotoForm.classList.remove('hidden');
  for (var l = 0; l < effectButtons.length; l++) {
    effectButtons[l].addEventListener('change', setEffect);
  }
  pin.addEventListener('mousedown', onPinMouseDown);
  effcetDecrease.addEventListener('click', onDecreasePictureClick);
  effcetIncrease.addEventListener('click', onIncreasePictureClick);
  hashtagsInput.addEventListener('change', checkHashtagInput);
  document.addEventListener('keydown', escCloseForm);
});
var pin = document.querySelector('.effect-level__pin');
var scale = document.querySelector('.effect-level__line');
var depthScale = document.querySelector('.effect-level__depth');
var rangeScale = document.querySelector('.img-upload__effect-level');
var imagePreview = document.querySelector('.img-upload__preview');
var effectButtons = document.querySelectorAll('.effects__radio');
var effectLevelValue = document.querySelector('.effect-level__value');
var DEFAULT_EFFECT = 'none';

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
var currentEffect = 'none';
var currentFilter = className + currentEffect;
var setEffectDepth = function (effectName, value) {
  imagePreview.style.filter = effect[effectName] + '(' + value + effectString[effectName] + ')';
  if (effectName === DEFAULT_EFFECT) {
    imagePreview.style.filter = DEFAULT_EFFECT;
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
var setDepthStyle = function (value) {
  return value + 'px';
};
imagePreview.classList.add(currentFilter);
var setEffect = function (evt) {
  var effectName = evt.target.value;
  currentEffect = effectName;
  if (effectName === DEFAULT_EFFECT) {
    rangeScale.classList.add('hidden');
  } else {
    rangeScale.classList.remove('hidden');
    pin.style.left = setDepthStyle(scale.offsetWidth);
    depthScale.style.width = setDepthStyle(scale.offsetWidth);
  }
  changeFilter(effectName);
  setEffectDepth(effectName, effectDepthMax[effectName]);
};

var onPinMouseDown = function (evt) {
  evt.preventDefault();

  var startPinCoord = evt.clientX;
  var onPinMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = startPinCoord - moveEvt.clientX;
    startPinCoord = moveEvt.clientX;
    var pinCoord = pin.offsetLeft - shift;
    if (pinCoord < 0) {
      pinCoord = 0;
    }
    if (pinCoord > scale.offsetWidth) {
      pinCoord = scale.offsetWidth;
    }
    pin.style.left = setDepthStyle(pinCoord);
    depthScale.style.width = setDepthStyle(pinCoord);
    var getPinPosition = function () {
      return Math.round(pin.offsetLeft / scale.offsetWidth * 100);
    };
    var pinPosition = getPinPosition();
    effectLevelValue.value = pinPosition;
    var getValue = function (max, min) {
      return getPinPosition() * (max - min) / 100 + min;
    };
    setEffectDepth(currentEffect, getValue(effectDepthMax[currentEffect], effectDepthMin[currentEffect]));
  };
  var onPinMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onPinMouseMove);
    document.removeEventListener('mouseup', onPinMouseUp);
  };

  document.addEventListener('mousemove', onPinMouseMove);
  document.addEventListener('mouseup', onPinMouseUp);
};

var inputValue = document.querySelector('.scale__control--value');
var effcetIncrease = document.querySelector('.scale__control--bigger');
var effcetDecrease = document.querySelector('.scale__control--smaller');
var PIC_SIZE_DEFAULT = 100;
var MIN_SIZE_VALUE = 25;
var MAX_SIZE_VALUE = 100;
var CLICK_STEP = 25;
var SUBTRACTION = -1;
var ADDITION = 1;
var sizeValue = PIC_SIZE_DEFAULT;
var changePicSize = function (value) {
  inputValue.value = value + '%';
  imagePreview.style.transform = 'scale(' + value / 100 + ')';
};

inputValue.value = PIC_SIZE_DEFAULT + '%';

var setPictureSize = function (sign) {
  var setSize = function () {
    var newValue = sizeValue + CLICK_STEP * sign;
    if (newValue >= MIN_SIZE_VALUE && newValue <= MAX_SIZE_VALUE) {
      changePicSize(newValue);
      sizeValue += (CLICK_STEP * sign);
    }
  };
  return setSize;
};
var onDecreasePictureClick = setPictureSize(SUBTRACTION);
var onIncreasePictureClick = setPictureSize(ADDITION);


var MAX_HASHTAGS = 5;
var MIN_HASHTAG_LENGTH = 2;
var MAX_HASHTAG_LENGTH = 20;
var hash = '#';
var hashtagsInput = document.querySelector('.text__hashtags');
var setErrorColor = function () {
  hashtagsInput.style = 'border: 3px solid red;';
};
var deleteErrorColor = function () {
  hashtagsInput.style = '';
};

var checkHashtagInput = function () {
  hashtagsInput.setCustomValidity('');
  var hashtags = hashtagsInput.value.split(' ');
  hashtagsInput.value.toLowerCase();
  var uniquehashtags = {};
  var checkHashtagsQuantity = function () {
    return hashtags.length > MAX_HASHTAGS ? 'Количество хэш-тегов не может превышать пять' : '';
  };
  var tagsQuantityError = checkHashtagsQuantity();
  var setErrorMessage = function (error) {
    setErrorColor();
    hashtagsInput.setCustomValidity(error);
  };
  if (tagsQuantityError) {
    setErrorMessage(tagsQuantityError);
  } else {
    for (var n = 0; n < hashtags.length; n++) {
      deleteErrorColor();
      if (hashtagsInput.value === '') {
        break;
      }
      var hashtagKey = hashtags[n];
      var checkHash = function (hashtag) {
        return hashtag.charAt(0) === '#' ? '' : 'Хэш-тег должен начинаться с "#"';
      };
      var checkSpaces = function () {
        var hashtagIndex = hashtags[n].lastIndexOf(hash);
        return hashtagIndex !== 0 ? 'Хэш-теги должны разделяться пробелами' : '';
      };
      var checkMinLength = function (hashtag) {
        return hashtag.length < MIN_HASHTAG_LENGTH ? 'Хэш-тег не может состоять из одной решетки' : '';
      };
      var checkMaxLength = function (hashtag) {
        return hashtag.length > MAX_HASHTAG_LENGTH ? 'Длина хэш-тега не может быть более двадцати символов' : '';
      };
      var checkRepeat = function () {
        return uniquehashtags[hashtagKey] ? 'Хэш-теги не могут повторяться' : '';
      };
      var checkHashtag = function (hashtag) {
        return checkHash(hashtag) ||
        checkSpaces() ||
        checkMinLength(hashtag) ||
        checkMaxLength(hashtag) ||
        checkRepeat();
      };
      var tagError = checkHashtag(hashtags[n]);
      uniquehashtags[hashtagKey] = true;
      if (tagError) {
        setErrorMessage(tagError);
        break;
      }
    }
  }
};

var form = document.querySelector('.img-upload__form');
var closeEditPhotoForm = function () {
  editPhotoForm.classList.add('hidden');
};
var cleanForm = function () {
  closeEditPhotoForm();
  for (var o = 0; o < effectButtons.length; o++) {
    effectButtons[o].removeEventListener('change', setEffect);
  }
  pin.removeEventListener('mousedown', onPinMouseDown);
  effcetDecrease.removeEventListener('click', onDecreasePictureClick);
  effcetIncrease.removeEventListener('click', onIncreasePictureClick);
  hashtagsInput.removeEventListener('change', checkHashtagInput);
  rangeScale.classList.add('hidden');
  changePicSize(PIC_SIZE_DEFAULT);
  sizeValue = PIC_SIZE_DEFAULT;
  imagePreview.style.filter = DEFAULT_EFFECT;
  imagePreview.classList.remove(currentFilter);
  hashtagsInput.style = 'border: none;';
};
cancelButton.addEventListener('click', cleanForm);

var escCloseForm = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    cleanForm();
    form.reset();
    document.removeEventListener('keydown', escCloseForm);
  }
};
