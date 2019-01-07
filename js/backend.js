'use strict';

(function () {
  var SUCCESS_CODE = 200;
  var REQUEST_TIMEOUT = 10000;
  var URL = 'https://js.dump.academy/kekstagram';
  var DATA_URL = 'https://js.dump.academy/kekstagram/data';
  var codeErrorToText = {
    '400': 'Неверный запрос',
    '401': 'Пользователь не авторизован',
    '404': 'По данному запросу ничего не найдено',
    '500': 'Внутренняя ошибка сервера. Попробуйте позже!'
  };

  var getXHR = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {

      if (xhr.status === SUCCESS_CODE) {
        onLoad(xhr.response);
      } else {
        var error =
          codeErrorToText[xhr.status] ||
          'Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText;
        onError(error);
      }
    });

    setRequestErrorsInterpreter(xhr, onError);

    return xhr;
  };

  var setRequestErrorsInterpreter = function (xhr, onError) {
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = REQUEST_TIMEOUT;
  };

  window.backend = {
    getPictures: function (onLoad, onError) {

      var xhr = getXHR(onLoad, onError);

      xhr.open('GET', DATA_URL);
      xhr.send();
    },
    sendForm: function (data, onLoad) {

      var xhr = getXHR(onLoad, onError);

      xhr.open('POST', URL);
      xhr.send(data);
    }
  };
  var messageContainer = document.querySelector('main');
  var errorMessageTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');
  var onError = function (message) {
    var errorMessage = errorMessageTemplate.cloneNode(true);
    errorMessage.querySelector('.error__title').textContent = message;
    messageContainer.appendChild(errorMessage);

    var errorButton = document.querySelector('.error__button');

    var hideMessage = function () {
      errorMessage.remove();
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

    errorButton.addEventListener('click', onMessageButtonClick);
    document.addEventListener('click', onScreenClick);
    document.addEventListener('keydown', onEscCloseMessage);
  };
})();
