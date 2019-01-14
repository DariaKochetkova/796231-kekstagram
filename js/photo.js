'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  window.form.uploadFile.addEventListener('change', function (onError) {
    var file = window.form.uploadFile.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {

      var reader = new FileReader();

      reader.addEventListener('load', function () {
        window.form.uploadImage.src = reader.result;
      });

      reader.readAsDataURL(file);

      reader.onerror = function () {
        reader.abort();
        onError('Ошибка чтения файла!');
      };

    } else {
      onError('Неверный формат файла!');
    }
  });
})();
