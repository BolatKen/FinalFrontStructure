// services/product.service.ts
import API from './axios'

export const getAllProducts = async () => {
  // Получить все товары (для страницы /catalog)
  const res = await API.get('/catalog/products/')
  return res.data
}

export const getProductBySlug = async (slug: string) => {
  // Получить товар по слагу (для страницы /catalog/[slug])
  try {
    console.log('Product found:', slug)
    const res = await API.get(`/catalog/products/${slug}/`)

    return res.data
  } catch (err) {
    console.error('Product not found:', err)

    return null
  }
}

export const getAllProductSlugs = async (): Promise<{ slug: string }[]> => {
  const res = await API.get('/products/')
  return res.data.map((p: any) => ({ slug: p.slug }))
}
