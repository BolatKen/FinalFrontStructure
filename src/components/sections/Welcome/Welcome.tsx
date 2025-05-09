import ColorSelector from "../../ui/ColorItem/ColorItem";
import { ButtonPrimary } from '../../ui/ButtonPrimary/ButtonPrimary';
import ButtonOrange from '../../ui/ButtonOrange/ButtonOrange';
import styles from "./Welcome.module.css";

import React from 'react';

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

  return (
    <main className={styles.welcome}>
      <div className={styles.welcome__product}>
        <div className={`${styles.welcome__inner} _container-bigger`}>
          <div className={`${styles.welcome__arrow} ${styles.arrow}`}>
            <img className={styles.arrow__item} src="/core/arrow.svg" alt="arrow-left" />
          </div>

          <div className={`${styles.welcome__container} _container`}>
            <div className={styles.welcome__title}>{product.name}</div>
            <div className={styles.welcome__img}>
              <img
                className="welcome__item"
                src={product.model_url || "/core/3.png"}
                alt="main-welcome-image"
              />
            </div>

            <div className={`${styles.welcome__info} ${styles.info}`}>
              <div className={`${styles.info__option} ${styles.option}`}>
                <div className={`${styles.option__item} ${styles.option__item_selected}`}>
                  Галерея
                </div>
                <div className={styles.option__item}>Смотреть в 3D</div>
              </div>
              <div className={styles.info__items}>
                {Array(5).fill(null).map((_, i) => (
                  <div key={i} className={`${styles.info__item} ${i === 4 ? styles.info__item_selected : ''}`} />
                ))}
              </div>
            </div>
          </div>

          <div className={`${styles.welcome__arrow} ${styles.arrow}`}>
            <img className={`${styles.arrow__item} ${styles.arrow__item_left}`} src="/core/arrow.svg" alt="arrow-left" />
          </div>
        </div>
      </div>

      <div className={styles.welcome__price}>
        <div className={`_container ${styles.configure}`}>
          <div className={styles.configure__inner}>
            <div className={styles.configure__material}>
              <div className={styles.configure__color}>
                <div className={styles.configure__title}>Цвет и материал</div>
                {/* <ul className={`${styles.color__items} ${styles.color__margin}`}>
                  {mainVariant.variant_options.map((option) => (
                    // <li key={option.id} className={styles.color__item}>
                    //   <ColorSelector
                    //     imageUrl={`/textures/material-${option.option_display.value.toLowerCase()}.png`}
                    //     // alt={option.option_display.value}
                    //   />
                    // </li>
                  ))}
                </ul> */}
              </div>

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
                <ButtonOrange children={"Купить"} onClick={null} type="button"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
