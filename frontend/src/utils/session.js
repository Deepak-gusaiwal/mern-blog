export const storeInSession = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value));
};
export const lookInSession = (key) => {
  return JSON.parse(localStorage.getItem(key));
};
export const removeFromSession = (key) => {
  return localStorage.removeItem(key);
};
export const clearSession = () => {
  return localStorage.clear();
};
