// app/product/[slug]/page.tsx
import { getProductBySlug } from '@/services/product.service'
import Welcome from '@/components/sections/Welcome/Welcome'

interface ProductPageProps {
  params: { slug: string }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug)

  if (!product) {
    return <div>Товар не найден</div>
  }

  return <Welcome product={product} />
}
