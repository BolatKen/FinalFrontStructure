"use client";

import ProductCard from "@/components/ui/productcart";
import { useRef } from "react";

const products = [
  {
    imageSrc: "/products/chair1.jpg",
    title: "Aurora",
    oldPrice: "121000",
    newPrice: "104000",
    bonuses: "5200",
    variants: [
      { color: "#D57A42" },
      { color: "#7E7672" },
      { color: "#EDEDED" },
    ],
  },
  {
    imageSrc: "/products/chair1.jpg",
    title: "Aurora",
    oldPrice: "149000",
    newPrice: "136000",
    bonuses: "6800",
    variants: [
      { color: "#D57A42" },
      { color: "#7E7672" },
      { color: "#EDEDED" },
    ],
  },
  {
    imageSrc: "/products/chair1.jpg",
    title: "Aurora",
    newPrice: "149000",
    bonuses: "7450",
    variants: [
      { color: "#D57A42" },
      { color: "#7E7672" },
      { color: "#EDEDED" },
    ],
  },
];

export default function BestOffers() {
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
    <section className="best-offers">
      <h2 className="best-offers__title">Лучшие предложения</h2>

      {/* Scroll buttons */}
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

      {/* Scrollable row */}
      <div ref={containerRef} className="best-offers__list">
        {products.map((product, i) => (
          <ProductCard
            key={i}
            name={product.title}
            price={parseInt(product.newPrice)}
            oldPrice={product.oldPrice ? parseInt(product.oldPrice) : undefined}
            bonuses={parseInt(product.bonuses)}
            imageUrl={product.imageSrc}
            colorOptions={product.variants.map((v, vi) => ({
              color: v.color,
              active: vi === 0,
            }))}
          />
        ))}
      </div>
    </section>
  );
}
