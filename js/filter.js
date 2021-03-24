const mapFiltersElement = document.querySelector('.map__filters');
const housingTypeElement = mapFiltersElement.querySelector('#housing-type');
const housingPriceElement = mapFiltersElement.querySelector('#housing-price');
const housingRoomsElement = mapFiltersElement.querySelector('#housing-rooms');
const housingGuestsElement = mapFiltersElement.querySelector('#housing-guests');
const featuresElements = mapFiltersElement.querySelectorAll('input[name="features"]');

const FILTERDEFAULTVALUE = 'any';
const LOW_PRICE = 10000;
const HIGH_PRICE = 50000;
const FilterKinds = {
  TYPE: 'type',
  PRICE: 'price',
  ROOMS: 'rooms',
  GUESTS: 'guests',
  FEATURES: 'features'
};
const PriceValues = {
  ANY: 'any',
  MIDDLE: 'middle',
  LOW: 'low',
  HIGH: 'high'
};

const getFilteredPrice = (ads, property, filter) => {
  let filteredList = [];

  switch(filter) {
    case PriceValues.ANY:
      filteredList = ads;
      break;
    case PriceValues.MIDDLE:
      filteredList = ads.filter((ad) => {
        if (LOW_PRICE <= ad.offer[property] && ad.offer[property] <= HIGH_PRICE) {
          return ad;
        }
      });
      break;
    case PriceValues.LOW:
      filteredList = ads.filter((ad) => {
        if (ad.offer[property] < LOW_PRICE) {
          return ad;
        }
      });
      break;
    case PriceValues.HIGH:
      filteredList = ads.filter((ad) => {
        if (ad.offer[property] > HIGH_PRICE) {
          return ad;
        }
      });
      break;
  }

  return filteredList;
};

const getFilteredAttributes = (ads, property, filter) => {
  const filteredList = ads.filter((ad) => {
    if (ad.offer[property].toString() === filter || filter === FILTERDEFAULTVALUE) {
      return ad;
    }
  });

  return filteredList;
};

const getFilteredFeatures = (ads, property, filter, isChecked = false) => {
  let filteredList = [];

  ads.forEach((ad) => {
    if (isChecked) {
      ad.offer.features.forEach((feature) => {
        if (feature === filter) {
          filteredList.push(ad);
        }
      });
    } else {
      filteredList.push(ad);
    }
  });

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
    feature.addEventListener('click', cb);
  });
};

const getFilteredList = (ads) => {
  let adsFiltered = ads.slice();
  housingTypeElement.value !== FILTERDEFAULTVALUE ?
    adsFiltered = getFilteredAttributes(adsFiltered, FilterKinds.TYPE, housingTypeElement.value) : adsFiltered;
  housingPriceElement.value !== FILTERDEFAULTVALUE ?
    adsFiltered = getFilteredPrice(adsFiltered, FilterKinds.PRICE, housingPriceElement.value) : adsFiltered;
  housingRoomsElement.value !== FILTERDEFAULTVALUE ?
    adsFiltered = getFilteredAttributes(adsFiltered, FilterKinds.ROOMS, housingRoomsElement.value) : adsFiltered;
  housingGuestsElement.value !== FILTERDEFAULTVALUE ?
    adsFiltered = getFilteredAttributes(adsFiltered, FilterKinds.GUESTS, housingGuestsElement.value) : adsFiltered;
  featuresElements.forEach((feature) => {
    adsFiltered = getFilteredFeatures(adsFiltered, FilterKinds.FEATURES, feature.value, feature.checked);
  });

  return adsFiltered;
};

export { setTypeFilter, setPriceFilter, setRoomsFilter, setGuestsFilter, setFeaturesFilter, getFilteredList }
