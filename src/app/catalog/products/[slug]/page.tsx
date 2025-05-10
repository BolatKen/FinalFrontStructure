// // app/product/[slug]/page.tsx
// import { getProductBySlug } from '@/services/product.service'
// import Welcome from '@/components/sections/Welcome/Welcome'
// import Description from '@/components/sections/Description/Description'
// import Configurator from '@/components/sections/Configurator/Configurator'

// interface ProductPageProps {
//   params: { slug: string }
// }

// export default async function ProductPage({ params }: ProductPageProps) {
//   const product = await getProductBySlug(params.slug)
//   console.log(product)
//   if (!product) {
//     return <div>Товар не найден</div>
//   }

//   return (<>
//     <Welcome product={product} />
//     <Configurator />
//     <Description product={product} />
//   </>)
// }


import { getAllProducts } from "@/services/product.service";
import BestOffers from "@/components/sections/BestOffers/BestOffers";

export default async function Page() {
  const products = await getAllProducts(); // Загружаем товары через твой сервис

  return (<>
    <Welcome product={product} />
    <Configurator product={product} />
    <Description product={product} />
  </>)
}
