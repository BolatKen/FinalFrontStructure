// src/services/category.service.ts
import {
  Category,
  CategoryFilters,
  CategoryListItem,
  CategoryWelcome,
  FilteredData
} from '@/types/category';
import { ProductShort, PaginatedProducts, ProductsWithLength } from '@/types/product';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_DOMAIN

// Кеш для категорий
let categoriesCache: Category[] | null = null;
let cacheTimestamp: number | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 минут

export async function getCategories(): Promise<Category[]> {
  try {
    // Проверяем кеш
    const now = Date.now();
    if (categoriesCache && cacheTimestamp && (now - cacheTimestamp) < CACHE_DURATION) {
      return categoriesCache;
    }

    const response = await axios.get<Category[]>(
      `${API_URL}/catalog/categories/`,
      {
        // Добавляем кеширование на уровне HTTP
        headers: {
          'Cache-Control': 'max-age=300' // 5 минут
        }
      }
    );
    
    // Обновляем кеш
    categoriesCache = response.data;
    cacheTimestamp = now;
    
    return response.data;
  } catch (error) {
    // Возвращаем кешированные данные при ошибке, если они есть
    if (categoriesCache) {
      return categoriesCache;
    }
    console.error('Ошибка при загрузке категорий:', error);
    throw new Error('Не удалось получить список категорий');
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

export const getProductsByCategorySlug = async (slug: string): Promise<ProductShort[]> => {
  try {
    const response = await axios.get<ProductShort[]>(
      `${API_URL}/catalog/categories/${slug}/`
    )
    return response.data
  } catch (error) {
    console.error('Ошибка при получении товаров категории:', error);
    throw new Error('Не удалось получить категорию');
  }
}

export const getCategoryListingBySlug = async (slug: string, currentPage: number): Promise<CategoryListItem | null> => {
  try {
    const response = await axios.get<CategoryListItem>(
      `${API_URL}/catalog/categories/${slug}/listing/`
      // `${API_URL}/catalog/categories/${slug}/listing/filters/?&min_price=&max_price=&material=&color=&page=${currentPage}`
    
    );
    return response.data;
  } catch (error) {
    console.error(`Ошибка при получении товаров категории:${currentPage}`, error);
    return null;
  }
}

export const applyFilters = async (
  filterData: FilteredData,
  categorySlug: string,
  currentPage: number
): Promise<ProductsWithLength | null> => {
  try {
    const minPrice = filterData.priceFrom?.split(' ')[0].replace(/\s/g, "");
    const maxPrice = filterData.priceTo?.split(' ')[0].replace(/\s/g, "");
    const materialId = filterData.selectedMaterialId ? filterData.selectedMaterialId : '';
    const colorId = filterData.color ? filterData.color : '';
    let tags = '';
    filterData.activeTagIds?.map((item, idx) => {
      tags += ('tags=' + item);
      if (idx !== (filterData.activeTagIds?.length ?? 0) - 1) {
        tags += '&';
      }
    });
    const response = await axios.get<PaginatedProducts>(
      `${API_URL}/catalog/categories/${categorySlug}/listing/filters/?${tags}&min_price=${minPrice}&max_price=${maxPrice}&material=${materialId}&color=${colorId}&page=${currentPage}`
    );

    const ans = response.data.results;
    // Return type: { products: ProductShort[]; products_length: number }
    return { products: ans, products_length: response.data.count };
  } catch (err) {
    console.error('Ошибка при получении товаров при фильтрации:', err);
    return null;
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

export const getCategoryFilters = async (): Promise<CategoryFilters | null> => {
  try {
    const response = await axios.get<CategoryFilters>(
      `${API_URL}/catalog/categories/listing/filters/attributes/`
    );
    return response.data
  } catch (err) {
    console.error('Ошибка при получении фильтров категории:', err);
    return null;
  }
}

