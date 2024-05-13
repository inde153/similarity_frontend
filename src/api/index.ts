import axios, { Axios, AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { response } from 'express';
import { async } from 'q';

const client = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URI}/`,
  headers: {},
  withCredentials: true,
});

client.interceptors.response.use(
  (res: AxiosResponse) => {
    return res.data;
  },
  async (err: AxiosError) => {
    if (axios.isAxiosError(err)) {
      const status = err.response?.status;

      if (status === 403) {
        const res = await client.get('auth/refresh');
        console.log(res);
      }
    }
    return Promise.reject(err);
  }
);

export default client;
