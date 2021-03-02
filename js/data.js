import { getRandomFloat, getRandomInt, compareNumbers } from './util.js';

const TYPES_ADS = ['palace', 'flat', 'house', 'bungalow'];

const CHECKIN_CHECKOUT_ADS = ['12:00', '13:00', '14:00'];

const QUANTITY_ADS = 10;

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

function getRandomArray(baseArray) {
  let randomArrayLength = getRandomInt(1, baseArray.length);
  let randomArrayIndexes = [];
  while (randomArrayIndexes.length < randomArrayLength) {
    let randomArrayElement = getRandomInt(0, baseArray.length - 1);
    if (randomArrayIndexes.indexOf(randomArrayElement) === -1) {
      randomArrayIndexes.push(randomArrayElement);
    }
  }
  let randomArray = [];
  randomArrayIndexes.sort(compareNumbers).forEach((index) => {
    randomArray.push(baseArray[index]);
  });
  return randomArray;
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
      checkin:
        CHECKIN_CHECKOUT_ADS[getRandomInt(0, CHECKIN_CHECKOUT_ADS.length - 1)],
      checkout:
        CHECKIN_CHECKOUT_ADS[getRandomInt(0, CHECKIN_CHECKOUT_ADS.length - 1)],
      features: getRandomArray(FEATURES_ADS),
      description: 'Описание помещения',
      photos: getRandomArray(PHOTOS_ADS),
    },
    location: {
      x: getRandomFloat(35.65, 35.7, 5),
      y: getRandomFloat(139.7, 139.8, 5),
    },
  };

  ads.offer.address = ads.location.x + ', ' + ads.location.y;
  ads.offer.guests = ads.offer.rooms * 2;

  return ads;
};

const createArrayAds = () => {
  const similarAds = new Array(QUANTITY_ADS).fill(null).map(() => createAds());
  return similarAds;
};

export { createArrayAds };
