// ----------------------------------------------
// lib/api.ts — общий axios-инстанс для запросов
// ----------------------------------------------
// Здесь мы указываем базовый URL (http://localhost/api)
// и единые заголовки для всех REST-запросов.
// ----------------------------------------------

import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: false,
});

export default api;
