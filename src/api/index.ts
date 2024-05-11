import axios, { Axios } from 'axios';

export const client: Axios = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URI}/`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
