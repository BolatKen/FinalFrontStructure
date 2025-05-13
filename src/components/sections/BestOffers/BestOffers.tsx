// "use client";

// import { useRef } from "react";
// import ProductCard from "@/components/shared/ProductCard/ProductCard";
// import styles from './BestOffers.module.css';
// import Arrow from "@/components/ui/Arrow/Arrow";

// interface VariantOption {
//   id: number;
//   option_display: {
//     id: number;
//     option_type_display: string;
//     value: string;
//     code: string;
//   };
// }

// interface Variant {
//   id: number;
//   sku: string;
//   price: string;
//   old_price?: string | null;
//   currency: string;
//   variant_options: VariantOption[];
// }

// interface Product {
//   id: number;
//   name: string;
//   description: string;
//   slug: string;
//   category: string;
//   options: any[];
//   variants: Variant[];
//   model_url?: string;
//   base_sku?: string;
// }

// export default function BestOffers(props?: any) {
//   const containerRef = useRef<HTMLDivElement>(null);

//   const products = [
//     {
//       'model_url': '',
//       'name': 'Aurora',
//       'variants': [
//         {
//           'old_price': '121000',
//           'price': '104000'
//         }
//       ]
//     },
//     {
//       'model_url': '',
//       'name': 'Aurora',
//       'variants': [
//         {
//           'old_price': '121000',
//           'price': '104000'
//         }
//       ]
//     },
//     {
//       'model_url': '',
//       'name': 'Aurora',
//       'variants': [
//         {
//           'old_price': '121000',
//           'price': '104000'
//         }
//       ]
//     },
//         {
//       'model_url': '',
//       'name': 'Aurora',
//       'variants': [
//         {
//           'old_price': '121000',
//           'price': '104000'
//         }
//       ]
//     },
//         {
//       'model_url': '',
//       'name': 'Aurora',
//       'variants': [
//         {
//           'old_price': '121000',
//           'price': '104000'
//         }
//       ]
//     }
//   ]

//   const scroll = (direction: "left" | "right") => {
//     if (containerRef.current) {
//       containerRef.current.scrollBy({
//         left: direction === "left" ? -360 : 360,
//         behavior: "smooth",
//       });
//     }
//   };

//   return (
//     <section className={[styles['best-offers'], props.isListing ? styles['best-offers_gray'] : ''].join(" ")} >

//       <div className={styles['best-offers__inner']}>
//         <h2 className={[styles['best-offers__title'], 'title', '_container'].join(" ")}>Лучшие предложения</h2>
//         <div className={[styles['best-offers__main'], '_container-bigger'].join(" ")}>
//           <Arrow onClick={() => scroll("left")} />
//           <div ref={containerRef} className={[styles['best-offers__list'], '_container'].join(" ")}>
//             {products.map((product, i) => (
//               <ProductCard
//                 key={i}
//                 imageSrc={product.model_url || "/products/chair1.png"} // если нет картинки
//                 title={product.name}
//                 oldPrice={product.variants[0]?.old_price || ""}
//                 newPrice={product.variants[0]?.price} />
//             ))}
//           </div>
//           <Arrow direction="right" onClick={() => scroll("right")} />
//         </div>
//       </div>
//     </section >
//   );
// }

"use client";

import { useState } from "react";
import ProductCard from "@/components/shared/ProductCard/ProductCard";
import styles from './BestOffers.module.css';
import Arrow from "@/components/ui/Arrow/Arrow";

export default function BestOffers(props?: any) {
  const products = [
    { model_url: '', name: 'Aurora', variants: [{ old_price: '121000', price: '104000' }] },
    { model_url: '', name: 'Egor', variants: [{ old_price: '121000', price: '104000' }] },
    { model_url: '', name: 'Bolat', variants: [{ old_price: '121000', price: '104000' }] },
    { model_url: '', name: 'Rasul', variants: [{ old_price: '121000', price: '104000' }] },
    { model_url: '', name: 'Assyl', variants: [{ old_price: '121000', price: '104000' }] },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleCards = 3;
  const maxIndex = products.length - visibleCards;

  const scroll = (direction: "left" | "right") => {
    if (direction === "left") {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    } else {
      setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
    }
  };

  return (
    <section className={[styles['best-offers'], props?.isListing ? styles['best-offers_gray'] : ''].join(" ")}>
      <div className={styles['best-offers__inner']}>
        <h2 className={[styles['best-offers__title'], 'title', '_container'].join(" ")}>Лучшие предложения</h2>

        <div className={[styles['best-offers__main'], '_container-bigger'].join(" ")}>
          <Arrow onClick={() => scroll("left")} disabled={currentIndex === 0} />

          <div className={styles['best-offers__viewport']}>
            <div className={styles['best-offers__list']}>
              {products.slice(currentIndex, currentIndex + visibleCards).map((product, i) => (
                <ProductCard
                  key={i}
                  imageSrc={product.model_url || "/products/chair1.png"}
                  title={product.name}
                  oldPrice={product.variants[0]?.old_price || ""}
                  newPrice={product.variants[0]?.price}
                />
              ))}
            </div>
          </div>

          <Arrow direction="right" onClick={() => scroll("right")} disabled={currentIndex === maxIndex} />
        </div>
      </div>
    </section>
  );
}
