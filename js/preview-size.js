'use strict';

(function () {
  var inputValue = document.querySelector('.scale__control--value');
  var MIN_SIZE_VALUE = 25;
  var MAX_SIZE_VALUE = 100;
  var CLICK_STEP = 25;
  var SUBTRACTION = -1;
  var ADDITION = 1;
  var setPictureSize = function (sign) {
    var setSize = function () {
      var newValue = window.previewSize.sizeValue + CLICK_STEP * sign;
      if (newValue >= MIN_SIZE_VALUE && newValue <= MAX_SIZE_VALUE) {
        window.previewSize.changePicSize(newValue);
        window.previewSize.sizeValue += (CLICK_STEP * sign);
      }
    };
    return setSize;
  };
  window.previewSize = {
    onDecreasePictureClick: setPictureSize(SUBTRACTION),
    onIncreasePictureClick: setPictureSize(ADDITION),
    sizeValue: window.utils.PIC_SIZE_DEFAULT,
    changePicSize: function (value) {
      inputValue.value = value + '%';
      window.imagePreview.style.transform = 'scale(' + value / 100 + ')';
    }
  };
  inputValue.value = window.utils.PIC_SIZE_DEFAULT + '%';
})();
