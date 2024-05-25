export const storeInSession = (key, value) => {
  return sessionStorage.setItem(key, JSON.stringify(value));
};
export const lookInSession = (key) => {
  return sessionStorage.getItem(key);
};
export const removeFromSession = (key) => {
  return sessionStorage.removeItem(key);
};
export const clearSession = () => {
  return sessionStorage.clear();
};
