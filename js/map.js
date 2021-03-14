/* global L:readonly */

import { addressElement } from './form.js';
import { activeStatePage } from './state-page.js';
import { createArrayAds } from './data.js';
import { createSimilarAd } from './similar-ads.js';

const similarAds = createArrayAds();

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

similarAds.forEach((similarAd) => {
  const lat = similarAd.location.x;
  const lng = similarAd.location.y;

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

  mainPinMarker.on('moveend', (evt) => {
    const addressСoordinates = evt.target.getLatLng();
    addressElement.value =
      addressСoordinates.lat.toFixed(5) +
      ', ' +
      addressСoordinates.lng.toFixed(5);
  });
});
