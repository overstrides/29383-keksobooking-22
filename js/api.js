import { cleaningForm } from './form.js';

const getData = (onSuccess, onError) => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((ads) => {
      onSuccess(ads);
    })
    .catch(() => {
      onError();
    });
};

const sendData = (onSuccess, onError, body) => {
  fetch(
    'https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  ).then((response) => {
    if(response.ok) {
      cleaningForm();
      onSuccess();
    } else {
      onError();
    }
  }).catch(() => {
    onError();
  });
};

export {getData, sendData};
