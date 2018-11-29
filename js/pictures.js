'use strict';

var pictures = [];
var descriptions = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];
var comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var commentsMax = 10;
var commentsMin = 5;
var likesMax = 200;
var likesMin = 15;
var getRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};
var getRandomComment = function () {
  var commentsQuantity = Math.floor(Math.random() * (commentsMax - commentsMin + 1)) + commentsMin;
  var currentComments = [];
  for (var i = 0; i < commentsQuantity; i++) {
    var randomComment = getRandomElement(comments);
    currentComments[i] = randomComment;
  }
  return currentComments;
};

for (var i = 0; i < 25; i++) {
  pictures[i] = {
    url: 'photos/' + (i + 1) + '.jpg',
    likes: Math.floor(Math.random() * (likesMax - likesMin + 1)) + likesMin,
    comments: getRandomComment(),
    description: getRandomElement(descriptions)
  };
}

var picturesContainer = document.querySelector('.pictures');
var similarPictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

var renderPicture = function (picture) {
  var pictureElement = similarPictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

  return pictureElement;
};

var fragment = document.createDocumentFragment();
for (var j = 0; j < 25; j++) {
  fragment.appendChild(renderPicture(pictures[j]));
}
picturesContainer.appendChild(fragment);

var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');

var image = document.querySelector('.big-picture__img > img');
image.src = pictures[1].url;
var likes = document.querySelector('.likes-count');
likes.textContent = pictures[1].likes;
var commentsCount = document.querySelector('.comments-count');
commentsCount.textContent = pictures[1].comments.length;

var commentsFragment = document.createDocumentFragment();
var commentsList = document.querySelector('.social__comments');

for (var y = 0; y < pictures[1].comments.length; y++) {
  var commentElement = document.createElement('li');
  commentElement.className = 'social__comment';
  commentElement.innerHTML = '<img class="social__picture" src="img/avatar-' + (Math.floor(Math.random() * 6) + 1) + '.svg" alt="Аватар комментатора фотографии" width="35" height="35"></img>';
  commentElement.innerHTML += '<p class="social__text">' + pictures[1].comments[y] + '</p>';
  commentsFragment.appendChild(commentElement);
}

commentsList.appendChild(commentsFragment);

var caption = document.querySelector('.social__caption');
caption.textContent = pictures[1].description;

var commentCount = document.querySelector('.social__comment-count');
commentCount.classList.add('visually-hidden');
var commentsLoader = document.querySelector('.comments-loader');
commentsLoader.classList.add('visually-hidden');
