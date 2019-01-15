'use strict';

(function () {
  var messageContainer = document.querySelector('main');
  var errorMessageTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');

  window.error = {
    onError: function (message) {
      var errorMessage = errorMessageTemplate.cloneNode(true);
      var errorButton = errorMessage.querySelector('.error__button');
      errorMessage.querySelector('.error__title').textContent = message;
      messageContainer.appendChild(errorMessage);

      window.setMessageListeners(errorMessage, errorButton);
    }
  };
})();
