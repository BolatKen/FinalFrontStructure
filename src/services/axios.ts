// Общая Настройка Axios

// services/axios.ts
import axios from 'axios'

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/',
  withCredentials: true, // если нужны cookie (например, Django session)
  headers: {
    'Content-Type': 'application/json',
  },
})

// Перехватчик ошибок (опционально)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API error:', error)
    return Promise.reject(error)
  }
)

export default API
