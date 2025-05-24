"use client";
import React, { useState, useEffect } from "react";
import styles from "./Welcome.module.css";
import ProductScene from "@/components/explosion/ProductScene";
import WelcomePrice from "@/components/shared/WelcomePrice/WelcomePrice";
import ColorConfigure from "@/components/shared/ColorConfigure/ColorConfigure";
import ButtonPrimary from '@/components/ui/ButtonPrimary/ButtonPrimary';
import Arrow from '@/components/ui/Arrow/Arrow';
import { Product, Variant, VariantOption } from "@/types/product";
import { useSearchParams } from 'next/navigation';


interface WelcomeProps {
  product: Product;
  scrollToConfigurator: () => void;
}

export default function Welcome({ product, scrollToConfigurator }: WelcomeProps) {
  const colorsAndMaterials = product.variant_options_values;

const titleBlock =
  product.name.length > 13 ? (
    <div className={`${styles.welcome__title} ${styles.welcome__title_long}`}>
      {product.name.split(",").map((line, idx) => (
        <div key={idx}>{line.trim()}</div>
      ))}
    </div>
  ) : (
    <div className={`${styles.welcome__title} ${styles.welcome__title_short}`}>
      {product.name}
    </div>
  );

  const searchParams = useSearchParams();
  const selectedColorId = parseInt(searchParams.get('selectedColorId') || '0', 10);
  const [selectedView, setSelectedView] = useState<"gallery" | "3d">("gallery");
  const [selectedColor, setSelectedColor] = useState<number | null>(selectedColorId);

  const initialVariant = product.variants.find(variant =>
    variant.options.some(option => option.color.id === selectedColorId)
  );

  const [selectedVariant, setSelectedVariant] = useState<Variant | undefined>(initialVariant);
  const [selectedOption, setSelectedOption] = useState<VariantOption | undefined>();

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

  useEffect(() => {
    if (!product?.variants || selectedColor == null) return;

    const matched = product.variants.find(variant =>
      variant.options.some(option => option.color.id === selectedColor)
    );

    if (matched) {
      setSelectedVariant(matched);

      const option = matched.options.find(opt => opt.color.id === selectedColor);
      setSelectedOption(option);
    }
  }, [selectedColor, product?.variants]);

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
            {selectedView === "3d" && (<>{titleBlock}<ProductScene modelUrl={product.model_url} option={selectedOption} /></>)}
            
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
              {colorsAndMaterials.slice(0, 2).map((item, idx) => {
                const foundColor = item.colors.find((color) => color.id === selectedColorId);

                return (
                  <ColorConfigure
                    key={idx}
                    configureTitle={item.part.name}
                    colorData={item.colors}
                    initialSelected={foundColor?.id ?? null}
                    onColorSelect={(colorId: number) => setSelectedColor(colorId)}
                  />
                );
              })}
              <ButtonPrimary onClick={scrollToConfigurator}>Конфигуратор</ButtonPrimary>
            </div>

            {selectedVariant ? (
              <WelcomePrice product={product} variant={selectedVariant} />
            ) : (
              <div>Выберите цвет, чтобы увидеть цену</div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
