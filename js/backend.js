'use strict';

(function () {
  window.load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;

    xhr.open('GET', 'https://js.dump.academy/kekstagram/data');
    xhr.send();
  };
  var messageContainer = document.querySelector('main');
  var onError = function (message) {
    var errorMessageTemplate = document.querySelector('#error')
      .content
      .querySelector('.success');

    var errorMessage = errorMessageTemplate.cloneNode(true);
    errorMessage.querySelector('.error__title').textContent = message;
    messageContainer.appendChild(errorMessage);

    var errorButton = document.querySelector('.error__button');

    var hideMessage = function () {
      errorMessage.classList.add('visually-hidden');
    };
    var onMessageButtonClick = function () {
      hideMessage();
    };
    var onEscCloseMessage = function (evt) {
      if (evt.keyCode === window.utils.ESC_KEYCODE) {
        hideMessage();
        document.removeEventListener('keydown', onEscCloseMessage);
      }
    };

    errorButton.addEventListener('click', onMessageButtonClick);
    document.addEventListener('click', onMessageButtonClick);
    document.addEventListener('keydown', onEscCloseMessage);
  };

  var URL = 'https://js.dump.academy/kekstagram';

  window.backend = function (data, onLoad) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);

        var successMessageTemplate = document.querySelector('#success')
          .content
          .querySelector('.success');

        var successMessage = successMessageTemplate.cloneNode(true);
        messageContainer.appendChild(successMessage);

        var successButton = document.querySelector('.success__button');

        var hideMessage = function () {
          successMessage.classList.add('visually-hidden');
        };
        var onMessageButtonClick = function () {
          hideMessage();
        };
        var onEscCloseMessage = function (evt) {
          if (evt.keyCode === window.utils.ESC_KEYCODE) {
            hideMessage();
            document.removeEventListener('keydown', onEscCloseMessage);
          }
        };

        successButton.addEventListener('click', onMessageButtonClick);
        document.addEventListener('click', onMessageButtonClick);
        document.addEventListener('keydown', onEscCloseMessage);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;

    xhr.open('POST', URL);
    xhr.send(data);
  };
})();
