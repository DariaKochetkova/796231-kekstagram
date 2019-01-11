'use strict';

(function () {
  var MAX_HASHTAGS = 5;
  var MIN_HASHTAG_LENGTH = 2;
  var MAX_HASHTAG_LENGTH = 20;
  var HASH_SYMBOL = '#';

  var setErrorColor = function () {
    window.hashtags.field.style = 'border: 3px solid red;';
  };
  var deleteErrorColor = function () {
    window.hashtags.field.style = '';
  };
  window.hashtags = {
    field: document.querySelector('.text__hashtags'),
    onFieldChange: function () {
      window.hashtags.field.setCustomValidity('');
      var hashtags = window.hashtags.field.value.split(' ');
      window.hashtags.field.value.toLowerCase();
      var uniquehashtags = {};
      var checkHashtagsQuantity = function () {
        return hashtags.length > MAX_HASHTAGS ? 'Количество хэш-тегов не может превышать пять' : '';
      };
      var tagsQuantityError = checkHashtagsQuantity();
      var setErrorMessage = function (error) {
        setErrorColor();
        window.hashtags.field.setCustomValidity(error);
      };
      if (tagsQuantityError) {
        setErrorMessage(tagsQuantityError);
      } else {
        for (var n = 0; n < hashtags.length; n++) {
          deleteErrorColor();
          if (window.hashtags.field.value === '') {
            break;
          }
          var hashtagKey = hashtags[n];
          var checkHash = function (hashtag) {
            return hashtag.charAt(0) === HASH_SYMBOL ? '' : 'Хэш-тег должен начинаться с "#"';
          };
          var checkSpaces = function () {
            var hashtagIndex = hashtags[n].lastIndexOf(HASH_SYMBOL);
            return hashtagIndex !== 0 ? 'Хэш-теги должны разделяться пробелами' : '';
          };
          var checkMinLength = function (hashtag) {
            return hashtag.length < MIN_HASHTAG_LENGTH ? 'Хэш-тег не может состоять из одной решетки' : '';
          };
          var checkMaxLength = function (hashtag) {
            return hashtag.length > MAX_HASHTAG_LENGTH ? 'Длина хэш-тега не может быть более двадцати символов' : '';
          };
          var checkRepeat = function () {
            return uniquehashtags[hashtagKey] ? 'Хэш-теги не могут повторяться' : '';
          };
          var checkHashtag = function (hashtag) {
            return checkHash(hashtag) ||
            checkSpaces() ||
            checkMinLength(hashtag) ||
            checkMaxLength(hashtag) ||
            checkRepeat();
          };
          var tagError = checkHashtag(hashtags[n]);
          uniquehashtags[hashtagKey] = true;
          if (tagError) {
            setErrorMessage(tagError);
            break;
          }
        }
      }
    }
  };
})();
