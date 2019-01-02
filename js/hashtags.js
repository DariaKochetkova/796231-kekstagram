'use strict';

(function () {
  var MAX_HASHTAGS = 5;
  var MIN_HASHTAG_LENGTH = 2;
  var MAX_HASHTAG_LENGTH = 20;
  var hash = '#';

  var setErrorColor = function () {
    window.hashtags.hashtagsInput.style = 'border: 3px solid red;';
  };
  var deleteErrorColor = function () {
    window.hashtags.hashtagsInput.style = '';
  };
  window.hashtags = {
    hashtagsInput: document.querySelector('.text__hashtags'),
    checkHashtagInput: function () {
      window.hashtags.hashtagsInput.setCustomValidity('');
      var hashtags = window.hashtags.hashtagsInput.value.split(' ');
      window.hashtags.hashtagsInput.value.toLowerCase();
      var uniquehashtags = {};
      var checkHashtagsQuantity = function () {
        return hashtags.length > MAX_HASHTAGS ? 'Количество хэш-тегов не может превышать пять' : '';
      };
      var tagsQuantityError = checkHashtagsQuantity();
      var setErrorMessage = function (error) {
        setErrorColor();
        window.hashtags.hashtagsInput.setCustomValidity(error);
      };
      if (tagsQuantityError) {
        setErrorMessage(tagsQuantityError);
      } else {
        for (var n = 0; n < hashtags.length; n++) {
          deleteErrorColor();
          if (window.hashtags.hashtagsInput.value === '') {
            break;
          }
          var hashtagKey = hashtags[n];
          var checkHash = function (hashtag) {
            return hashtag.charAt(0) === '#' ? '' : 'Хэш-тег должен начинаться с "#"';
          };
          var checkSpaces = function () {
            var hashtagIndex = hashtags[n].lastIndexOf(hash);
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
