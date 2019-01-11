'use strict';

(function () {
  window.setMessageListeners = function (message, button) {

    var removeListeners = function () {
      document.removeEventListener('keydown', onEscCloseMessage);
      document.removeEventListener('click', onScreenClick);
    };
    var onMessageButtonClick = function () {
      message.remove();
      removeListeners();
    };
    var onEscCloseMessage = function (evt) {
      if (evt.keyCode === window.utils.ESC_KEYCODE) {
        message.remove();
        removeListeners();
      }
    };
    var onScreenClick = function () {
      message.remove();
      removeListeners();
    };
    button.addEventListener('click', onMessageButtonClick);
    document.addEventListener('click', onScreenClick);
    document.addEventListener('keydown', onEscCloseMessage);
  };
})();
