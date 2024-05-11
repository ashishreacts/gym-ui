import { APP_NAME } from "@/config";

const storagePrefix = `${APP_NAME}_`;

const storage = {
  getToken: () => {
    return window.localStorage.getItem(`${storagePrefix}token`);
  },
  setToken: (token: string) => {
    window.localStorage.setItem(`${storagePrefix}token`, token);
  },
  clearToken: () => {
    window.localStorage.removeItem(`${storagePrefix}token`);
  },
};

export default storage;
