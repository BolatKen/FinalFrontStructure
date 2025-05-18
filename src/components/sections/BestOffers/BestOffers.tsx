
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

import styles from './BestOffers.module.css';
import { useEffect, useState } from "react";
import { ProductShort } from "@/types/product";
import Arrow from "@/components/ui/Arrow/Arrow";
import ProductCard from "@/components/shared/ProductCard/ProductCard";

export default function BestOffers(
  { products, isListing }: { products: ProductShort[], isListing: boolean },
) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const visibleCards = 3;
  const maxIndex = products.length - visibleCards;

  const scroll = (direction: "left" | "right") => {
    if (direction === "left") {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    } else {
      setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    handleResize(); // Чтобы при первой загрузке тоже узнать
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className={[
      styles['best-offers'],
      (isListing ? styles['best-offers_gray'] : '')].join(" ")
    }>
      <section className={[
        styles['best-offers'],
        isListing ? styles['best-offers_gray'] : ''].join(" ")
      }>
        <div className={styles['best-offers__inner']}>
          <h2 className={[styles['best-offers__title'], 'title', '_container'].join(" ")}>
            Лучшие предложения
          </h2>
          <div className={[styles['best-offers__main'], '_container-bigger'].join(" ")}>

            {/* Стрелки только на десктопе */}
            {!isMobile && (
              <Arrow onClick={() => scroll("left")} disabled={currentIndex === 0} />
            )}

            <div className={styles['best-offers__viewport']}>
              <div className={styles['best-offers__list']}>

                {/* На мобилке — все карточки сразу, на десктопе — slice */}
                {(isMobile ? products : products.slice(
                  currentIndex, currentIndex + visibleCards
                )).map((product, i) => (
                  <ProductCard
                    key={i}
                    imageSrc={product.images[0].image}
                    title={product.name}
                    oldPrice={product.old_price}
                    newPrice={product.new_price}
                    colorData={product.material_colors}
                  />
                ))}

              </div>
            </div>

            {!isMobile && (
              <Arrow direction="right" onClick={
                () => scroll("right")} disabled={currentIndex === maxIndex
                } />
            )}

          </div>
        </div>
      </section>
    </section>
  );
}
