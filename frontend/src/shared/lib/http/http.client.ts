import axios from 'axios';
import { Cookies } from 'react-cookie';

export const http = axios.create({
  baseURL: import.meta.env.API_URL || 'http://localhost:5000'
})

const cookies = new Cookies();

http.interceptors.request.use((config) => {
  const token = cookies.get('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})