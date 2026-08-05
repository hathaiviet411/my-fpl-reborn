import axios from 'axios';

import { sessionRepository } from '@/src/data/repositories/SessionRepository';

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ?? 'https://fantasy.premierleague.com/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15_000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

apiClient.interceptors.request.use(async (config) => {
  const token = await sessionRepository.getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
