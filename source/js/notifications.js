const mainElement = document.querySelector('main');
const successTemplate = document
  .querySelector('#success')
  .content.querySelector('.success');
const errorTemplate = document
  .querySelector('#error')
  .content.querySelector('.error');
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
};

const showErrorLoadNotification = (message) => {
  const errorLoad = document.createElement('div');

  errorLoad.classList.add('error-load');
  errorLoad.textContent = message;

  document.body.append(errorLoad);

  setTimeout(() => {
    errorLoad.remove();
  }, ERROR_LOAD_ALERT_SHOW_TIME);
};

const createErrorNotification = () => {
  const errorElement = errorTemplate.cloneNode(true);

  errorElement.classList.add('hidden');

  mainElement.appendChild(errorElement);

  errorNotificationElement = document.querySelector('.error');
  errorMessageElement = document.querySelector('.error__message');
  errorButtonElement = document.querySelector('.error__button');
};

const showErrorStyles = (field) => {
  field.classList.add('error-field');
};

const hideErrorStyles = (field) => {
  field.classList.remove('error-field');
};

createSuccessNotification();
createErrorNotification();

const hideErrorNotification = () => {
  errorNotificationElement.classList.add('hidden');
};

const onPressEscErrorNotification = function(evt) {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    hideErrorNotification();

    document.removeEventListener('keydown', onPressEscErrorNotification);
  }
};

const onClickErrorNotification = (evt) => {
  if (evt.target !== errorMessageElement) {
    hideErrorNotification();

    document.removeEventListener('click', onClickErrorNotification);
  }
};

const showErrorNotification = () => {
  errorNotificationElement.classList.remove('hidden');

  document.addEventListener('keydown', onPressEscErrorNotification);
  document.addEventListener('click', onClickErrorNotification);

  errorButtonElement.addEventListener('click', function() {
    hideErrorNotification();
  });
};

const onPressEscSuccessNotification = function(evt) {
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
};

const showSuccessNotification = () => {
  successNotificationElement.classList.remove('hidden');

  document.addEventListener('keydown', onPressEscSuccessNotification);
  document.addEventListener('click', onClickSuccessNotification);
};

export { showErrorLoadNotification, showErrorStyles, hideErrorStyles, showErrorNotification, showSuccessNotification };
