import axios from "axios";
const ENDPOINT: string = process.env.PRODUCT_SERVICE_ENDPOINT || "";

export const axiosRequest = axios.create({
  baseURL: ENDPOINT,
});
