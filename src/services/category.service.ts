// src/services/category.service.ts
import { Category, CategoryWelcome } from '@/types/category'
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_DOMAIN

export async function getCategories(): Promise<Category[]> {
  try {

    const response = await axios.get<Category[]>(
      `${API_URL}/catalog/categories/`
    )
    return response.data
  } catch (error) {
    console.error('Ошибка при загрузке категорий:', error)
    throw new Error('Не удалось получить список категорий')
  }
}

// Получить одну категорию по slug
export const getCategoryBySlug = async (slug: string): Promise<Category | null> => {
  try {
    const categories = await getCategories()
    return categories.find((category) => category.slug === slug) || null
  } catch (error) {
    console.error('Ошибка при получении категории по slug:', error)
    return null
  }
}

export const getProductsByCategorySlug = async (slug: string): Promise<any[]> => {
  try {
    const response = await axios.get<any[]>(
      `${API_URL}/catalog/categories/${slug}/`
    )
    return response.data
  } catch (error) {
    console.error('Ошибка при получении товаров категории:', error)
    return []
  }
}


export const getWelcomeCategories = async (): Promise<CategoryWelcome[]> => {
  try {
    const response = await axios.get<CategoryWelcome[]>(`${API_URL}/catalog/home/categories/`)
    return response.data
  } catch (err) {
    console.error('Ошибка при получении товаров категории:', err);
    return []
  }
}