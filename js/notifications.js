const mainElement = document.querySelector('main');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
let errorNotificationElement = '';
let errorMessageElement = '';
let errorButtonElement = '';
let successNotificationElement = '';
let successMessageElement = '';

const ERROR_LOAD_ALERT_SHOW_TIME = 5000;

const createSuccessNotification = () => {
  const successElement = successTemplate.cloneNode(true);

  successElement.classList.add('hidden');

  mainElement.appendChild(successElement);

  successNotificationElement = document.querySelector('.success');
  successMessageElement = document.querySelector('.success__message');
}

const showErrorLoadNotification = (message) => {
  const errorLoad = document.createElement('div');

  errorLoad.style.position = 'absolute';
  errorLoad.style.top = '0';
  errorLoad.style.left = '0';
  errorLoad.style.width = '100%';
  errorLoad.style.padding = '35px';
  errorLoad.style.fontSize = '24px';
  errorLoad.style.textAlign = 'center';
  errorLoad.style.backgroundColor = 'red';

  errorLoad.textContent = message;

  document.body.append(errorLoad);

  setTimeout(() => {
    errorLoad.remove();
  }, ERROR_LOAD_ALERT_SHOW_TIME);
}

const createErrorNotification = () => {
  const errorElement = errorTemplate.cloneNode(true);

  errorElement.classList.add('hidden');

  mainElement.appendChild(errorElement);

  errorNotificationElement = document.querySelector('.error');
  errorMessageElement = document.querySelector('.error__message');
  errorButtonElement = document.querySelector('.error__button');
}

const showErrorStyles = (field) => {
  field.style.borderWidth = '1px';
  field.style.borderColor = 'red';
  field.style.borderStyle = 'solid';
}

const hideErrorStyles = (field) => {
  field.style.border = 'none';
}

createSuccessNotification();
createErrorNotification();

const onPressEscErrorNotification = function (evt) {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    errorNotificationElement.classList.add('hidden');

    document.removeEventListener('keydown', onPressEscErrorNotification);
  }
};

const onClickErrorNotification = (evt) => {
  if (evt.target !== errorMessageElement) {
    errorNotificationElement.classList.add('hidden');

    document.removeEventListener('click', onClickErrorNotification);
  }
}

const showErrorNotification = () => {
  errorNotificationElement.classList.remove('hidden');

  document.addEventListener('keydown', onPressEscErrorNotification);
  document.addEventListener('click', onClickErrorNotification);

  errorButtonElement.addEventListener('click', function () {
    errorNotificationElement.classList.add('hidden');
  });
}

const onPressEscSuccessNotification = function (evt) {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    successNotificationElement.classList.add('hidden');

    document.removeEventListener('keydown', onPressEscSuccessNotification);
  }
};

const onClickSuccessNotification = (evt) => {
  if (evt.target !== successMessageElement) {
    successNotificationElement.classList.add('hidden');

    document.removeEventListener('click', onClickSuccessNotification);
  }
}

const showSuccessNotification = () => {
  successNotificationElement.classList.remove('hidden');

  document.addEventListener('keydown', onPressEscSuccessNotification);
  document.addEventListener('click', onClickSuccessNotification);
}

export { showErrorLoadNotification, showErrorStyles, hideErrorStyles, showErrorNotification, showSuccessNotification }
