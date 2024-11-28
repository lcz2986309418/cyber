import axios from 'axios';
import { message } from 'antd';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://fcvmqrgkpcas.sealoshzh.site',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        message.error('请先登录');
        break;
      case 403:
        message.error('没有权限');
        break;
      case 404:
        message.error('请求的资源不存在');
        break;
      case 500:
        message.error('服务器错误');
        break;
      default:
        message.error(error.response.data.message || '请求失败');
    }
  } else {
    message.error('网络错误');
  }
  return Promise.reject(error);
});

export default api; 