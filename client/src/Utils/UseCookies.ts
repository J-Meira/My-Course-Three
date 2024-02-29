const get = (key: string) => {
  const b = document.cookie.match('(^|;)\\s*' + key + '\\s*=\\s*([^;]+)');
  return b ? b.pop() : '';
};

const set = (key: string, value: string, expires?: Date) => {
  if (!expires) {
    expires = new Date();
    expires.setTime(expires.getTime() + 365 * 24 * 60 * 60 * 1000);
  }
  document.cookie = `${key}=${value};expires=${expires.toUTCString()};path=/`;
};

const remove = (key: string) => {
  const expires = new Date();
  expires.setTime(expires.getTime() - 1000);

  document.cookie = `${key}="";expires=${expires.toUTCString()};path=/`;
};

export const useCookies = {
  get,
  set,
  remove,
};
