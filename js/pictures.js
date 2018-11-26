'use strict';

var pictures = [];
var description = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];
var getRandomComment = function () {
  var comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var commentsQuantity = Math.floor(Math.random() * 6);
  var currentComments = [];
  for (var i = 0; i < commentsQuantity; i++) {
    var randomComment = comments[Math.floor(Math.random() * comments.length)];
    currentComments[i] = randomComment;
  }
  return currentComments;
};

for (var i = 0; i < 25; i++) {
  pictures[i] = {
    url: 'photos/' + (i + 1) + '.jpg',
    likes: Math.floor(Math.random() * 186) + 15,
    comments: getRandomComment(),
    description: description[Math.floor(Math.random() * 6)]
  };
}

var picturesContainer = document.querySelector('.pictures');
var similarPictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

var renderPictures = function () {
  var pictureElement = similarPictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = pictures[i].url;
  pictureElement.querySelector('.picture__likes').textContent = pictures[i].likes;
  pictureElement.querySelector('.picture__comments').textContent = pictures[i].comments.length;

  return pictureElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < 25; i++) {
  fragment.appendChild(renderPictures(pictures[i]));
}
picturesContainer.appendChild(fragment);

var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');

var image = document.querySelector('.big-picture__img');
image.src = pictures[1].url;
var likes = document.querySelector('.likes-count');
likes.textContent = pictures[1].likes;
var comments = document.querySelector('.comments-count');
comments.textContent = pictures[1].comments.length;

var avatars = [];
for (var i = 0; i < 6; i++) {
  avatars[i] = {
    url: 'img/avatar-' + Math.floor(Math.random() * 6) + '.svg'
  };
}

var socialPicture = document.querySelector('.social__picture');
socialPicture.src = avatars[i].url;
var socialText = document.querySelector('.social__text');
socialText.textContent = pictures[i].comments;

var caption = document.querySelector('.social__caption');
caption.textContent = pictures[i].description;

var commentCount = document.querySelector('.social__comment-count');
commentCount.classList.add('.visually-hidden');
var commentsLoader = document.querySelector('.comments-loader');
commentsLoader.classList.add('.visually-hidden');
