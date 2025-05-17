// app/product/[slug]/page.tsx

import { getProductBySlug } from '@/services/product.service';
import ProductDetail from './ProductDetail';

type Props = {
  params: {
    productSlug: string;
  };
};

export default async function ProductPage({ params }: Props) {
  const { productSlug } = await params;
  const productData = await getProductBySlug(productSlug);

  if (!productData) {
    return <div>Товар не найден</div>
  }

  return <ProductDetail product={productData} />;
}
