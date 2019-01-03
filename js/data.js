'use strict';

(function () {
  var descriptions = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];
  var comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var COMMENTS_MAX = 10;
  var COMMENTS_MIN = 5;
  var LIKES_MAX = 200;
  var LIKES_MIN = 15;
  window.data = {
    OBJECTS_QUANTITY: 25,
    pictures: [],
    getRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  };
  var getRandomElement = function (arr) {
    return arr[window.data.getRandomNumber(0, arr.length - 1)];
  };
  var getRandomComment = function () {
    var commentsQuantity = window.data.getRandomNumber(COMMENTS_MIN, COMMENTS_MAX);
    var currentComments = [];
    for (var i = 0; i < commentsQuantity; i++) {
      var randomComment = getRandomElement(comments);
      currentComments[i] = randomComment;
    }
    return currentComments;
  };

  for (var i = 0; i < window.data.OBJECTS_QUANTITY; i++) {
    window.data.pictures[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: window.data.getRandomNumber(LIKES_MIN, LIKES_MAX),
      comments: getRandomComment(),
      description: getRandomElement(descriptions)
    };
  }
})();
