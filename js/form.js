const formElement = document.querySelector('.ad-form');
const housingTypeElement = formElement.querySelector('#type');
const priceElement = formElement.querySelector('#price');
const checkinElement = formElement.querySelector('#timein');
const checkoutElement = formElement.querySelector('#timeout');
const addressFormElement = document.querySelector('#address');

const MIN_PRICE = 0;
const MAX_PRICE = 1000000;
const FLAT_PRICE = 1000;
const HOUSE_PRICE = 5000;
const PALACE_PRICE = 10000;
const HOUSING_TYPE = {
  FLAT: 'flat',
  BUNGALOW: 'bungalow',
  HOUSE: 'house',
  PALACE: 'palace',
};
const coordinatesTokio = {
  x: '35.65283',
  y: '139.83947',
};

checkinElement.addEventListener('change', (evt) => {
  checkoutElement.value = evt.target.value;
});

checkoutElement.addEventListener('change', (evt) => {
  checkinElement.value = evt.target.value;
});

housingTypeElement.addEventListener('change', (evt) => {
  const housingTypeValue = evt.target.value;
  if (priceElement.value === '') {
    if (housingTypeValue === HOUSING_TYPE.FLAT) {
      priceElement.placeholder = FLAT_PRICE;
      priceElement.min = FLAT_PRICE;
    } else if (housingTypeValue === HOUSING_TYPE.BUNGALOW) {
      priceElement.placeholder = MIN_PRICE;
      priceElement.min = MIN_PRICE;
    } else if (housingTypeValue === HOUSING_TYPE.HOUSE) {
      priceElement.placeholder = HOUSE_PRICE;
      priceElement.min = HOUSE_PRICE;
    } else if (housingTypeValue === HOUSING_TYPE.PALACE) {
      priceElement.placeholder = PALACE_PRICE;
      priceElement.min = PALACE_PRICE;
    }
  } else if (priceElement.value !== '') {
    if (housingTypeValue === HOUSING_TYPE.FLAT && priceElement.value < FLAT_PRICE) {
      priceElement.placeholder = FLAT_PRICE;
      priceElement.min = FLAT_PRICE;
      housingTypeElement.setCustomValidity('При выборе "Тип жилья: Квартира" цена за ночь должна быть больше 1000');
    } else if (housingTypeValue === HOUSING_TYPE.HOUSE && priceElement.value < HOUSE_PRICE) {
      priceElement.placeholder = HOUSE_PRICE;
      priceElement.min = HOUSE_PRICE;
      housingTypeElement.setCustomValidity('При выборе "Тип жилья: Дом" цена за ночь должна быть больше 5000');
    } else if (housingTypeValue === HOUSING_TYPE.PALACE && priceElement.value < PALACE_PRICE) {
      priceElement.placeholder = PALACE_PRICE;
      priceElement.min = PALACE_PRICE;
      housingTypeElement.setCustomValidity('При выборе "Тип жилья: Дворец" цена за ночь должна быть больше 10 000');
    } else if (housingTypeValue === HOUSING_TYPE.BUNGALOW) {
      priceElement.placeholder = MIN_PRICE;
      priceElement.min = MIN_PRICE;
    } else {
      housingTypeElement.setCustomValidity('');
    }
  }
  housingTypeElement.reportValidity();
});

priceElement.addEventListener('input', (evt) => {
  const priceValue = evt.target.value;
  if (priceValue < MIN_PRICE) {
    priceElement.setCustomValidity('Цена за ночь должна быть больше 0.');
  } else if (priceValue > MAX_PRICE) {
    priceElement.setCustomValidity('Цена за ночь не должна быть больше 1 000 000.');
  } else if (housingTypeElement.value === HOUSING_TYPE.FLAT && priceValue < FLAT_PRICE) {
    priceElement.setCustomValidity('При выборе "Тип жилья: Квартира" цена за ночь должна быть больше 1000');
  } else if (housingTypeElement.value === HOUSING_TYPE.HOUSE && priceValue < HOUSE_PRICE) {
    priceElement.setCustomValidity('При выборе "Тип жилья: Дом" цена за ночь должна быть больше 5000');
  } else if (housingTypeElement.value === HOUSING_TYPE.PALACE && priceValue < PALACE_PRICE) {
    priceElement.setCustomValidity('При выборе "Тип жилья: Дворец" цена за ночь должна быть больше 10 000');
  } else {
    priceElement.setCustomValidity('');
  }

  priceElement.reportValidity();
});

const setDefaultPriceAttributes = () => {
  const housingTypeValue = housingTypeElement.value;
  switch (housingTypeValue) {
    case HOUSING_TYPE.FLAT:
      priceElement.placeholder = FLAT_PRICE;
      priceElement.min = FLAT_PRICE;
      break;
    case HOUSING_TYPE.BUNGALOW:
      priceElement.placeholder = MIN_PRICE;
      priceElement.min = MIN_PRICE;
      break;
    case HOUSING_TYPE.HOUSE:
      priceElement.placeholder = HOUSE_PRICE;
      priceElement.min = HOUSE_PRICE;
      break;
    case HOUSING_TYPE.PALACE:
      priceElement.placeholder = PALACE_PRICE;
      priceElement.min = PALACE_PRICE;
      break;
    default:
      priceElement.placeholder = FLAT_PRICE;
      priceElement.min = FLAT_PRICE;
      break;
  }
};

const setDefaultFieldValue = () => {
  addressFormElement.value = coordinatesTokio.x + ', ' + coordinatesTokio.y;
};

export { setDefaultPriceAttributes, setDefaultFieldValue, addressFormElement };
