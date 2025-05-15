"use client";
import React, { useState, useEffect } from "react";
import styles from "./Welcome.module.css";
import ColorConfigure from "../../shared/ColorConfigure/ColorConfigure";
import ButtonPrimary from '../../ui/ButtonPrimary/ButtonPrimary';
import Arrow from '../../ui/Arrow/Arrow';
import ButtonOrange from '../../ui/ButtonOrange/ButtonOrange';
import ProductScene from "@/components/explosion/ProductScene";
import BonusValue from '../../ui/BonusValue/BonusValue';
import { Product } from "@/types/product";

interface WelcomeProps {
  product: Product;
}

export default function Welcome({ product }: WelcomeProps) {
  const mainVariant = product;
  let configurableParts: {
    configureTitle: string;
    colorData: {
      color: string;
      code: string;
      imageUrl: string;
      altText: string;
      isSelected: boolean;
    }[];
  }[] = [];

  if (product.materials && product.materials.length > 0) {
    product.materials[0].parts.map((part) => {
      configurableParts.push({
        configureTitle: "Цвет и материал",
        colorData: (part.colors || []).slice(0, 3).map((color) => {
          return {
            color: color.name,
            code: color.hex_code,
            imageUrl: color.image,
            altText: color.name,
            isSelected: color.id === (part.colors?.[0]?.id || 0) ? true : false,
          }
        })
      });
    })
  }

  if (product.selection_parts && product.selection_parts.length > 0) {
    product.selection_parts.map((part) => {
      configurableParts.push({
        configureTitle: part.name,
        colorData: (part.colors || []).map((color) => {
          return {
            color: color.name,
            code: color.hex_code,
            imageUrl: color.image,
            altText: color.name,
            isSelected: color.id === (part.colors?.[0]?.id || 0) ? true : false,
          }
        })
      });
    })
  }

  const colorsAndMaterials = configurableParts;

  const titleBlock =
    product.name.length > 13 ? (
      <div className={`${styles.welcome__title} ${styles.welcome__title_long}`}>
        {product.name.split(",")[0]}
      </div>
    ) : (
      <div
        className={`${styles.welcome__title} ${styles.welcome__title_short}`}
      >
        {product.name}
      </div>
    );

  const [selectedView, setSelectedView] = useState<"gallery" | "3d">("gallery");
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const galleryImages = product.images && product.images.length > 0
    ? product.images.map((image) => image.image)
    : [product.model_url || "/core/default.png"];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  const handleSelectImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <main className={styles.welcome}>
      <div className={styles.welcome__product}>
        <div className={`${styles.welcome__inner} _container-bigger`}>
          {/* Стрелка влево */}
          {selectedView === "gallery" && !isMobile && (
            <Arrow onClick={handlePrevImage} />
          )}

          <div className={`${styles.welcome__container} _container`}>
            {selectedView === "gallery" && (
              <>
                {titleBlock}
                <div className={[styles.welcome__img, '_img'].join(" ")}>
                  <img
                    className="welcome__item"
                    src={galleryImages[currentImageIndex]}
                    alt={`gallery-image-${currentImageIndex}`}
                  />
                </div>
              </>
            )}
            {selectedView === "3d" && <ProductScene modelUrl={product.model_url} color={selectedColor} />}

            <div
              className={`${styles.welcome__info} ${styles.info} ${selectedView === "3d" ? styles.welcome__info_margin : ""
                }`}
            >
              <div className={`${styles.info__option} ${styles.option}`}>
                <div
                  className={`${styles.option__item} ${selectedView === "gallery"
                    ? styles.option__item_selected
                    : ""
                    }`}
                  onClick={() => setSelectedView("gallery")}
                >
                  Галерея
                </div>
                <div
                  className={`${styles.option__item} ${selectedView === "3d" ? styles.option__item_selected : ""
                    }`}
                  onClick={() => setSelectedView("3d")}
                >
                  Смотреть в 3D
                </div>
              </div>

              {/* Кружочки выбора */}
              {selectedView === "gallery" && (
                <div className={styles.info__items}>
                  {galleryImages.map((_, i) => (
                    <div
                      key={i}
                      className={`${styles.info__item} ${i === currentImageIndex
                        ? styles.info__item_selected
                        : ""
                        }`}
                      onClick={() => handleSelectImage(i)}
                    />
                  ))}
                </div>
              )}
              {selectedView === "3d" && (
                <div className={styles.info__items}>
                  <div
                    className={`${styles.info__item} ${styles.info__item_selected} ${styles.info__item_width}`}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Стрелка вправо */}
          {selectedView === "gallery" && !isMobile && (
            <Arrow direction="right" onClick={handleNextImage} />
          )}
        </div>
      </div>

      {/* Блок цены и конфига */}
      <div className={styles.welcome__price}>
        <div className={`_container ${styles.configure}`}>
          <div className={styles.configure__inner}>
            <div className={styles.configure__material}>
              {colorsAndMaterials.map((item, idx) => (
                <ColorConfigure
                  key={idx}
                  configureTitle={item.configureTitle}
                  colorData={item.colorData}
                  onColorSelect={(color: string) => setSelectedColor(color)}
                />
              ))}
              <ButtonPrimary onClick={null}>Конфигуратор</ButtonPrimary>
            </div>

            <div className={`${styles.configure__price} ${styles.price}`}>
              <div className={styles.price__item}>
                <div className={styles.configure__title}>Цена</div>
                <div className={styles.price__text}>
                  {mainVariant.variants[0].base_price} {mainVariant.variants[0].currency}
                </div>
                <BonusValue bonusVal={"12 000"} />
              </div>
              <div className={`${styles.configure__btn} ${styles.btn}`}>
                <ButtonOrange
                  onClick={() => {
                    const storedCart = localStorage.getItem("cartItems");
                    const cartItems = storedCart ? JSON.parse(storedCart) : [];

                    const newItem = {
                      id: product.id,
                      name: product.name,
                      price: product.variants[0].base_price,
                      currency: product.variants[0].currency,
                      quantity: 1,
                    };

                    const existingItemIndex = cartItems.findIndex(
                      (item: any) => item.id === newItem.id
                    );

                    if (existingItemIndex !== -1) {
                      cartItems[existingItemIndex].quantity += 1;
                    } else {
                      cartItems.push(newItem);
                    }

                    localStorage.setItem(
                      "cartItems",
                      JSON.stringify(cartItems)
                    );
                    window.dispatchEvent(new Event("storage"));
                  }}
                  type="button"
                >
                  Купить
                </ButtonOrange>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
