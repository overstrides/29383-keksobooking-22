const mapFiltersElement = document.querySelector('.map__filters');
const housingTypeElement = mapFiltersElement.querySelector('#housing-type');
const housingPriceElement = mapFiltersElement.querySelector('#housing-price');
const housingRoomsElement = mapFiltersElement.querySelector('#housing-rooms');
const housingGuestsElement = mapFiltersElement.querySelector('#housing-guests');
const featuresElements = mapFiltersElement.querySelectorAll('input[name="features"]');

const FILTERDEFAULTVALUE = 'any';
const LOW_PRICE = 10000;
const HIGH_PRICE = 50000;
const PriceValues = {
  ANY: 'any',
  MIDDLE: 'middle',
  LOW: 'low',
  HIGH: 'high',
};

const featuresList = [];

const getFilteredPrice = (item, filter) => {
  switch(filter) {
    case PriceValues.MIDDLE:
      if (LOW_PRICE <= item.offer.price && item.offer.price <= HIGH_PRICE) {
        return item;
      }
      break;
    case PriceValues.LOW:
      if (item.offer.price < LOW_PRICE) {
        return item;
      }
      break;
    case PriceValues.HIGH:
      if (item.offer.price > HIGH_PRICE) {
        return item;
      }
      break;
  }
};

const filterHousing = (housing) => {
  const type = housingTypeElement.value !== FILTERDEFAULTVALUE ? housing.offer.type === housingTypeElement.value : true;
  const rooms = housingRoomsElement.value !== FILTERDEFAULTVALUE ? housing.offer.rooms.toString() === housingRoomsElement.value : true;
  const guests = housingGuestsElement.value !== FILTERDEFAULTVALUE ? housing.offer.guests.toString() === housingGuestsElement.value : true;
  const price = housingPriceElement.value !== FILTERDEFAULTVALUE ? getFilteredPrice(housing, housingPriceElement.value) : true;
  const features = featuresList.length ? featuresList.every(filter => {
    return housing.offer.features.some(feature => feature === filter);
  }) : true;

  return type && rooms && guests && price && features;
};

const getFilteredList = (list) => {
  const filteredList = list.filter(item => filterHousing(item));

  return filteredList;
};

const setTypeFilter = (cb) => {
  housingTypeElement.addEventListener('change', cb);
};

const setPriceFilter = (cb) => {
  housingPriceElement.addEventListener('change', cb);
};

const setRoomsFilter = (cb) => {
  housingRoomsElement.addEventListener('change', cb);
};

const setGuestsFilter = (cb) => {
  housingGuestsElement.addEventListener('change', cb);
};

const setFeaturesFilter = (cb) => {
  featuresElements.forEach((feature) => {
    feature.addEventListener('click', () => {
      if (feature.checked) {
        featuresList.push(feature.value);
      } else {
        featuresList.some((item, index) => {
          if (item === feature.value) {
            featuresList.splice(index, 1);
          }
        });
      }
      cb();
    });
  });
};

const cleaningFormFilters = () => {
  mapFiltersElement.reset();
};

export { setTypeFilter, setPriceFilter, setRoomsFilter, setGuestsFilter, setFeaturesFilter, getFilteredList, cleaningFormFilters }
