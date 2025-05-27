"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./MainWelcome.module.css";
import ButtonPrimary from "../../ui/ButtonPrimary/ButtonPrimary.jsx";
import BonusValue from "../../ui/BonusValue/BonusValue.jsx";
import Header from "@/components/layout/Header/Header";
import GeneralInfo from "../../shared/GeneralInfo/GeneralInfo.jsx";
import GeneralInfoRightUpper from "../../shared/GeneralInfoRightUpper/GeneralInfoRightUpper.jsx";
import GeneralInfoRightDown from "../../shared/GeneralInfoRightDown/GeneralInfoRightDown.jsx";
import GeneralInfoLeftDown from "../../shared/GeneralInfoLeftDown/GeneralInfoLeftDown.jsx";
import InfoList from "../../shared/InfoList/InfoList";
import ProductCatalog from "@/components/shared/ProductCatalog/ProductCatalog";
import OtherCatalog from "../../shared/OtherCatalog/OtherCatalog";
import { getWelcomeCategories } from "@/services/category.service";
import { useRouter } from "next/navigation";

import Image from "next/image";

export default function MainWelcome() {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const API_URL = process.env.NEXT_PUBLIC_API_DOMAIN;
  useEffect(() => {
    fetch(`${API_URL}/catalog/home/`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        }
      })
      .catch((err) => console.error("Ошибка загрузки продуктов:", err));
  }, []);

  // Слайдшоу
  useEffect(() => {
    if (products.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % products.length);
      }, 7000); // каждые 7 секунд

      return () => clearInterval(interval);
    }
  }, [products]);

  // Категорий
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getWelcomeCategories();
      setCategories(data);
    };
    fetchData();
  }, []);

  const currentProduct = products[currentIndex];
  const rightContent = <GeneralInfoRightUpper />;
  const rightContentDown = <GeneralInfoRightDown />;
  const leftContentDown = <GeneralInfoLeftDown />;

  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  // Добавляем обработчики свайпа:
  const minSwipeDistance = 50; // минимальное расстояние для срабатывания свайпа

  function onTouchStart(e) {
    touchEndX.current = null; // сброс
    touchStartX.current = e.targetTouches[0].clientX;
  }

  function onTouchMove(e) {
    touchEndX.current = e.targetTouches[0].clientX;
  }

  function onTouchEnd() {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) {
        // свайп влево — следующий слайд
        setCurrentIndex((prev) => (prev + 1) % products.length);
      } else {
        // свайп вправо — предыдущий слайд
        setCurrentIndex(
          (prev) => (prev - 1 + products.length) % products.length
        );
      }
    }
  }





  const handlePrev = () => {
  setCurrentIndex((prevIndex) =>
    prevIndex === 0 ? products.length - 1 : prevIndex - 1
  );
};

const handleNext = () => {
  setCurrentIndex((prevIndex) =>
    prevIndex === products.length - 1 ? 0 : prevIndex + 1
  );
};

// useEffect(() => {
//   setCurrentProduct(products[currentIndex]);
// }, [currentIndex, products]);

  return (
    <>
      <section
        className={[styles.welcome].join(" ")}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className={styles.desktop}>
          <div className={[styles.welcome__img, "_img"].join(" ")}>
            <div key={currentProduct?.image} className={styles.imageWrapper}>
              {currentProduct?.image && (
                <Image src={currentProduct.image} alt="Фото" fill/>
              )}
            </div>
          </div>
        </div>

        <div className={styles.mobile}>
          <div className={styles.slider}>
            <div
              className={styles.sliderInner}
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {products.map((product, i) => (
                <div
                  className={[styles.slide, styles.welcome__img, "_img"].join(
                    " "
                  )}
                  key={i}
                >
                  {product?.image && <Image src={product.image} alt="Фото" fill/>}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* <div className={[styles.welcome__img, '_img'].join(' ')}>
                    {currentProduct?.image && (
                        <img src={currentProduct.image} alt="Фото" />
                    )}
                </div> */}
        <Header isBlur={false} />
        <div className={styles.welcome__inner}>
          <div className={[styles.welcome__description, styles.desc].join(" ")}>
            <div
              className={["_container-bigger", styles.desc__inner].join(" ")}
            >
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
                <h1
                  className={[
                    styles.desc__title,
                    currentProduct?.name.length > 20 &&
                    currentProduct?.name.length <= 40
                      ? styles.desc__title_normal
                      : styles.desc__title_small,
                  ].join(" ")}
                >
                  {currentProduct?.name || "..."}
                </h1>
                <p className={styles.desc__text}>
                  {currentProduct?.description || "..."}
                </p>

                <div className={styles.desc__price}>
                  <div className={styles.price__value}>
{typeof currentProduct?.variants?.[0]?.final_price === "number"
  ? `${new Intl.NumberFormat("ru-RU").format(currentProduct.variants[0].final_price)} ${currentProduct?.currency || ""}`
  : "Нет в наличии"}


                  </div>
                  {currentProduct?.bonus !== 0.0 ? (
                    <BonusValue bonusVal={currentProduct?.bonus} />
                  ) : (
                    ""
                  )}
                </div>

                <ButtonPrimary
                  isWhite={true}
                  children={"Перейти"}
                  onClick={() => {
                    if (!currentProduct?.slug) return;
                    router.push(`/catalog/products/${currentProduct.slug}`);
                  }}
                />
              </div>
              <div className={styles["welcome__items-wrapper"]}>
                <ul className={[styles.welcome__items, styles.items].join(" ")}>
                  {products.map((_, i) => (
                    <li
                      key={i}
                      className={[
                        styles.items__elem,
                        i === currentIndex ? styles.items__elem_selected : "",
                      ].join(" ")}
                    ></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.navigation}>
          
  <button onClick={handlePrev} className={styles.arrowLeft}>‹</button>
  <button onClick={handleNext} className={styles.arrowRight}>›</button>
</div>
      </section>
      <GeneralInfo contentRight={rightContent} />
      <InfoList />
      {categories.map((item, key) =>
        item.is_full_format ? (
          <ProductCatalog
            key={`catalog-${item.slug || key}`}
            title={item.name}
            slug={item.slug}
            tags={item.subcategories}
            products={item.products}
          />
        ) : (
          <OtherCatalog key={`other-${item.slug || key}`} />
        )
      )}
      <GeneralInfo
        contentLeft={leftContentDown}
        contentRight={rightContentDown}
        isLight={true}
      />
    </>
  );
}

export { default as MainWelcome } from "./MainWelcome.jsx";
