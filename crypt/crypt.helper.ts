import CryptoJS from "crypto-js";

// Choose a strong secret key (keep it safe, do not hardcode in real apps)
const SECRET_KEY = "mango-farm-34749899";

// Encrypt password
export const encryptPassword = (password: string) => {
  console.log("Hii", CryptoJS.AES.encrypt(password, SECRET_KEY).toString())
  return CryptoJS.AES.encrypt(password, SECRET_KEY).toString();
};

// Decrypt password
export const decryptPassword = (cipherText: string) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};
