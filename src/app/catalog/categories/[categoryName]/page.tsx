import { getProductsByCategorySlug } from '@/services/category.service'
import { notFound } from 'next/navigation'
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react'

interface Props {
  params: {
    categoryName: string
  }
}

export default async function CategoryPage({ params }: Props) {
  const products = await getProductsByCategorySlug(params.categoryName)

if (!products || products.length === 0) return notFound()

  return (
    <div>
      <h1>Категория: {params.categoryName}</h1>
      {products.map(product => (
        <div key={product.id} style={{ border: '1px solid #ccc', padding: 12, marginBottom: 12 }}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p><strong>Slug:</strong> {product.slug}</p>
          <p><strong>Base SKU:</strong> {product.base_sku}</p>
          <div>
            <h4>Варианты:</h4>
            {product.variants.map((variant: { id: Key | null | undefined; sku: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; price: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; currency: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined }) => (
              <div key={variant.id}>
                <p>SKU: {variant.sku}</p>
                <p>Цена: {variant.price} {variant.currency}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
