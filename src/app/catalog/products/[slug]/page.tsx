// // app/product/[slug]/page.tsx
import { getProductBySlug } from '@/services/product.service';
import Welcome from '@/components/sections/Welcome/Welcome';
import Description from '@/components/sections/Description/Description';
import Configurator from '@/components/sections/Configurator/Configurator';
import BestOffers from '@/components/sections/BestOffers/BestOffers';


export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) {
    return <div>Товар не найден</div>
  }

  return (<>
    <Welcome product={product} />
    <Configurator product={product} />
    <Description product={product} />
    <BestOffers />
  </>)
}
