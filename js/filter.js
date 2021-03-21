const mapFiltersElement = document.querySelector('.map__filters');
const housingTypeElement = mapFiltersElement.querySelector('#housing-type');
const housingPriceElement = mapFiltersElement.querySelector('#housing-price');
const housingRoomsElement = mapFiltersElement.querySelector('#housing-rooms');
const housingGuestsElement = mapFiltersElement.querySelector('#housing-guests');
const featuresElements = mapFiltersElement.querySelectorAll('input[name="features"]');

const getFilteredPrice = (ads, property, filter) => {
  let filteredList = [];

  switch(filter) {
    case 'any':
      filteredList = ads;
      break;
    case 'middle':
      filteredList = ads.filter((ad) => {
        if (10000 <= ad.offer[property] && ad.offer[property] <= 50000) {
          return ad;
        }
      });
      break;
    case 'low':
      filteredList = ads.filter((ad) => {
        if (ad.offer[property] < 10000) {
          return ad;
        }
      });
      break;
    case 'high':
      filteredList = ads.filter((ad) => {
        if (ad.offer[property] > 50000) {
          return ad;
        }
      });
      break;
  }

  return filteredList;
};

const getFilteredAttributes = (ads, property, filter) => {
  const filteredList = ads.filter((ad) => {
    if (ad.offer[property].toString() === filter || filter === 'any') {
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
  housingTypeElement.addEventListener('change', () => {
    cb();
  });
};

const setPriceFilter = (cb) => {
  housingPriceElement.addEventListener('change', () => {
    cb();
  });
}

const setRoomsFilter = (cb) => {
  housingRoomsElement.addEventListener('change', () => {
    cb();
  });
}

const setGuestsFilter = (cb) => {
  housingGuestsElement.addEventListener('change', () => {
    cb();
  });
}

const setFeaturesFilter = (cb) => {
  featuresElements.forEach((feature) => {
    feature.addEventListener('click', () => {
      cb();
    });
  });
}

const getFilteredList = (ads) => {
  let adsFiltered = ads.slice();
  housingTypeElement.value !== 'any' ?
    adsFiltered = getFilteredAttributes(adsFiltered, 'type', housingTypeElement.value) : adsFiltered;
  housingPriceElement.value !== 'any' ?
    adsFiltered = getFilteredPrice(adsFiltered, 'price', housingPriceElement.value) : adsFiltered;
  housingRoomsElement.value !== 'any' ?
    adsFiltered = getFilteredAttributes(adsFiltered, 'rooms', housingRoomsElement.value) : adsFiltered;
  housingGuestsElement.value !== 'any' ?
    adsFiltered = getFilteredAttributes(adsFiltered, 'guests', housingGuestsElement.value) : adsFiltered;
  featuresElements.forEach((feature) => {
    adsFiltered = getFilteredFeatures(adsFiltered, 'features', feature.value, feature.checked);
  });

  return adsFiltered;
};

export { setTypeFilter, setPriceFilter, setRoomsFilter, setGuestsFilter, setFeaturesFilter, getFilteredList }
