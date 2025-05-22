"use client";

import { useEffect, useState } from "react";
import styles from './MainWelcome.module.css';
import ButtonPrimary from '../../ui/ButtonPrimary/ButtonPrimary.jsx';
import BonusValue from '../../ui/BonusValue/BonusValue.jsx';
import Header from '@/components/layout/Header/Header';
import GeneralInfo from '../../shared/GeneralInfo/GeneralInfo.jsx';
import GeneralInfoRightUpper from '../../shared/GeneralInfoRightUpper/GeneralInfoRightUpper.jsx';
import GeneralInfoRightDown from '../../shared/GeneralInfoRightDown/GeneralInfoRightDown.jsx';
import GeneralInfoLeftDown from '../../shared/GeneralInfoLeftDown/GeneralInfoLeftDown.jsx';
import InfoList from '../../shared/InfoList/InfoList';
import ProductCatalog from "@/components/shared/ProductCatalog/ProductCatalog";
import OtherCatalog from '../../shared/OtherCatalog/OtherCatalog';
import { getWelcomeCategories } from "@/services/category.service";


export default function MainWelcome() {
    const [products, setProducts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const API_URL = process.env.NEXT_PUBLIC_API_DOMAIN
    useEffect(() => {
        fetch(`${API_URL}/catalog/home/`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    setProducts(data);
                }
            })
            .catch(err => console.error("Ошибка загрузки продуктов:", err));
    }, []);

    // Слайдшоу
    useEffect(() => {
        if (products.length > 1) {
            const interval = setInterval(() => {
                setCurrentIndex(prev => (prev + 1) % products.length);
            }, 4000); // каждые 4 секунды

            return () => clearInterval(interval);
        }
    }, [products]);

    // Категорий
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const data = await getWelcomeCategories()
            setCategories(data)
        }
        fetchData()
    }, [])

    const currentProduct = products[currentIndex];
    const rightContent = (<GeneralInfoRightUpper />);
    const rightContentDown = (<GeneralInfoRightDown />);
    const leftContentDown = (<GeneralInfoLeftDown />);

    return (
        <>
            <section className={[styles.welcome].join(' ')}>
                <div className={[styles.welcome__img, '_img'].join(' ')}>
                    {currentProduct?.image && (
                        <img src={currentProduct.image} alt="Фото" />
                    )}
                </div>
                <Header isBlur={true} />
                <div className={styles.welcome__inner}>
                    <div className={[styles.welcome__description, styles.desc].join(' ')}>
                        <div className={["_container-bigger", styles.desc__inner].join(' ')}>
                            <div className={styles.desc__content}>
                                <div className={styles.desc__ticket}>
                                    <div className={styles['desc__ticket-text']}>
                                        {currentProduct?.is_popular
                                            ? 'Популярно'
                                            : currentProduct?.is_new
                                                ? 'Новинка'
                                                : ''}
                                    </div>
                                </div>
                                <h1 className={[
                                    styles.desc__title,
                                    ((currentProduct?.name.length > 20 && currentProduct?.name.length <= 40)
                                        ? styles.desc__title_normal
                                        : styles.desc__title_small)
                                ].join(' ')}>{currentProduct?.name || '...'}</h1>
                                <p className={styles.desc__text}>{currentProduct?.description || '...'}</p>


                                <div className={styles.desc__price}>
                                    <div className={styles.price__value}>
                                        {
                                            currentProduct?.price ??
                                                currentProduct?.price
                                                ? `${currentProduct.variants[0].final_price} ${currentProduct.currency}`
                                                : "Нет в наличии"
                                        }
                                    </div>
                                    {currentProduct?.bonus !== 0.0 ? (<BonusValue bonusVal={currentProduct?.bonus} />) : ''}
                                </div>

                                <ButtonPrimary
                                    isWhite={true}
                                    children={'Перейти'}
onClick={() => {
  if (!currentProduct) return;

  const storedCart = JSON.parse(localStorage.getItem("cartItems") || "[]");

  const existingItemIndex = storedCart.findIndex((item) => item.id === currentProduct.id);

  if (existingItemIndex !== -1) {
    storedCart[existingItemIndex].quantity += 1;
  } else {
    storedCart.push({
      id: currentProduct.id,
      name: currentProduct.name,
      image: currentProduct.image || '',
      price: currentProduct.variants?.[0]?.final_price || '0',
      currency: currentProduct.variants?.[0]?.currency || 'KZT',
      quantity: 1,
      bonus: currentProduct.bonus || 0  // добавляем бонус
    });
  }

  localStorage.setItem("cartItems", JSON.stringify(storedCart));
  window.dispatchEvent(new Event("storage"));
}}

                                />
                            </div>
                            <div className={styles['welcome__items-wrapper']}>
                                <ul className={[styles.welcome__items, styles.items].join(' ')}>
                                    {products.map((_, i) => (
                                        <li
                                            key={i}
                                            className={[
                                                styles.items__elem,
                                                i === currentIndex ? styles.items__elem_selected : ''
                                            ].join(' ')}
                                        ></li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <GeneralInfo contentRight={rightContent} />
            <InfoList />
            {categories.map((item, key) => (
                item.is_full_format ? (
                    <ProductCatalog
                        key={item.slug || key}
                        title={item.name}
                        slug={item.slug}
                        tags={item.subcategories}
                        products={item.products}
                    />
                ) : (
                    <OtherCatalog key={item.slug || key} />
                )
            ))}
            <GeneralInfo
                contentLeft={leftContentDown}
                contentRight={rightContentDown}
                isLight={true} />

        </>
    );
}

export { default as MainWelcome } from './MainWelcome.jsx';
