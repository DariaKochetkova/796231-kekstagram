'use strict';

(function () {
  var MAX_HASHTAGS = 5;
  var MIN_HASHTAG_LENGTH = 2;
  var MAX_HASHTAG_LENGTH = 20;
  var HASH_SYMBOL = '#';

  var setErrorColor = function () {
    window.hashtags.field.style.border = '3px solid red';
  };
  var deleteErrorColor = function () {
    window.hashtags.field.style.border = 'none';
  };
  var setErrorMessage = function (error) {
    setErrorColor();
    window.hashtags.field.setCustomValidity(error);
  };
  window.hashtags = {
    field: document.querySelector('.text__hashtags'),
    onFieldChange: function () {
      window.hashtags.field.setCustomValidity('');
      deleteErrorColor();
      var hashtags = window.hashtags.field.value.trim().toLowerCase().split(/\s+/);
      var uniqueHashtags = {};
      var checkHashtagsQuantity = function () {
        return hashtags.length > MAX_HASHTAGS ? 'Количество хэш-тегов не может превышать пять' : '';
      };
      var checkHash = function (hashtag) {
        return hashtag.charAt(0) === HASH_SYMBOL ? '' : 'Хэш-тег должен начинаться с "#"';
      };
      var checkSpaces = function (hashtag) {
        var hashtagIndex = hashtag.lastIndexOf(HASH_SYMBOL);
        return hashtagIndex !== 0 ? 'Хэш-теги должны разделяться пробелами' : '';
      };
      var checkMinLength = function (hashtag) {
        return hashtag.length < MIN_HASHTAG_LENGTH ? 'Хэш-тег не может состоять из одной решетки' : '';
      };
      var checkMaxLength = function (hashtag) {
        return hashtag.length > MAX_HASHTAG_LENGTH ? 'Длина хэш-тега не может быть более двадцати символов' : '';
      };
      var checkRepeat = function (hashtag) {
        return uniqueHashtags[hashtag] ? 'Хэш-теги не могут повторяться' : '';
      };
      var checkHashtag = function (hashtag) {
        return checkHash(hashtag) ||
          checkSpaces(hashtag) ||
          checkMinLength(hashtag) ||
          checkMaxLength(hashtag) ||
          checkRepeat(hashtag);
      };
      var tagsQuantityError = checkHashtagsQuantity();

      if (tagsQuantityError) {
        setErrorMessage(tagsQuantityError);
      } else {
        for (var n = 0; n < hashtags.length; n++) {
          var hashtagKey = hashtags[n];
          if (hashtagKey === '') {
            break;
          }
          var tagError = checkHashtag(hashtagKey);
          uniqueHashtags[hashtagKey] = true;
          if (tagError) {
            setErrorMessage(tagError);
            break;
          }
        }
      }
    }
  };
})();
