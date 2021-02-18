// calculation definition from https://javascript.ru/Math.random

function getRandomFloat(min, max, digits = 0) {
  let positiveNumbers = min >= 0 && max >= 0 && digits >= 0;
  let maxIsMoreThanMin = max > min;

  if (!positiveNumbers || !maxIsMoreThanMin) {
    return;
  }

  return +(Math.random() * (max - min) + min).toFixed(digits);
}

function getRandomInt(min, max) {
  return getRandomFloat(min, max, 0);
}

getRandomInt(0, 10);
getRandomFloat(0, 10, 6);

// Создание объектов объявлений

const TYPES_ADS = [
  'palace',
  'flat',
  'house',
  'bungalow',
];

const CHECKIN_CHECKOUT_ADS = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES_ADS = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS_ADS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

function getRandomArray(oldArray) {
  const firstNumber = getRandomInt(0, oldArray.length);
  const secondNumber = getRandomInt(0, oldArray.length);

  let minNumber = 0;
  let maxNumber = 0;

  if(firstNumber > secondNumber) {
    minNumber = secondNumber;
    maxNumber = firstNumber;
  } else if(firstNumber === secondNumber && firstNumber !== 0) {
    maxNumber = firstNumber;
  } else if(firstNumber === secondNumber && firstNumber === 0) {
    maxNumber = oldArray.length;
  } else {
    minNumber = firstNumber;
    maxNumber = secondNumber;
  }
  
  const newArray = oldArray.slice(minNumber, maxNumber);
  
  return newArray;
}

const createAds = () => {
  const ads = {
    author: {
      avatar: 'img/avatars/user0' + getRandomInt(1, 8) + '.png',
    },
    offer: {
      title: 'Заголовок объявления',
      price: getRandomInt(1, 5000),
      type: TYPES_ADS[getRandomInt(0, TYPES_ADS.length - 1)],
      rooms: getRandomInt(1, 10),
      checkin: CHECKIN_CHECKOUT_ADS[getRandomInt(0, CHECKIN_CHECKOUT_ADS.length - 1)],
      checkout: CHECKIN_CHECKOUT_ADS[getRandomInt(0, CHECKIN_CHECKOUT_ADS.length - 1)],
      features: getRandomArray(FEATURES_ADS),
      description: 'Описание помещения',
      photos: getRandomArray(PHOTOS_ADS),
    },
    location: {
      x: getRandomFloat(35.65000, 35.70000, 5),
      y: getRandomFloat(139.70000, 139.80000, 5),
    },
  };

  ads.offer.address = ads.location.x + ', ' + ads.location.y;
  ads.offer.guests = ads.offer.rooms * 2;

  return ads;
}

const similarAds = new Array(10).fill(null).map(() => createAds());

console.log(similarAds);