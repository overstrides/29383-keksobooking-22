const adFormElement = document.querySelector('.ad-form');
const fieldsetElements = adFormElement.querySelectorAll('fieldset');
const mapFiltersFormElement = document.querySelector('.map__filters');
const mapFiltersSelectsElements = mapFiltersFormElement.querySelectorAll('select');
const mapFiltersFieldsetElement = mapFiltersFormElement.querySelector('fieldset');

const inactiveStatePage = () => {
  adFormElement.classList.add('ad-form--disabled');
  fieldsetElements.forEach((fieldsetItem) => {
    fieldsetItem.disabled = true;
  });
  inactiveMapFiltersForm();
};

const activeStatePage = () => {
  adFormElement.classList.remove('ad-form--disabled');
  fieldsetElements.forEach((fieldsetItem) => {
    fieldsetItem.disabled = false;
  });
  activeMapFiltersForm();
};

const inactiveMapFiltersForm = () => {
  mapFiltersFormElement.classList.add('map__filters--disabled');
  mapFiltersSelectsElements.forEach((selectItem) => {
    selectItem.disabled = true;
  });
  mapFiltersFieldsetElement.disabled = true;
};

const activeMapFiltersForm = () => {
  mapFiltersFormElement.classList.remove('map__filters--disabled');
  mapFiltersSelectsElements.forEach((selectItem) => {
    selectItem.disabled = false;
  });
  mapFiltersFieldsetElement.disabled = false;
};

inactiveStatePage();

export { inactiveStatePage, activeStatePage, inactiveMapFiltersForm, activeMapFiltersForm };
