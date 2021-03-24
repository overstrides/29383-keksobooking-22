/* global L:readonly */

import { addressElement } from './form.js';
import { activeStatePage, inactiveMapFiltersForm, activeMapFiltersForm } from './state-page.js';
import { createSimilarAd } from './similar-ads.js';
import { getData } from './api.js';
import { showErrorLoadNotification } from './notifications.js';
import { setTypeFilter, setPriceFilter, setRoomsFilter, setGuestsFilter, setFeaturesFilter, getFilteredList} from './filter.js';

const SIMILAR_AD_COUNT = 10;

const getLowerNumber = (adsArray) => {
  return adsArray.length > SIMILAR_AD_COUNT ? SIMILAR_AD_COUNT : adsArray.length;
};

getData((ads) => {
  const adsList = ads.slice(0, getLowerNumber(ads));

  showSimilarAds(getFilteredList(adsList));
  setTypeFilter(() => {showSimilarAds(getFilteredList(adsList))});
  setPriceFilter(() => {showSimilarAds(getFilteredList(adsList))});
  setRoomsFilter(() => {showSimilarAds(getFilteredList(adsList))});
  setGuestsFilter(() => {showSimilarAds(getFilteredList(adsList))});
  setFeaturesFilter(() => {showSimilarAds(getFilteredList(adsList))});
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
      lat: 35.652832,
      lng: 139.839478,
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
    lat: 35.652832,
    lng: 139.839478,
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

const clearingPinMarkers = () => {
  pinMarkers.clearLayers();
};
