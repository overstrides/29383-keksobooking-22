// calculation definition from https://javascript.ru/Math.random
function getRandomInt(min, max) {
  let positiveNumbers = min >= 0 && max >= 0;
  let validMax = max > min;

  if (!positiveNumbers) {
    return;
  }

  if (!validMax) {
    return min;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloat(min, max, digits = 0) {
  let positiveNumbers = min >= 0 && max >= 0 && digits >= 0;
  let validMax = max > min;

  if (!positiveNumbers) {
    return;
  }

  if (!validMax) {
    return min.toFixed(digits);
  }

  return (Math.random() * (max - min) + min).toFixed(digits);
}
