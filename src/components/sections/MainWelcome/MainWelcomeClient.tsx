"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import styles from "./MainWelcome.module.css";
import ButtonPrimary from "../../ui/ButtonPrimary/ButtonPrimary.jsx";
import BonusValue from "../../ui/BonusValue/BonusValue.jsx";
import Link from "next/link";
import Image from "next/image";

// Расширенный тип для продуктов главной страницы
interface WelcomeProduct {
  id: number;
  name: string;
  slug: string;
  image?: string;
  description?: string;
  is_popular?: boolean;
  is_new?: boolean;
  currency?: string;
  bonus?: number;
  variants?: Array<{
    final_price?: number;
  }>;
}

interface MainWelcomeClientProps {
  products: WelcomeProduct[];
}

export default function MainWelcomeClient({
  products,
}: MainWelcomeClientProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Слайдшоу
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (products.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % products.length);
      }, 7000);
    }
  }, [products.length]);

  const resetTimer = useCallback(() => {
    startTimer();
  }, [startTimer]);

  useEffect(() => {
    startTimer();

    // Предзагружаем следующие изображения для плавности
    const preloadNextImages = () => {
      const nextIndex = (currentIndex + 1) % products.length;
      const prevIndex = (currentIndex - 1 + products.length) % products.length;

      [nextIndex, prevIndex].forEach((index) => {
        if (products[index]?.image) {
          const img = new window.Image();
          img.src = products[index].image!;
        }
      });
    };

    preloadNextImages();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startTimer, currentIndex, products]);

  // Мемоизируем текущий продукт
  const currentProduct = useMemo(
    () => products[currentIndex],
    [products, currentIndex]
  );

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const minSwipeDistance = 50;

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) {
        setCurrentIndex((prev) => (prev + 1) % products.length);
      } else {
        setCurrentIndex(
          (prev) => (prev - 1 + products.length) % products.length
        );
      }
      resetTimer();
    }
  }, [products.length, resetTimer]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
    resetTimer();
  }, [products.length, resetTimer]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === products.length - 1 ? 0 : prevIndex + 1
    );
    resetTimer();
  }, [products.length, resetTimer]);

  // Мемоизируем навигационные точки
  const navigationDots = useMemo(
    () =>
      products.map((_, i) => (
        <li
          key={i}
          className={[
            styles.items__elem,
            i === currentIndex ? styles.items__elem_selected : "",
          ].join(" ")}
        />
      )),
    [products.length, currentIndex]
  );

  // Мемоизируем цену
  const priceDisplay = useMemo(() => {
    if (typeof currentProduct?.variants?.[0]?.final_price === "number") {
      return `${new Intl.NumberFormat("ru-RU").format(
        currentProduct.variants[0].final_price
      )} ${currentProduct?.currency || ""}`;
    }
    return "Нет в наличии";
  }, [currentProduct?.variants, currentProduct?.currency]);

  // Мемоизируем заголовок продукта
  const productTitle = useMemo(() => {
    const name = currentProduct?.name || "...";
    const titleClass = [
      styles.desc__title,
      name.length > 20 && name.length <= 40
        ? styles.desc__title_normal
        : styles.desc__title_small,
    ].join(" ");

    return { name, titleClass };
  }, [currentProduct?.name]);

  if (!products.length) {
    return <div>Загрузка...</div>;
  }

  return (
    <div
      className={styles.welcome__inner}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className={styles.welcome__img}>
        <div className={styles.imageWrapper}>
          {currentProduct?.image && (
            <Image
              src={currentProduct.image}
              alt={currentProduct.name || "Фото"}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: "contain" }}
              priority={currentIndex === 0}
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjZjVmNWY1Ii8+Cjwvc3ZnPgo="
            />
          )}
        </div>
      </div>

      <div className={[styles.welcome__description, styles.desc].join(" ")}>
        <div className={["_container-bigger", styles.desc__inner].join(" ")}>
          <div className={styles.desc__content}>
            <div className={styles.desc__ticket}>
              <div className={styles["desc__ticket-text"]}>
                {currentProduct?.is_popular
                  ? "Популярно"
                  : currentProduct?.is_new
                  ? "Новинка"
                  : ""}
              </div>
            </div>
            <h1 className={productTitle.titleClass}>{productTitle.name}</h1>
            <p className={styles.desc__text}>
              {currentProduct?.description || "..."}
            </p>

            <div className={styles.desc__price}>
              <div className={styles.price__value}>{priceDisplay}</div>
              {currentProduct?.bonus !== 0.0 && (
                <BonusValue bonusVal={currentProduct?.bonus} />
              )}
            </div>

            <Link
              href={`/catalog/products/${currentProduct?.slug}`}
              prefetch={true}
              className={styles.productLink}
            >
              <ButtonPrimary isWhite={true} onClick={() => {}}>
                Перейти
              </ButtonPrimary>
            </Link>
          </div>
          <div className={styles["welcome__items-wrapper"]}>
            <ul className={[styles.welcome__items, styles.items].join(" ")}>
              {navigationDots}
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.navigation}>
        <button
          onClick={handlePrev}
          className={styles.arrowLeft}
          aria-label="Предыдущий слайд"
          type="button"
        >
          ‹
        </button>
        <button
          onClick={handleNext}
          className={styles.arrowRight}
          aria-label="Следующий слайд"
          type="button"
        >
          ›
        </button>
      </div>
    </div>
  );
}
