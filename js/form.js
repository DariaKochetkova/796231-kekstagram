'use strict';

(function () {
  var DEFAULT_EFFECT = 'none';
  var CLASS_NAME = 'effects__preview--';

  var cancelButton = document.querySelector('#upload-cancel');
  var uploadFile = document.querySelector('#upload-file');
  var editPhotoForm = document.querySelector('.img-upload__overlay');
  var effectIncrease = document.querySelector('.scale__control--bigger');
  var effectDecrease = document.querySelector('.scale__control--smaller');

  var form = document.querySelector('.img-upload__form');
  var pin = document.querySelector('.effect-level__pin');
  var scale = document.querySelector('.effect-level__line');
  var depthScale = document.querySelector('.effect-level__depth');
  var rangeScale = document.querySelector('.img-upload__effect-level');
  window.imagePreview = document.querySelector('.img-upload__preview');
  var effectButtons = document.querySelectorAll('.effects__radio');
  var effectLevelValue = document.querySelector('.effect-level__value');

  var messageContainer = document.querySelector('main');
  var successMessageTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');
  var errorMessageTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');

  var currentEffect = DEFAULT_EFFECT;
  var currentFilter = CLASS_NAME + currentEffect;
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
    window.imagePreview.classList.add(CLASS_NAME + filterName);
    currentFilter = CLASS_NAME + filterName;
  };
  var setDepthStyle = function (value) {
    pin.style.left = value + 'px';
    depthScale.style.width = value + 'px';
  };
  var setEffect = function (evt) {
    var effectName = evt.target.value;
    currentEffect = effectName;
    if (effectName === DEFAULT_EFFECT) {
      rangeScale.classList.add('hidden');
    } else {
      rangeScale.classList.remove('hidden');
      setDepthStyle(scale.offsetWidth);
      setInputValue();
    }
    changeFilter(effectName);
    setEffectDepth(effectName, window.utils.EFFECT_DEPTH_MAX[effectName]);
  };

  var getPinPosition = function () {
    return Math.round(pin.offsetLeft / scale.offsetWidth * 100);
  };
  var pinPosition = getPinPosition(); // TODO pinPosition определяется до отображения элементов
  var setInputValue = function () {
    effectLevelValue.value = pinPosition;
  };
  var getValue = function (effect) {
    var interval = (window.utils.EFFECT_DEPTH_MAX[effect] - window.utils.EFFECT_DEPTH_MIN[effect]) / 100;
    return getPinPosition() * interval + window.utils.EFFECT_DEPTH_MIN[effect];
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
      setDepthStyle(pinCoord);
      setInputValue(); // TODO нужно обновлять значение pinPosition
      setEffectDepth(currentEffect, getValue(currentEffect));
    };
    var onPinMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onPinMouseMove);
      document.removeEventListener('mouseup', onPinMouseUp);
    };

    document.addEventListener('mousemove', onPinMouseMove);
    document.addEventListener('mouseup', onPinMouseUp);
  };

  var cleanForm = function () {
    editPhotoForm.classList.add('hidden');
    for (var i = 0; i < effectButtons.length; i++) {
      effectButtons[i].removeEventListener('change', setEffect);
    }
    pin.removeEventListener('mousedown', onPinMouseDown);
    effectDecrease.removeEventListener('click', window.previewSize.onDecreasePictureClick);
    effectIncrease.removeEventListener('click', window.previewSize.onIncreasePictureClick);
    window.hashtags.field.removeEventListener('change', window.hashtags.onFieldChange);
    rangeScale.classList.add('hidden');
    window.previewSize.changePicSize(window.utils.PIC_SIZE_DEFAULT);
    window.previewSize.sizeValue = window.utils.PIC_SIZE_DEFAULT;
    window.imagePreview.style.filter = DEFAULT_EFFECT;
    window.imagePreview.classList.remove(currentFilter);
    window.hashtags.field.style.border = 'none';
  };

  var onFormEsc = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      cleanForm();
      form.reset();
      document.removeEventListener('keydown', onFormEsc);
    }
  };

  uploadFile.addEventListener('change', function () {
    editPhotoForm.classList.remove('hidden');
    for (var i = 0; i < effectButtons.length; i++) {
      effectButtons[i].addEventListener('change', setEffect);
    }
    pin.addEventListener('mousedown', onPinMouseDown);
    effectDecrease.addEventListener('click', window.previewSize.onDecreasePictureClick);
    effectIncrease.addEventListener('click', window.previewSize.onIncreasePictureClick);
    window.hashtags.field.addEventListener('change', window.hashtags.onFieldChange);
    document.addEventListener('keydown', onFormEsc);
  });

  cancelButton.addEventListener('click', cleanForm);
  form.addEventListener('submit', function (evt) {
    window.backend.sendForm(new FormData(form), function () {
      editPhotoForm.classList.add('hidden');
      cleanForm();
      form.reset();
      var successMessage = successMessageTemplate.cloneNode(true);
      var successButton = successMessage.querySelector('.success__button');
      messageContainer.appendChild(successMessage);
      window.setMessageListeners(successMessage, successButton);
    }, function (message) { // TODO модалка ошибки висит под формой
      var errorMessage = errorMessageTemplate.cloneNode(true);
      var errorButton = errorMessage.querySelector('.error__button');
      errorMessage.querySelector('.error__title').textContent = message;
      messageContainer.appendChild(errorMessage);
      window.setMessageListeners(errorMessage, errorButton);
    });
    evt.preventDefault();
  });
})();
