// src/services/category.service.ts
import axios from 'axios'

export interface Category {
  id: number
  name: string
  slug: string
}

export async function getCategories(): Promise<Category[]> {

    const NEXT_PUBLIC_API_URL  = 'http://localhost:8000'


  try {
    const response = await axios.get<Category[]>(
      `${NEXT_PUBLIC_API_URL}/catalog/categories/`
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
