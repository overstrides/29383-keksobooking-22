import { showErrorStyles, hideErrorStyles, showErrorNotification, showSuccessNotification } from './notifications.js';
import { sendData } from './api.js';

const formElement = document.querySelector('.ad-form');
const housingTypeElement = formElement.querySelector('#type');
const priceElement = formElement.querySelector('#price');
const checkinElement = formElement.querySelector('#timein');
const checkoutElement = formElement.querySelector('#timeout');
const addressElement = formElement.querySelector('#address');
const titleElement = formElement.querySelector('#title');
const roomNumberElement = formElement.querySelector('#room_number');
const capacityElement = formElement.querySelector('#capacity');
const submitElement = formElement.querySelector('.ad-form__submit');
const resetFormElement = formElement.querySelector('.ad-form__reset');

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
const DEFAULT_COORDINATE_X = '35.65283';
const DEFAULT_COORDINATE_Y = '139.83947';
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const checkTitleField = () => {
  const valueLength = titleElement.value.length;

  if (titleElement.validity.valueMissing) {
    titleElement.setCustomValidity('Обязательное поле');
    showErrorStyles(titleElement);
  } else if (valueLength < MIN_TITLE_LENGTH) {
    titleElement.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLength) + ' симв.');
    showErrorStyles(titleElement);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleElement.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) + ' симв.');
    showErrorStyles(titleElement);
  } else {
    titleElement.setCustomValidity('');
    hideErrorStyles(titleElement);
  }
}

titleElement.addEventListener('input', () => {
  checkTitleField();

  titleElement.reportValidity();
});

titleElement.addEventListener('invalid', () => {
  checkTitleField();
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
    if (
      housingTypeValue === HOUSING_TYPE.FLAT &&
      priceElement.value < FLAT_PRICE
    ) {
      priceElement.placeholder = FLAT_PRICE;
      priceElement.min = FLAT_PRICE;
      housingTypeElement.setCustomValidity('При выборе "Тип жилья: Квартира" цена за ночь должна быть больше 1000');
      showErrorStyles(housingTypeElement);
    } else if (
      housingTypeValue === HOUSING_TYPE.HOUSE &&
      priceElement.value < HOUSE_PRICE
    ) {
      priceElement.placeholder = HOUSE_PRICE;
      priceElement.min = HOUSE_PRICE;
      housingTypeElement.setCustomValidity('При выборе "Тип жилья: Дом" цена за ночь должна быть больше 5000');
      showErrorStyles(housingTypeElement);
    } else if (
      housingTypeValue === HOUSING_TYPE.PALACE &&
      priceElement.value < PALACE_PRICE
    ) {
      priceElement.placeholder = PALACE_PRICE;
      priceElement.min = PALACE_PRICE;
      housingTypeElement.setCustomValidity('При выборе "Тип жилья: Дворец" цена за ночь должна быть больше 10 000');
      showErrorStyles(housingTypeElement);
    } else if (housingTypeValue === HOUSING_TYPE.BUNGALOW) {
      priceElement.placeholder = MIN_PRICE;
      priceElement.min = MIN_PRICE;
    } else {
      housingTypeElement.setCustomValidity('');
      hideErrorStyles(housingTypeElement);
    }
  }
  housingTypeElement.reportValidity();
});

const checkPriceField = (evt) => {
  const priceValue = evt.target.value;

  if (priceElement.validity.valueMissing) {
    priceElement.setCustomValidity('Обязательное поле');
    showErrorStyles(priceElement);
  } else if (priceValue < MIN_PRICE) {
    priceElement.setCustomValidity('Цена за ночь должна быть больше 0.');
    showErrorStyles(priceElement);
  } else if (priceValue > MAX_PRICE) {
    priceElement.setCustomValidity('Цена за ночь не должна быть больше 1 000 000.');
    showErrorStyles(priceElement);
  } else if (
    housingTypeElement.value === HOUSING_TYPE.FLAT &&
    priceValue < FLAT_PRICE
  ) {
    priceElement.setCustomValidity('При выборе "Тип жилья: Квартира" цена за ночь должна быть больше 1000');
    showErrorStyles(priceElement);
  } else if (
    housingTypeElement.value === HOUSING_TYPE.HOUSE &&
    priceValue < HOUSE_PRICE
  ) {
    priceElement.setCustomValidity('При выборе "Тип жилья: Дом" цена за ночь должна быть больше 5000');
    showErrorStyles(priceElement);
  } else if (
    housingTypeElement.value === HOUSING_TYPE.PALACE &&
    priceValue < PALACE_PRICE
  ) {
    priceElement.setCustomValidity('При выборе "Тип жилья: Дворец" цена за ночь должна быть больше 10 000');
    showErrorStyles(priceElement);
  } else {
    priceElement.setCustomValidity('');
    housingTypeElement.setCustomValidity('');
    hideErrorStyles(priceElement);
  }
};

priceElement.addEventListener('input', (evt) => {
  checkPriceField(evt);

  priceElement.reportValidity();
});

priceElement.addEventListener('invalid', (evt) => {
  checkPriceField(evt);
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

roomNumberElement.addEventListener('change', (evt) => {
  const roomNumberValue = evt.target.value;
  const capacityValue = capacityElement.value;
  if (capacityValue > roomNumberValue) {
    roomNumberElement.setCustomValidity('Количество комнат должно быть не меньше, чем количество гостей');
    showErrorStyles(roomNumberElement);
  } else if (roomNumberValue !== '100' && capacityValue === '0') {
    roomNumberElement.setCustomValidity('При выборе "Количество мест: не для гостей" в поле "Количество комнат" можно указать только "100 комнат"');
    showErrorStyles(roomNumberElement);
  } else if (roomNumberValue === '100' && capacityValue !== '0') {
    roomNumberElement.setCustomValidity('При выборе "Количество комнат: 100 комнат" в поле "Количество мест" можно указать только "не для гостей"');
    showErrorStyles(roomNumberElement);
  } else {
    capacityElement.setCustomValidity('');
    roomNumberElement.setCustomValidity('');
    hideErrorStyles(capacityElement);
    hideErrorStyles(roomNumberElement);
  }
  roomNumberElement.reportValidity();
});

capacityElement.addEventListener('change', (evt) => {
  const capacityValue = evt.target.value;
  const roomNumberValue = roomNumberElement.value;
  if (capacityValue > roomNumberValue) {
    capacityElement.setCustomValidity('Количество комнат должно быть не меньше, чем количество гостей');
    showErrorStyles(capacityElement);
  } else if (roomNumberValue !== '100' && capacityValue === '0') {
    capacityElement.setCustomValidity('При выборе "Количество мест: не для гостей" в поле "Количество комнат" можно указать только "100 комнат"');
    showErrorStyles(capacityElement);
  } else if (roomNumberValue === '100' && capacityValue !== '0') {
    capacityElement.setCustomValidity('При выборе "Количество комнат: 100 комнат" в поле "Количество мест" можно указать только "не для гостей"');
    showErrorStyles(capacityElement);
  } else {
    capacityElement.setCustomValidity('');
    roomNumberElement.setCustomValidity('');
    hideErrorStyles(capacityElement);
    hideErrorStyles(roomNumberElement);
  }
  capacityElement.reportValidity();
});

const checkRoomAndCapacityFields = () => {
  const roomNumberValue = roomNumberElement.value;
  const capacityValue = capacityElement.value;

  if (capacityValue !== '0' && roomNumberValue === '100') {
    roomNumberElement.setCustomValidity('При выборе "Количество комнат: 100 комнат" в поле "Количество мест" можно указать только "не для гостей"');
    showErrorStyles(roomNumberElement);
  } else if (capacityValue === '0' && roomNumberValue !== '100') {
    roomNumberElement.setCustomValidity('При выборе "Количество мест: не для гостей" в поле "Количество комнат" можно указать только "100 комнат"');
    showErrorStyles(roomNumberElement);
  } else if (capacityValue > roomNumberValue) {
    roomNumberElement.setCustomValidity('Количество комнат должно быть не меньше, чем количество гостей');
    showErrorStyles(roomNumberElement);
  } else {
    roomNumberElement.setCustomValidity('');
    hideErrorStyles(roomNumberElement);
  }
};

const setDefaultFieldValue = () => {
  addressElement.value = DEFAULT_COORDINATE_X + ', ' + DEFAULT_COORDINATE_Y;
};

checkinElement.addEventListener('change', (evt) => {
  checkoutElement.value = evt.target.value;
});

checkoutElement.addEventListener('change', (evt) => {
  checkinElement.value = evt.target.value;
});

const cleaningForm = () => {
  formElement.reset();
  setDefaultFieldValue();
  setDefaultPriceAttributes();
}

submitElement.addEventListener('click', () => {
  checkRoomAndCapacityFields();
});

formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();

  sendData(
    () => showSuccessNotification(),
    () => showErrorNotification(),
    new FormData(evt.target),
  );
});

resetFormElement.addEventListener('click', (evt) => {
  evt.preventDefault();
  cleaningForm();
});

export {setDefaultPriceAttributes, setDefaultFieldValue, cleaningForm, addressElement };
