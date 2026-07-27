// @vsc repo:vsc-project-169-frontend file:src/api/client.ts task:f3-src-api-client-ts module:frontend session:169
/**
 * نمونه axios با آدرس پایه API پیکربندی شده.
 * استفاده از متغیر محیطی VITE_API_BASE_URL؛ در صورت عدم وجود به '/api' بازمی‌گردد.
 */
import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL ?? '/api';

export const apiClient = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    Accept: 'application/json',
  },
});

export default apiClient;
