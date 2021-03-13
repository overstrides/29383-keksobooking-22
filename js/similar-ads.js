const similarAdsTemplate = document.querySelector('#card').content.querySelector('.popup');

const getHousingType = (type) => {
  let housingType = '';
  switch (type) {
    case 'flat':
      housingType = 'Квартира';
      break;
    case 'bungalow':
      housingType = 'Бунгало';
      break;
    case 'house':
      housingType = 'Дом';
      break;
    case 'palace':
      housingType = 'Дворец';
      break;
    default:
      housingType = 'Квартира';
      break;
  }

  return housingType;
};

const createSimilarAd = (ad) => {
  const adsElement = similarAdsTemplate.cloneNode(true);

  ad.author.avatar !== '' ? (adsElement.querySelector('.popup__avatar').src = ad.author.avatar) : adsElement.querySelector('.popup__avatar').classList.add('hidden');

  ad.offer.title !== '' ? (adsElement.querySelector('.popup__title').textContent = ad.offer.title) : adsElement.querySelector('.popup__title').classList.add('hidden');

  ad.offer.address !== '' ? (adsElement.querySelector('.popup__text--address').textContent = ad.offer.address) : adsElement.querySelector('.popup__text--address').classList.add('hidden');

  ad.offer.price !== '' ? (adsElement.querySelector('.popup__text--price').innerHTML = `${ad.offer.price} <span>₽/ночь</span>`) : adsElement.querySelector('.popup__text--price').classList.add('hidden');

  ad.offer.type !== '' ? (adsElement.querySelector('.popup__type').textContent = getHousingType(ad.offer.type)) : adsElement.querySelector('.popup__type').classList.add('hidden');

  ad.offer.rooms !== '' && ad.offer.guests !== '' ? (adsElement.querySelector('.popup__text--capacity').textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`) : adsElement.querySelector('.popup__text--capacity').classList.add('hidden');

  ad.offer.checkin !== '' && ad.offer.checkout !== '' ? (adsElement.querySelector('.popup__text--time').textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`) : adsElement.querySelector('.popup__text--time').classList.add('hidden');

  let featuresList = '';

  ad.offer.features.forEach((feature) => {
    return (featuresList += `<li class="popup__feature popup__feature--${feature}"></li>`);
  });

  featuresList !== '' ? (adsElement.querySelector('.popup__features').innerHTML = featuresList) : adsElement.querySelector('.popup__features').classList.add('hidden');

  ad.offer.description !== '' ? (adsElement.querySelector('.popup__description').textContent = ad.offer.description) : adsElement.querySelector('.popup__description').classList.add('hidden');

  let photosList = '';

  ad.offer.photos.forEach((photo) => {
    return (photosList += `<img src=${photo} class="popup__photo" width="45" height="40" alt="Фотография жилья">`);
  });

  photosList !== '' ? (adsElement.querySelector('.popup__photos').innerHTML = photosList) : adsElement.querySelector('.popup__photos').classList.add('hidden');

  return adsElement;
};

export { createSimilarAd };
