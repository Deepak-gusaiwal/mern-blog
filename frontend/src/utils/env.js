// import.meta.env.VITE_API_BASE_URI
const importViteString = import.meta.env;
export const apiBaseUrl = importViteString.VITE_API_BASE_URI;
