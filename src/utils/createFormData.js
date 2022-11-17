export const createFormData = jsonObject => {
  let formData = new FormData();

  for (let key in jsonObject) {
    formData.append(`${key}`, `${jsonObject[key]}`);
  }
  return formData;
};
