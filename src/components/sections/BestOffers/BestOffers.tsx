"use client";

import styles from './BestOffers.module.css';
import { useEffect, useState } from "react";
import { ProductShort } from "@/types/product";
import Arrow from "@/components/ui/Arrow/Arrow";
import ProductCard from "@/components/shared/ProductCard/ProductCard";

export default function BestOffers(
  { products = [], isListing }: { products?: ProductShort[], isListing?: boolean },
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
                )).map((item, idx) => (
                  <ProductCard
                    key={idx}
                    images={item.images}
                    slug={item.slug}
                    name={item.name}
                    variants={item.variants}
                    sub_categories={item.sub_categories}
                    material_colors={item.material_colors}
                    id={item.id}
                    tags={item.tags} />
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
