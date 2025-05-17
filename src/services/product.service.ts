// services/product.service.ts
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_DOMAIN

export const getAllProducts = async () => {
  const response = await axios.get<any[]>(
    `${API_URL}/catalog/products/`
  );
  return response.data;
}

export const getProductBySlug = async (slug: string) => {
  try {
    const response = await axios.get<any[]>(
      `${API_URL}/catalog/products/${slug}/`
    );

    return response.data
  } catch (err) {
    console.error('Product not found:', err)
    return null
  }
}

export const getAllProductSlugs = async (): Promise<{ slug: string }[]> => {
  const response = await axios.get<any[]>(
    `${API_URL}/products/`
  );
  return response.data.map((p: any) => ({ slug: p.slug }))
}
