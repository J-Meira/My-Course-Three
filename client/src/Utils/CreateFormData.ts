// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createFormData = (item: any) => {
  const formData = new FormData();
  for (const key in item) {
    formData.append(key, item[key]);
  }
  return formData;
};
