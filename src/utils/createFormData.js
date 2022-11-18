import {Platform} from 'react-native';

export const createFormData = jsonObject => {
  let formData = new FormData();

  for (let key in jsonObject) {
    if (key === 'image') {
      const imageData = jsonObject[key];
      console.log(imageData);
      formData.append('image', {
        uri: imageData.path,
        type: imageData.mime,
        name: `${imageData.filename}.${imageData.mime.substr(
          imageData.mime.indexOf('/') + 1,
        )}`,
      });
    } else {
      formData.append(`${key}`, `${jsonObject[key]}`);
    }
  }

  return formData;
};
