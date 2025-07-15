"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./Welcome.module.css";
import ProductScene from "@/components/explosion/ProductScene";
import WelcomePrice from "@/components/shared/WelcomePrice/WelcomePrice";
import Arrow from '@/components/ui/Arrow/Arrow';
import { Product } from "@/types/product";
import Image from "next/image";

interface WelcomeProps {
  product: Product;
  scrollToConfigurator: () => void;
}

export default function Welcome({ product }: WelcomeProps) {
  // Форматирование заголовка
  const titleBlock = product.name.length > 13 ? (
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

  // Состояния
  const [selectedView, setSelectedView] = useState<"gallery" | "3d">("gallery");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [surcharges, setSurcharges] = useState<Array<{name: string, price: number}>>([]);
  // Галерея изображений
  const galleryImages = product.images?.length 
    ? product.images.map(img => img.image) 
    : [product.model_url || "/default.png"];

  // Обработчики изображений
  const handlePrevImage = () => setCurrentImageIndex(prev => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  const handleNextImage = () => setCurrentImageIndex(prev => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  const handleSelectImage = (index: number) => setCurrentImageIndex(index);

  // Модальное окно
  const handleImageClick = (imgUrl: string) => {
    setModalImage(imgUrl);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalImage(null);
  };

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

  // Свайп для мобильных
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const minSwipeDistance = 50;

  function onTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    touchEndX.current = null;
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
        handleNextImage();
      } else {
        handlePrevImage();
      }
    }
  }

  // Определение мобильного устройства
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <main className={styles.welcome}>
      {/* Блок продукта */}
      <div className={styles.welcome__product}>
        <div 
          className={`${styles.welcome__inner} _container-bigger`}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Стрелка влево */}
          {selectedView === "gallery" && !isMobile && (
            <Arrow onClick={handlePrevImage} />
          )}

          <div className={`${styles.welcome__container} _container`}>
            {selectedView === "gallery" && (
              <>
                {titleBlock}
                <div className={`${styles.welcome__img} _img ${styles.sliderInner}`}>
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
            
            {selectedView === "3d" && (
              <>
                {titleBlock}
                <ProductScene modelUrl={product.model_url} />
              </>
            )}
            
            <div className={`${styles.welcome__info} ${styles.info} ${selectedView === "3d" ? styles.welcome__info_margin : ""}`}>
              <div className={`${styles.info__option} ${styles.option}`}>
                <div
                  className={`${styles.option__item} ${selectedView === "gallery" ? styles.option__item_selected : ""}`}
                  onClick={() => setSelectedView("gallery")}
                >
                  Галерея
                </div>
                <div
                  className={`${styles.option__item} ${selectedView === "3d" ? styles.option__item_selected : ""}`}
                  onClick={() => setSelectedView("3d")}
                >
                  Смотреть в 3D
                </div>
              </div>

              {/* Индикаторы слайдов */}
              {selectedView === "gallery" && (
                <div className={styles.info__items}>
                  {galleryImages.map((_, i) => (
                    <div
                      key={i}
                      className={`${styles.info__item} ${i === currentImageIndex ? styles.info__item_selected : ""}`}
                      onClick={() => handleSelectImage(i)}
                    />
                  ))}
                </div>
              )}
              {selectedView === "3d" && (
                <div className={styles.info__items}>
                  <div className={`${styles.info__item} ${styles.info__item_selected} ${styles.info__item_width}`} />
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

      {/* Блок цены */}
       <div className={styles.welcome__price}>
         <div className={`_container ${styles.configure}`}>
           <WelcomePrice 
             product={product}
             basePrice={product.base_price || "0"}
             currency="KZT"
             optionGroups={product.option_groups || []}
             surcharges={surcharges}
             onSurchargesChange={setSurcharges}
           />
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
        >
          {/* Кнопки навигации */}
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