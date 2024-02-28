import { api } from '.';

export const buggyServices = {
  get400Error: () => api.get('buggy/bad-request'),
  get401Error: () => api.get('buggy/unauthorized'),
  get404Error: () => api.get('buggy/not-found'),
  get500Error: () => api.get('buggy/server-error'),
  getValidationError: () => api.get('buggy/validation-error'),
};
