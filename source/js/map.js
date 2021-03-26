/* global L:readonly */
/* global _:readonly */

import { addressElement } from './form.js';
import { activeStatePage, inactiveMapFiltersForm, activeMapFiltersForm } from './state-page.js';
import { createSimilarAd } from './similar-ads.js';
import { getData } from './api.js';
import { showErrorLoadNotification } from './notifications.js';
import { setTypeFilter, setPriceFilter, setRoomsFilter, setGuestsFilter, setFeaturesFilter, getFilteredList} from './filter.js';
import { submitForm, resetForm} from './form.js';

const SIMILAR_AD_COUNT = 10;
const RERENDER_DELAY = 500;
const DEFAULT_PIN_COORDINATE_X = '35.65283';
const DEFAULT_PIN_COORDINATE_Y = '139.83947';

const getLowerNumber = (adsArray) => {
  return adsArray.length > SIMILAR_AD_COUNT ? SIMILAR_AD_COUNT : adsArray.length;
};

getData((ads) => {
  const adsList = ads.slice(0, getLowerNumber(ads));

  showSimilarAds(getFilteredList(adsList));
  setTypeFilter(_.debounce(() => showSimilarAds(getFilteredList(adsList)), RERENDER_DELAY));
  setPriceFilter(_.debounce(() => showSimilarAds(getFilteredList(adsList)), RERENDER_DELAY));
  setRoomsFilter(_.debounce(() => showSimilarAds(getFilteredList(adsList)), RERENDER_DELAY));
  setGuestsFilter(_.debounce(() => showSimilarAds(getFilteredList(adsList)), RERENDER_DELAY));
  setFeaturesFilter(_.debounce(() => showSimilarAds(getFilteredList(adsList)), RERENDER_DELAY));
  submitForm(() => {
    showSimilarAds(getFilteredList(adsList));
    setDefaultPinCoordinates();
  });
  resetForm(() => {
    showSimilarAds(getFilteredList(adsList));
    setDefaultPinCoordinates();
  });
  activeMapFiltersForm();
}, () => {
  inactiveMapFiltersForm();
  showErrorLoadNotification('Ошибка загрузки похожих объявлений');
},
);

const map = L.map('map-canvas')
  .on('load', () => {
    activeStatePage();
  })
  .setView(
    {
      lat: DEFAULT_PIN_COORDINATE_X,
      lng: DEFAULT_PIN_COORDINATE_Y,
    },
    10,
  );

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: DEFAULT_PIN_COORDINATE_X,
    lng: DEFAULT_PIN_COORDINATE_Y,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  const addressСoordinates = evt.target.getLatLng();
  addressElement.value =
    addressСoordinates.lat.toFixed(5) +
    ', ' +
    addressСoordinates.lng.toFixed(5);
});

const pinMarkers = L.layerGroup();

const showSimilarAds = (similarAds) => {
  clearingPinMarkers();

  similarAds.forEach((similarAd) => {
    const lat = similarAd.location.lat;
    const lng = similarAd.location.lng;

    const pinIcon = L.icon({
      iconUrl: '../img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    const pinMarker = L.marker(
      {
        lat,
        lng,
      },
      {
        pinIcon,
      },
    );

    pinMarker.bindPopup(createSimilarAd(similarAd), {
      keepInView: true,
    });
    pinMarkers.addLayer(pinMarker);
    pinMarkers.addTo(map);

    mainPinMarker.on('movestart', () => {
      pinMarker.closePopup();
    });
  });
};

const setDefaultPinCoordinates = () => {
  mainPinMarker.setLatLng({
    lat: DEFAULT_PIN_COORDINATE_X,
    lng: DEFAULT_PIN_COORDINATE_Y,
  });
};

const clearingPinMarkers = () => {
  pinMarkers.clearLayers();
};

export { getData }
