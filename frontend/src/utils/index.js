import axios from "axios";
import { apiBaseUrl } from "./env";

export const Axios = axios.create({
  baseURL: apiBaseUrl,
});
