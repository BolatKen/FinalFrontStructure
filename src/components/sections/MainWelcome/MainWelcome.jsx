// import styles from './MainWelcome.module.css';
// import ButtonPrimary from '../../ui/ButtonPrimary/ButtonPrimary.jsx'
// import BonusValue from '../../ui/BonusValue/BonusValue.jsx';
// import Header from '@/components/layout/Header/Header';
// import GeneralInfo from '../../shared/GeneralInfo/GeneralInfo.jsx';
// import GeneralInfoRightUpper from '../../shared/GeneralInfoRightUpper/GeneralInfoRightUpper.jsx';
// import GeneralInfoRightDown from '../../shared/GeneralInfoRightDown/GeneralInfoRightDown.jsx';
// import GeneralInfoLeftDown from '../../shared/GeneralInfoLeftDown/GeneralInfoLeftDown.jsx';
// import InfoList from '../../shared/InfoList/InfoList';

// export default function MainWelcome() {
//     const rightContent = (<GeneralInfoRightUpper />)
//     const rightContentDown = (<GeneralInfoRightDown />)
//     const leftContentDown = (<GeneralInfoLeftDown />)
//     return (
//         <>
//             <section className={[styles.welcome].join(' ')}>
//                 <div className={[styles.welcome__img, '_img'].join(' ')}>
//                     <img src="/core/welcome.png" alt="Главная фотография блока приветствия" />
//                 </div>
//                 <Header isBlur={true} />
//                 <div className={styles.welcome__inner}>
//                     <div className={[styles.welcome__description, styles.desc].join(' ')}>
//                         <div className={["_container-bigger", styles.desc__inner].join(' ')}>
//                             <div className={styles.desc__content}>
//                                 <div className={styles.desc__ticket}>
//                                     <div className={styles['desc__ticket-text']}>Новинка</div>
//                                 </div>
//                                 <h1 className={styles.desc__title}>Short title</h1>
//                                 <p className={styles.desc__text}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
//                                 <div className={[styles.desc__price].join(' ')}>
//                                     <div className={styles.price__value}>240.000 KZT</div>
//                                     <BonusValue bonusVal={"12 000"} />
//                                 </div>
//                                 <ButtonPrimary isWhite={true} children={'Купить'} onClick={() => { }} />
//                             </div>
//                             <div className={styles['welcome__items-wrapper']}>
//                                 <ul className={[styles.welcome__items, styles.items].join(' ')}>
//                                     {Array.from({ length: 5 }, (_, i) => (
//                                         <li className={
//                                             [styles.items__elem,
//                                             i === 0 ? styles.items__elem_selected : '',
//                                             ].join(' ')
//                                         } key={i}></li>
//                                     ))}
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//             <GeneralInfo contentRight={rightContent} />
//             <InfoList />
//             <GeneralInfo
//                 contentLeft={leftContentDown}
//                 contentRight={rightContentDown}
//                 isLight={true} />
//         </>
//     );
// }

// export { default as MainWelcome } from './MainWelcome.jsx';

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
import ProductCatalog from '../../shared/ProductCatalog/ProductCatalog';
import OtherCatalog from '../../shared/OtherCatalog/OtherCatalog';
import { useRouter } from 'next/navigation';

export default function MainWelcome() {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:8000/catalog/home/")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        }
      })
      .catch(err => console.error("Ошибка загрузки продуктов:", err));
  }, []);

  useEffect(() => {
    if (products.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % products.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [products]);

  const currentProduct = products[currentIndex];
  const rightContent = <GeneralInfoRightUpper />;
  const rightContentDown = <GeneralInfoRightDown />;
  const leftContentDown = <GeneralInfoLeftDown />;

  return (
    <>
      <section className={styles.welcome}>
        <div
          className={[styles.welcome__img, '_img'].join(' ')}
          onClick={() => {
            if (currentProduct?.slug) {
              router.push(`/catalog/products/${currentProduct.slug}`);
            }
          }}
          style={{ cursor: 'pointer' }}
        >
          {currentProduct?.image && (
            <img src={currentProduct.image} alt="Фото" />
          )}
        </div>

        <Header isBlur={true} />

        <div className={styles.welcome__inner}>
          <div className={[styles.welcome__description, styles.desc].join(' ')}>
            <div className={["_container-bigger", styles.desc__inner].join(' ')}>
              <div
                className={styles.desc__content}
                onClick={() => {
                  if (currentProduct?.slug) {
                    router.push(`/catalog/products/${currentProduct.slug}`);
                  }
                }}
                style={{ cursor: 'pointer' }}
              >
                <div className={styles.desc__ticket}>
                  <div className={styles['desc__ticket-text']}>
                    {currentProduct?.is_popular
                      ? 'Популярно'
                      : currentProduct?.is_new
                        ? 'Новинка'
                        : ''}
                  </div>
                </div>

                <h1 className={styles.desc__title}>{currentProduct?.name || '...'}</h1>
                <p className={styles.desc__text}>{currentProduct?.description || '...'}</p>

                <div className={styles.desc__price}>
                  <div className={styles.price__value}>
                    {
                      currentProduct?.variants?.[0]?.final_price ??
                      currentProduct?.variants?.[0]?.base_price
                        ? `${currentProduct.variants[0].final_price ?? currentProduct.variants[0].base_price} ${currentProduct.variants[0].currency}`
                        : "Нет в наличии"
                    }
                  </div>
                  <BonusValue bonusVal={"12 000"} />
                </div>

                <ButtonPrimary
                  isWhite={true}
                  children={'Купить'}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!currentProduct) return;

                    const existing = localStorage.getItem("cartItems");
                    let updatedCart = [];

                    if (existing) {
                      try {
                        updatedCart = JSON.parse(existing) || [];
                      } catch (e) {}
                    }

                    const itemIndex = updatedCart.findIndex(item => item.id === currentProduct.id);
                    if (itemIndex !== -1) {
                      updatedCart[itemIndex].quantity += 1;
                    } else {
                      updatedCart.push({
                        id: currentProduct.id,
                        name: currentProduct.name,
                        image: currentProduct.image || '',
                        price: Number(currentProduct.variants?.[0]?.final_price ?? currentProduct.variants?.[0]?.base_price ?? '0'),
                        currency: currentProduct.variants?.[0]?.currency || 'KZT',
                        quantity: 1
                      });
                    }

                    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
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
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GeneralInfo contentRight={rightContent} />
      <InfoList />
      <ProductCatalog title="Кресла" tags={["Парикмахерские", "Барбеские", "Визажные", "Педикюрные", "Детские", "Для мастеров"]} products={[]} />
      <ProductCatalog title="Мойки" tags={["Парикмахерские", "Барбеские", "Визажные", "Педикюрные", "Детские", "Для мастеров"]} products={[]} />
      <OtherCatalog />
      <GeneralInfo contentLeft={leftContentDown} contentRight={rightContentDown} isLight={true} />
    </>
  );
}

export { default as MainWelcome } from './MainWelcome.jsx';
