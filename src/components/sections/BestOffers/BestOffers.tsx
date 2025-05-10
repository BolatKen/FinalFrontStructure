// "use client";

// import ProductCard from "@/components/shared/ProductCart/ProductCard";
// import { useRef } from "react";

// const products = [
//   {
//     imageSrc: "/products/chair1.png",
//     title: "Aurora",
//     oldPrice: "121 000 ТГ",
//     newPrice: "104 000 ТГ",
//     bonus: "5 200",
//   },
//   {
//     imageSrc: "/products/chair1.png",
//     title: "Aurora",
//     oldPrice: "149 000 ТГ",
//     newPrice: "136 000 ТГ",
//     bonus: "6 800",
//   },
//   {
//     imageSrc: "/products/chair1.png",
//     title: "Aurora",
//     oldPrice: "",
//     newPrice: "149 000 ТГ",
//     bonus: "7 450",
//   },
// ];

// export default function BestOffers() {
//   const containerRef = useRef<HTMLDivElement>(null);

//   const scroll = (direction: "left" | "right") => {
//     if (containerRef.current) {
//       containerRef.current.scrollBy({
//         left: direction === "left" ? -360 : 360,
//         behavior: "smooth",
//       });
//     }
//   };

//   return (
//     <section className="best-offers _container">
//       <div className="best-offers__inner">
//         <h2 className="best-offers__title">Лучшие предложения</h2>

//         <button
//           onClick={() => scroll("left")}
//           className="best-offers__scroll-btn best-offers__scroll-btn--left"
//         >
//           <img src="/core/arrow.svg" alt="arrow-left" />
//         </button>
//         <button
//           onClick={() => scroll("right")}
//           className="best-offers__scroll-btn best-offers__scroll-btn--right"
//         >
//           <img
//             src="/core/arrow.svg"
//             alt="arrow-right"
//             style={{ transform: "rotate(180deg)" }}
//           />
//         </button>

//         <div ref={containerRef} className="best-offers__list">
//           {products.map((product, i) => (
//             <ProductCard
//               key={i}
//               imageSrc={product.imageSrc}
//               title={product.title}
//               oldPrice={product.oldPrice}
//               newPrice={product.newPrice}
//               bonus={product.bonus}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import { useRef } from "react";
import ProductCard from "@/components/shared/ProductCart/ProductCard";

interface VariantOption {
  id: number;
  option_display: {
    id: number;
    option_type_display: string;
    value: string;
    code: string;
  };
}

interface Variant {
  id: number;
  sku: string;
  price: string;
  old_price?: string | null;
  currency: string;
  variant_options: VariantOption[];
}

interface Product {
  id: number;
  name: string;
  description: string;
  slug: string;
  category: string;
  options: any[];
  variants: Variant[];
  model_url?: string;
  base_sku?: string;
}

interface BestOffersProps {
  products: Product[];
}

export default function BestOffers({ products }: BestOffersProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: direction === "left" ? -360 : 360,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="best-offers _container">
      <div className="best-offers__inner">
        <h2 className="best-offers__title">Лучшие предложения</h2>

        <button
          onClick={() => scroll("left")}
          className="best-offers__scroll-btn best-offers__scroll-btn--left"
        >
          <img src="/core/arrow.svg" alt="arrow-left" />
        </button>
        <button
          onClick={() => scroll("right")}
          className="best-offers__scroll-btn best-offers__scroll-btn--right"
        >
          <img
            src="/core/arrow.svg"
            alt="arrow-right"
            style={{ transform: "rotate(180deg)" }}
          />
        </button>

        <div ref={containerRef} className="best-offers__list">
          {products.map((product, i) => (
            <ProductCard
              key={i}
              imageSrc={product.model_url || "/products/chair1.png"} // если нет картинки
              title={product.name}
              oldPrice={product.variants[0]?.old_price || ""}
              newPrice={product.variants[0]?.price}
              bonus={calculateBonus(product.variants[0]?.price)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const calculateBonus = (price: string) => {
  const numPrice = parseFloat(price);
  return Math.round(numPrice * 0.05).toString();
};
