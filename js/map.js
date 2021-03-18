/* global L:readonly */

import { addressElement } from './form.js';
import { activeStatePage } from './state-page.js';
import { createSimilarAd } from './similar-ads.js';
import { getData } from './api.js';
import { showErrorLoadNotification } from './notifications.js';

const SIMILAR_AD_COUNT = 10;

getData((ads) => {
  showSimilarAds(ads.slice(0, ads.length > SIMILAR_AD_COUNT ? SIMILAR_AD_COUNT : ads.length));
}, () => showErrorLoadNotification('Ошибка загрузки похожих объявлений'));

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

const showSimilarAds = (similarAds) => {
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

    pinMarker.addTo(map).bindPopup(createSimilarAd(similarAd), {
      keepInView: true,
    });

    mainPinMarker.on('movestart', () => {
      pinMarker.closePopup();
    });
  });
};

