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

export {getRandomArrayElement};
export {getRandomInt};

checkСommentLength();
