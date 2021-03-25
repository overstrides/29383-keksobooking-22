const avatarFieldElement = document.querySelector('#avatar');
const avatarPreviewElement = document.querySelector('.ad-form-header__preview img');
const photoFieldElement = document.querySelector('#images');
const photoPreviewElement = document.querySelector('.ad-form__photo');

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

avatarFieldElement.addEventListener('change', () => {
  const avatarFile = avatarFieldElement.files[0];
  const avatarFileName = avatarFile.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return avatarFileName.endsWith(it);
  });

  if (matches) {
    const readerAvatarFile = new FileReader();

    readerAvatarFile.addEventListener('load', () => {
      avatarPreviewElement.src = readerAvatarFile.result;
    });

    readerAvatarFile.readAsDataURL(avatarFile);
  }
});

photoFieldElement.addEventListener('change', () => {
  const photoFile = photoFieldElement.files[0];
  const photoFileName = photoFile.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return photoFileName.endsWith(it);
  });

  if (matches) {
    const readerPhotoFile = new FileReader();

    readerPhotoFile.addEventListener('load', () => {
      const photoElement = document.createElement('img');
      photoElement.src = readerPhotoFile.result;
      photoPreviewElement.appendChild(photoElement);
    });

    readerPhotoFile.readAsDataURL(photoFile);
  }
});
