const DESCRIPTIONS =  [
  'Не подходи ко мне, я обиделась.',
  'I will survive или утро, после вечеринки.',
  'Show must go on. Я требую продолжения банкета.',
  'Добби свободен. Не верю, что 5 лет академии позади.',
  'Первый день в спортзале. Сдаюсь тренеру: «Ломай меня полностью»',
  'Обещаю, с понедельника на диете.',
  'Нет — не слипнется.',
  'Я, еще раз я, и снова я.',
  'Сотрудник года.',
  'Красивая подпись под фото.',
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Соня',
  'милое олицетворение зла',
  'Вечно молодой',
  'the_dream_of_life',
  'Gucci cat ',
  'Иван Петров',
  'Mr. Golden Fox',
];

const PHOTOS_COUNT = 25;
const COMMENTS_COUNT = 5;

// решение было взято с сайта https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

const getRandomInt = (min, max) => {
  if (min >= 0 && max >= 0 && max > min) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } else {
    throw new Error('Неправильный диапазон чисел');
  }
};

const checkСommentLength = (str, maxLength) => str.length <= maxLength;

const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];

const createPhoto = () => ({
  id: getRandomInt(1, 25),
  url: `photos/${getRandomInt(1, 6)}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInt(15, 200),
});

const createComment = () => ({
  id: getRandomInt(1, 100),
  avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
  message: getRandomArrayElement(COMMENTS),
  name: getRandomArrayElement(NAMES),
});

const createPhotos = () => Array.from({length: PHOTOS_COUNT}, createPhoto);
const createComments = () => Array.from({length: COMMENTS_COUNT}, createComment);

createPhotos();
createComments();
checkСommentLength();
