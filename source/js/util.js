// calculation definition from https://javascript.ru/Math.random

function getRandomFloat(min, max, digits = 0) {
  let positiveNumbers = min >= 0 && max >= 0 && digits >= 0;
  let maxIsMoreThanMin = max > min;

  if (!positiveNumbers || !maxIsMoreThanMin) {
    return 0;
  }

  return +(Math.random() * (max - min) + min).toFixed(digits);
}

function getRandomInt(min, max) {
  return getRandomFloat(min, max, 0);
}

function compareNumbers(a, b) {
  return a - b;
}

export { getRandomFloat, getRandomInt, compareNumbers };
