import React, { useEffect, useState } from 'react';
import './ProductCard.module.css';
import styles from './ProductCard.module.css';
import BonusValue from '@/components/ui/BonusValue/BonusValue';
import ColorList from '@/components/ui/ColorList/ColorList';
import { ProductCardProps } from '@/types/product';

type ColorItem = {
  imageUrl: string;
  altText: string;
  isSelected: boolean;
};


const ProductCard: React.FC<ProductCardProps> = ({
  imageSrc,
  title,
  oldPrice,
  newPrice,
  colorData,
}) => {
  const [colors, setColors] = useState<ColorItem[]>([]);
  useEffect(() => {
    if (colorData && colorData?.length > 0) {
      const mappedColors = colorData?.map((item, idx) => ({
        imageUrl: item.image,
        altText: item.name,
        isSelected: idx === 0
      }));
      setColors(mappedColors);
    }
  }, [colorData]);

  console.log(colors);
  // const colors = {
  //   'colorData': [
  //     {
  //       'imageUrl': "/textures/material-yellow.png",
  //       'altText': "Желтая кожа",
  //       'isSelected': true
  //     },
  //     {
  //       'imageUrl': "/textures/material-white.png",
  //       'altText': "Белая кожа",
  //       'isSelected': false
  //     },
  //     {
  //       'imageUrl': "/textures/material-brown.png",
  //       'altText': "Коричнивая кожа",
  //       'isSelected': false
  //     }
  //   ]
  // }
  function formatWithSpaces(n: number): string {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  const calculateBonus = (price: string) => {
    const numPrice = parseFloat(price);
    return Math.round(numPrice * 0.05).toString();
  };
  return (
    <div className={styles['product-card']}>
      <div className={styles['product-card__image']}>
        <img src={imageSrc} alt={title} />
      </div>
      <div className={styles['product-card__inner']}>
        <div className={styles['product-cart__colors']}>
          <ColorList
            colorData={colors}
            isSmall={true} onColorSelect={undefined} />
        </div>
        <div className={styles['product-card__info']}>
          <div className={styles['product-card__more']}>
            <h3 className={styles['product-card__title']}>{title}</h3>
            <div className={styles['product-card__bottom']}>
              <div className={styles['product-card__prices']}>
                <span className={styles['product-card__old-price']}>{formatWithSpaces(Number(oldPrice))} ТГ</span>
                <span className={styles['product-card__new-price']}>{formatWithSpaces(Number(newPrice))} ТГ</span>
              </div>
              <BonusValue bonusVal={calculateBonus(newPrice)} isDark={true} />
            </div>
          </div>
          <div className="product-card__arrow">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M9 6L15 12L9 18" stroke="#1D1C1B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
