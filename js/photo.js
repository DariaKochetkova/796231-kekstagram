'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var getPic = function (onSuccess, onError) {
    var file = window.form.uploadFile.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {

      var reader = new FileReader();

      reader.addEventListener('load', function () {
        onSuccess(reader.result);
      });

      reader.onerror = function () {
        reader.abort();
        onError('Ошибка чтения файла!');
      };

    } else {
      onError('Неверный формат файла!');
    }

    reader.readAsDataURL(file);
  };
  window.photo = {
    uploadPic: function (onSuccess, onError) {
      getPic(onSuccess, onError);
    }
  };
})();
