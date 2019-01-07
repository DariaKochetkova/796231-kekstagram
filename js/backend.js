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

      var xhr = getXHR(onLoad);

      xhr.open('POST', URL);
      xhr.send(data);
    }
  };
})();
