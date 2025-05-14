  // работа с товарами
  // services/product.service.ts
  import API from './axios'

  // Получить все товары
  export const getAllProducts = async () => {
    const res = await API.get('/catalog/products/')
    return res.data
  }

  // Получить товар по slug (для страницы /product/[slug])
  export const getProductBySlug = async (slug: string) => {


    try {
      console.log('Product found:',slug)
      const res = await API.get(`/catalog/products/${slug}/`)
      
      return res.data
    } catch (err) {
      console.error('Product not found:', err)
      
      return null
    }
  }

  // (опционально) Получить только slug-ключи всех товаров (для generateStaticParams)
  type Product = { slug: string };

  export const getAllProductSlugs = async (): Promise<{ slug: string }[]> => {
    const res = await API.get('/products/')
    return res.data.map((p: Product) => ({ slug: p.slug }))
  }
