import {Platform} from 'react-native';

export const createFormData = jsonObject => {
  let formData = new FormData();

  for (let key in jsonObject) {
    if (key === 'image') {
      const imageData = jsonObject[key];
      formData.append('image', {
        uri: imageData.uri,
        type: imageData.type,
        name: imageData.fileName,
      });
    } else {
      formData.append(`${key}`, `${jsonObject[key]}`);
    }
  }

  return formData;
};
