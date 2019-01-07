'use strict';

(function () {
  window.getMessage = function (message, button) {
    var hideMessage = function () {
      message.remove();
    };
    var removeListeners = function () {
      hideMessage();
      document.removeEventListener('keydown', onEscCloseMessage);
      document.removeEventListener('click', onScreenClick);
    };
    var onMessageButtonClick = function () {
      removeListeners();
    };
    var onEscCloseMessage = function (evt) {
      if (evt.keyCode === window.utils.ESC_KEYCODE) {
        hideMessage();
        document.removeEventListener('keydown', onEscCloseMessage);
      }
    };
    var onScreenClick = function () {
      removeListeners();
    };
    button.addEventListener('click', onMessageButtonClick);
    document.addEventListener('click', onScreenClick);
    document.addEventListener('keydown', onEscCloseMessage);
  };
})();
