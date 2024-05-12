import axios, { Axios, AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { response } from 'express';
import { async } from 'q';

interface IAPIResponse<T = any> {
  errorCode: number;
  message: string;
  success: boolean;
  data: T;
}

interface CustomInstance extends AxiosInstance {
  get<T = unknown, R = AxiosResponse<IAPIResponse<T>>, D = unknown>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
}

const client: CustomInstance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URI}/`,
  headers: {},
  withCredentials: true,
});

client.interceptors.response.use(
  (res) => {
    return res.data;
  },
  async (err) => {
    if (axios.isAxiosError(err)) {
      const status = err.response?.status;

      if (status === 401) {
        const res = await client.get('auth/refresh');
      }
    }
    return Promise.reject(err);
  }
);

export default client;
