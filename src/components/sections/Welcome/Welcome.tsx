"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./Welcome.module.css";
import ProductScene from "@/components/explosion/ProductScene";
import WelcomePrice from "@/components/shared/WelcomePrice/WelcomePrice";
import ColorConfigure from "@/components/shared/ColorConfigure/ColorConfigure";
import ButtonPrimary from '@/components/ui/ButtonPrimary/ButtonPrimary';
import Arrow from '@/components/ui/Arrow/Arrow';
import { Product, Variant, VariantOption } from "@/types/product";
import { useSearchParams } from 'next/navigation';

import Image from "next/image";


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

  // Состояние для модального окна с фото
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<string | null>(null);

  const handleImageClick = (imgUrl: string) => {
    setModalImage(imgUrl);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalImage(null);
  };

  // Для листания фото в модалке
  const handleModalPrev = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) e.stopPropagation();
    if (!modalImage) return;
    const idx = galleryImages.findIndex(img => img === modalImage);
    const prevIdx = (idx - 1 + galleryImages.length) % galleryImages.length;
    setModalImage(galleryImages[prevIdx]);
  };

  const handleModalNext = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) e.stopPropagation();
    if (!modalImage) return;
    const idx = galleryImages.findIndex(img => img === modalImage);
    const nextIdx = (idx + 1) % galleryImages.length;
    setModalImage(galleryImages[nextIdx]);
  };

  // Для свайпа в модалке на мобильных
  const modalTouchStartX = useRef<number | null>(null);
  const modalTouchEndX = useRef<number | null>(null);
  const minModalSwipeDistance = 50;

  function onModalTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    modalTouchEndX.current = null;
    modalTouchStartX.current = e.targetTouches[0].clientX;
  }

  function onModalTouchMove(e: React.TouchEvent<HTMLDivElement>) {
    modalTouchEndX.current = e.targetTouches[0].clientX;
  }

  function onModalTouchEnd(e: React.TouchEvent<HTMLDivElement>) {
    if (modalTouchStartX.current === null || modalTouchEndX.current === null) return;
    const distance = modalTouchStartX.current - modalTouchEndX.current;
    if (Math.abs(distance) > minModalSwipeDistance) {
      if (distance > 0) {
        // свайп влево — следующее фото
        handleModalNext();
      } else {
        // свайп вправо — предыдущее фото
        handleModalPrev();
      }
    }
  }

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

  

    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);
    // Добавляем обработчики свайпа:
    const minSwipeDistance = 50; // минимальное расстояние для срабатывания свайпа
  
    function onTouchStart(e: React.TouchEvent<HTMLDivElement>) {
      touchEndX.current = null; // сброс
      touchStartX.current = e.targetTouches[0].clientX;
    }
  
    function onTouchMove(e: React.TouchEvent<HTMLDivElement>) {
      touchEndX.current = e.targetTouches[0].clientX;
    }
  
    function onTouchEnd() {
      if (touchStartX.current === null || touchEndX.current === null) return;
  
      const distance = touchStartX.current - touchEndX.current;
      if (Math.abs(distance) > minSwipeDistance) {
        if (distance > 0) {
          // свайп влево — следующий слайд
          setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
        } else {
          // свайп вправо — предыдущий слайд
          setCurrentImageIndex(
            (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
          );
        }
      }
    }


  return (
    <main className={styles.welcome}>
      <div className={styles.welcome__product} >
        <div className={`${styles.welcome__inner} _container-bigger`} onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd} > 
          {/* Стрелка влево */}
          {selectedView === "gallery" && !isMobile && (
            <Arrow onClick={handlePrevImage} />
          )}

          <div className={`${styles.welcome__container} _container`} >
            {selectedView === "gallery" && (
              <>
                {titleBlock}
                <div className={`${styles.welcome__img} _img ${styles.sliderInner}`} >
                  <Image
                    className="welcome__item"
                    src={galleryImages[currentImageIndex]}
                    alt={`gallery-image-${currentImageIndex}`}
                    width={500}
                    height={500}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleImageClick(galleryImages[currentImageIndex])}
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
              {colorsAndMaterials.map((item, idx) => {
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
              {/* <ButtonPrimary onClick={scrollToConfigurator}>Конфигуратор</ButtonPrimary> */}
            </div>

            {selectedVariant ? (
              <WelcomePrice product={product} variant={selectedVariant} />
            ) : (
              <div className="message__choose-color">
  Выберите цвет, чтобы увидеть цену
</div>

            )}
          </div>
        </div>
      </div>
      {/* Модальное окно для просмотра фото */}
      {isModalOpen && modalImage && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.85)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          onClick={handleModalClose}
          onTouchStart={isMobile ? onModalTouchStart : undefined}
          onTouchMove={isMobile ? onModalTouchMove : undefined}
          onTouchEnd={isMobile ? onModalTouchEnd : undefined}
        >
          {/* Кнопки только на десктопе */}
          {!isMobile && (
            <>
              <button
                style={{
                  position: 'absolute',
                  left: 32,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 10001,
                  background: 'rgba(0,0,0,0.7)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '50%',
                  width: 40,
                  height: 40,
                  fontSize: 28,
                  cursor: 'pointer',
                  display: galleryImages.length > 1 ? 'block' : 'none',
                }}
                onClick={handleModalPrev}
                aria-label="Предыдущее фото"
              >
                &#8592;
              </button>
              <button
                style={{
                  position: 'absolute',
                  right: 32,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 10001,
                  background: 'rgba(0,0,0,0.7)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '50%',
                  width: 40,
                  height: 40,
                  fontSize: 28,
                  cursor: 'pointer',
                  display: galleryImages.length > 1 ? 'block' : 'none',
                }}
                onClick={handleModalNext}
                aria-label="Следующее фото"
              >
                &#8594;
              </button>
            </>
          )}
          <img
            src={modalImage}
            alt="full-image"
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              borderRadius: '12px',
              boxShadow: '0 0 32px 0 rgba(0,0,0,0.5)',
              background: '#fff',
            }}
            onClick={e => e.stopPropagation()}
          />
          <button
            style={{
              position: 'fixed',
              top: 24,
              right: 32,
              zIndex: 10001,
              background: 'rgba(0,0,0,0.7)',
              color: '#fff',
              border: 'none',
              borderRadius: '50%',
              width: 40,
              height: 40,
              fontSize: 28,
              cursor: 'pointer',
            }}
            onClick={handleModalClose}
            aria-label="Закрыть"
          >
            ×
          </button>
        </div>
      )}
    </main>
  );
}
