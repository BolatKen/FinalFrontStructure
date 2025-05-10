"use client"

import { ColorConfigure } from "../../shared/ColorConfigure/ColorConfigure";
import { ButtonPrimary } from '../../ui/ButtonPrimary/ButtonPrimary';
import ButtonOrange from '../../ui/ButtonOrange/ButtonOrange';
import styles from "./Welcome.module.css";
import ProductScene from "@/components/explosion/product-scene";

import React, { useState } from 'react';

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
  base_sku: string;
  slug: string;
  category: string;
  model_url: string;
  variants: Variant[];
}

interface WelcomeProps {
  product: Product;
}

export default function Welcome({ product }: WelcomeProps) {
  const mainVariant = product.variants[0];
  const colorsAndMaterials = [
    {
      'configureTitle': "Цвет и материал",
      'colorData': [
        {
          'imageUrl': "/textures/material-yellow.png",
          'altText': "Желтая кожа",
          'isSelected': true
        },
        {
          'imageUrl': "/textures/material-white.png",
          'altText': "Белая кожа",
          'isSelected': false
        },
        {
          'imageUrl': "/textures/material-brown.png",
          'altText': "Коричнивая кожа",
          'isSelected': false
        }
      ]
    },
    {
      'configureTitle': "Каркас",
      'colorData': [
        {
          'imageUrl': "/textures/wood-white.png",
          'altText': "Белое дерево",
          'isSelected': true
        }
      ]
    }
  ]

  let titleBlock = null
  if (product.name.length > 13) {
    let productName = product.name.split(',');
    let text = productName[0];
    titleBlock = <><div className={[
      styles.welcome__title,
      styles.welcome__title_long
    ].join(" ")}>{text}</div></>
  } else {
    titleBlock = <><div className={[
      styles.welcome__title,
      styles.welcome__title_short
    ].join(" ")}>{product.name}</div></>
  }

  const [selectedView, setSelectedView] = useState<'gallery' | '3d'>('gallery');

  return (
    <main className={styles.welcome}>
      <div className={styles.welcome__product}>
        <div className={`${styles.welcome__inner} _container-bigger`}>
          {/* arrow left */}
          {selectedView === 'gallery' && (
            <div className={`${styles.welcome__arrow} ${styles.arrow}`}>
              <img className={styles.arrow__item} src="/core/arrow.svg" alt="arrow-left" />
            </div>
          )}

          <div className={`${styles.welcome__container} _container`}>
            {selectedView === 'gallery' && (
              <>
                {titleBlock}
                <div className={styles.welcome__img}>
                  <img
                    className="welcome__item"
                    src={product.model_url || "/core/3.png"}
                    alt="main-welcome-image"
                  />
                </div>
              </>
            )}
            {selectedView === '3d' && (
              <ProductScene />
            )}

            <div className={`${styles.welcome__info} ${styles.info} ${selectedView === '3d' ? styles.welcome__info_margin : ''}`}>
              <div className={`${styles.info__option} ${styles.option}`}>
                <div className={
                  `${styles.option__item} ${selectedView === 'gallery' ? styles.option__item_selected : ''}`
                }
                  onClick={() => setSelectedView('gallery')}
                > Галерея </div>
                <div className={
                  `${styles.option__item} ${selectedView === '3d' ? styles.option__item_selected : ''}`
                }
                  onClick={() => setSelectedView('3d')}>Смотреть в 3D</div>
              </div>

              {/* image scroll items */}
              {selectedView === 'gallery' && (
                <div className={styles.info__items}>
                  {Array(5).fill(null).map((_, i) => (
                    <div key={i} className={`${styles.info__item} ${i === 4 ? styles.info__item_selected : ''}`} />
                  ))}
                </div>
              )}
              {selectedView === '3d' && (
                <div className={styles.info__items}>
                  {Array(1).fill(null).map((_, i) => (
                    <div key={i} className={`${styles.info__item} ${i === 0 ? styles.info__item_selected : ''} ${styles.info__item_width}`} />
                  ))}
                </div>
              )}

            </div>
          </div>

          {/* arrow right */}
          {selectedView === 'gallery' && (
            <div className={`${styles.welcome__arrow} ${styles.arrow}`}>
              <img className={`${styles.arrow__item} ${styles.arrow__item_left}`} src="/core/arrow.svg" alt="arrow-left" />
            </div>
          )}
        </div>
      </div>

      <div className={styles.welcome__price}>
        <div className={`_container ${styles.configure}`}>
          <div className={styles.configure__inner}>
            <div className={styles.configure__material}>
              {colorsAndMaterials.map((item, idx) => (
                <ColorConfigure
                  key={idx}
                  configureTitle={item.configureTitle}
                  colorData={item.colorData} />
              ))}

              <ButtonPrimary onClick={null}>Конфигуратор</ButtonPrimary>
            </div>

            <div className={`${styles.configure__price} ${styles.price}`}>
              <div className={styles.price__item}>
                <div className={styles.configure__title}>Цена</div>
                <div className={styles.price__text}>
                  {mainVariant.price} {mainVariant.currency}
                </div>
                <div className={`${styles.price__bonus} ${styles.bonus}`}>
                  <div className={styles.bonus__icon}>
                    <p className={styles.bonus__text}>б</p>
                  </div>
                  <div className={styles.bonus__value}>+ 12 000 бонусов</div>
                </div>
              </div>
              <div className={`${styles.price__btn} ${styles.btn}`}>
                <ButtonOrange children={"Купить"} onClick={null} type="button" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main >
  );
}
