const getFormDataFromObject = (formData: FormData, data: any, parentKey = '') => {
  if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
    Object.keys(data).forEach((key) => {
      getFormDataFromObject(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
    });
  } else {
    const value = data === null ? '' : data;

    formData.append(parentKey, value);
  }
};

export const getFormData = (data: any): FormData => {
  const formData = new FormData();

  getFormDataFromObject(formData, data);

  return formData;
};
