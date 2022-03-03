// решение было взято с сайта https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

function getRandomInt(min, max) {
  if (min >= 0 && max >= 0 && max > min) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } else {
    return console.log('Неправильный диапазон чисел')
  }
}

function checkСommentLength(enteredСomment, maxLength){
  if (enteredСomment.length <= maxLength){
    return true
  } else {
    return false
  }
}

console.log(getRandomInt(5, 5))


