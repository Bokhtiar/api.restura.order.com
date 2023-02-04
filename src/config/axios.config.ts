import axios from "axios";
const ENDPOINT: string = process.env.PRODUCT_SERVICE_ENDPOINT || "";

export const axiosRequest = axios.create({
  baseURL: ENDPOINT,
});

const AUTHENDPOINT: string = process.env.AUTH_SERVICE_ENDPOINT || "";

export const axiosAuthRequest = axios.create({
  baseURL: AUTHENDPOINT,
});
