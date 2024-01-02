import config from "@/config";
import CryptoJS from "crypto-js";
export const setLocalStorageToken = (token) => {
   
    localStorage.setItem(
        `${config.NAME_KEY}:token`,
        CryptoJS.AES.encrypt(token, `${config.NAME_KEY}-token`).toString()
    )
}

// src/utils/common.util.js



export const getLocalStorageToken = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem(`${config.NAME_KEY}:token`);
    if (token) {
      const bytes = CryptoJS?.AES?.decrypt(token, `${config.NAME_KEY}-token`);
      return bytes?.toString(CryptoJS.enc.Utf8);
    }
  }
  return null; // Or handle the absence of localStorage according to your logic
};


export const removeLocalStorageToken = (router) => {
    if (localStorage.getItem(`${config.NAME_KEY}:token`)) {
        localStorage.setItem(`${config.NAME_KEY}:token`, null);
    }
    if (router) {
        router.push("/")
    }
};