'use strict';

(function () {
  var cancelButton = document.querySelector('#upload-cancel');
  var uploadFile = document.querySelector('#upload-file');
  var editPhotoForm = document.querySelector('.img-upload__overlay');
  uploadFile.addEventListener('change', function () {
    editPhotoForm.classList.remove('hidden');
    for (var l = 0; l < effectButtons.length; l++) {
      effectButtons[l].addEventListener('change', setEffect);
    }
    pin.addEventListener('mousedown', onPinMouseDown);
    effectDecrease.addEventListener('click', window.previewSize.onDecreasePictureClick);
    effectIncrease.addEventListener('click', window.previewSize.onIncreasePictureClick);
    window.hashtags.hashtagsInput.addEventListener('change', window.hashtags.checkHashtagInput);
    document.addEventListener('keydown', escCloseForm);
  });
  var pin = document.querySelector('.effect-level__pin');
  var scale = document.querySelector('.effect-level__line');
  var depthScale = document.querySelector('.effect-level__depth');
  var rangeScale = document.querySelector('.img-upload__effect-level');
  window.imagePreview = document.querySelector('.img-upload__preview');
  var effectButtons = document.querySelectorAll('.effects__radio');
  var effectLevelValue = document.querySelector('.effect-level__value');
  var DEFAULT_EFFECT = 'none';

  var className = 'effects__preview--';
  var currentEffect = 'none';
  var currentFilter = className + currentEffect;
  var setEffectDepth = function (effectName, value) {
    window.imagePreview.style.filter = window.utils.EFFECT[effectName] + '(' + value + window.utils.EFFECT_STRING[effectName] + ')';
    if (effectName === DEFAULT_EFFECT) {
      window.imagePreview.style.filter = DEFAULT_EFFECT;
    }
  };

  var changeFilter = function (filterName) {
    if (currentFilter) {
      window.imagePreview.classList.remove(currentFilter);
    }
    window.imagePreview.classList.add(className + filterName);
    currentFilter = className + filterName;

    return currentFilter;
  };
  var setDepthStyle = function (value) {
    return value + 'px';
  };
  window.imagePreview.classList.add(currentFilter);
  var setEffect = function (evt) {
    var effectName = evt.target.value;
    currentEffect = effectName;
    if (effectName === DEFAULT_EFFECT) {
      rangeScale.classList.add('hidden');
    } else {
      rangeScale.classList.remove('hidden');
      pin.style.left = setDepthStyle(scale.offsetWidth);
      depthScale.style.width = setDepthStyle(scale.offsetWidth);
      setInputValue();
    }
    changeFilter(effectName);
    setEffectDepth(effectName, window.utils.EFFECT_DEPTH_MAX[effectName]);
  };

  var getPinPosition = function () {
    return Math.round(pin.offsetLeft / scale.offsetWidth * 100);
  };
  var pinPosition = getPinPosition();
  var setInputValue = function () {
    effectLevelValue.value = pinPosition;
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
      setInputValue();
      var getValue = function (max, min) {
        return getPinPosition() * (max - min) / 100 + min;
      };
      setEffectDepth(currentEffect, getValue(window.utils.EFFECT_DEPTH_MAX[currentEffect], window.utils.EFFECT_DEPTH_MIN[currentEffect]));
    };
    var onPinMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onPinMouseMove);
      document.removeEventListener('mouseup', onPinMouseUp);
    };

    document.addEventListener('mousemove', onPinMouseMove);
    document.addEventListener('mouseup', onPinMouseUp);
  };

  var effectIncrease = document.querySelector('.scale__control--bigger');
  var effectDecrease = document.querySelector('.scale__control--smaller');

  var form = document.querySelector('.img-upload__form');

  form.addEventListener('submit', function (evt) {
    window.backend.sendForm(new FormData(form), function () {
      editPhotoForm.classList.add('hidden');
      cleanForm();
      form.reset();
      var messageContainer = document.querySelector('main');
      var successMessageTemplate = document.querySelector('#success')
        .content
        .querySelector('.success');
      var successMessage = successMessageTemplate.cloneNode(true);
      messageContainer.appendChild(successMessage);
      var successButton = document.querySelector('.success__button');
      window.setMessageListeners(successMessage, successButton);
    }, function (message) {
      var messageContainer = document.querySelector('main');
      var errorMessageTemplate = document.querySelector('#error')
          .content
          .querySelector('.error');
      var errorMessage = errorMessageTemplate.cloneNode(true);
      errorMessage.querySelector('.error__title').textContent = message;
      messageContainer.appendChild(errorMessage);

      var errorButton = document.querySelector('.error__button');

      window.setMessageListeners(errorMessage, errorButton);
    });
    evt.preventDefault();
  });

  var closeEditPhotoForm = function () {
    editPhotoForm.classList.add('hidden');
  };
  var cleanForm = function () {
    closeEditPhotoForm();
    for (var o = 0; o < effectButtons.length; o++) {
      effectButtons[o].removeEventListener('change', setEffect);
    }
    pin.removeEventListener('mousedown', onPinMouseDown);
    effectDecrease.removeEventListener('click', window.previewSize.onDecreasePictureClick);
    effectIncrease.removeEventListener('click', window.previewSize.onIncreasePictureClick);
    window.hashtags.hashtagsInput.removeEventListener('change', window.hashtags.checkHashtagInput);
    rangeScale.classList.add('hidden');
    window.previewSize.changePicSize(window.utils.PIC_SIZE_DEFAULT);
    window.previewSize.sizeValue = window.utils.PIC_SIZE_DEFAULT;
    window.imagePreview.style.filter = DEFAULT_EFFECT;
    window.imagePreview.classList.remove(currentFilter);
    window.hashtags.hashtagsInput.style = 'border: none;';
  };
  cancelButton.addEventListener('click', cleanForm);

  var escCloseForm = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      cleanForm();
      form.reset();
      document.removeEventListener('keydown', escCloseForm);
    }
  };
})();
