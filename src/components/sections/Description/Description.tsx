// import styles from "./Description.module.css";

// interface ProductOption {
//   id: number;
//   option_type_display: string;
//   value: string;
//   code: string;
// }

// interface ProductPartDimension {
//   id: number;
//   name: string;
//   value: string;
//   unit: string;
// }

// interface ProductPart {
//   id: number;
//   name: string;
//   dimensions: ProductPartDimension[];
// }

// interface VariantOption {
//   id: number;
//   option_display: {
//     id: number;
//     option_type_display: string;
//     value: string;
//     code: string;
//   };
// }

// interface Variant {
//   id: number;
//   sku: string;
//   price: string;
//   old_price?: string | null;
//   currency: string;
//   variant_options: VariantOption[];
// }

// interface Product {
//   id: number;
//   name: string;
//   description: string;
//   base_sku: string;
//   slug: string;
//   category: string;
//   model_url: string;
//   options: ProductOption[];
//   parts: ProductPart[];
//   variants: Variant[];
// }

// interface DescriptionProps {
//   product: Product;
// }


// export default function Description({product}: DescriptionProps) {
//   return (
//     <div className={styles.description}>
//       <div className={`${styles.description__inner} _container`}>
//         <section className={styles.specs}>
//           <h2 className={styles.specs__title}>Характеристики</h2>

//           <div className={styles.specs__tabs}>
//             <button className={`${styles.tabs__btn} ${styles.tabs__btn_active}`}>
//               Характеристики
//             </button>
//             <button className={styles.tabs__btn}>Размеры</button>
//             <button className={styles.tabs__btn}>Дизайнерам</button>
//           </div>

//           <div className={styles.specs__main}>
//             <div className={styles.specs__list}>
//               <div className={styles.specs__row}>
//                 <div className={styles.specs__name}>{product.options}</div>
//                 <div className={styles.specs__line}></div>
//                 <div className={styles.specs__value}>пенополиуретан, холофайбер</div>
//               </div>
//               <div className={styles.specs__row}>
//                 <div className={styles.specs__name}>Тип обивки</div>
//                 <div className={styles.specs__line}></div>
//                 <div className={styles.specs__value}>Экокожа</div>
//               </div>
//               <div className={styles.specs__row}>
//                 <div className={styles.specs__name}>Материал подлокотников</div>
//                 <div className={styles.specs__line}></div>
//                 <div className={styles.specs__value}>Экокожа</div>
//               </div>
//               <div className={styles.specs__row}>
//                 <div className={styles.specs__name}>Материал каркаса</div>
//                 <div className={styles.specs__line}></div>
//                 <div className={styles.specs__value}>Фанера (ЛДСП)</div>
//               </div>
//               <div className={styles.specs__row}>
//                 <div className={styles.specs__name}>Максимальная нагрузка</div>
//                 <div className={styles.specs__line}></div>
//                 <div className={styles.specs__value}>180 кг</div>
//               </div>
//               <div className={styles.specs__row}>
//                 <div className={styles.specs__name}>Механизм</div>
//                 <div className={styles.specs__line}></div>
//                 <div className={styles.specs__value}>пиастра</div>
//               </div>
//               <div className={styles.specs__row}>
//                 <div className={styles.specs__name}>Вариант доставки</div>
//                 <div className={styles.specs__line}></div>
//                 <div className={styles.specs__value}>в разобранном виде</div>
//               </div>
//               <div className={styles.specs__row}>
//                 <div className={styles.specs__name}>Цвет</div>
//                 <div className={styles.specs__line}></div>
//                 <div className={styles.specs__value}>металл</div>
//               </div>
//             </div>

//             <div className={styles.specs__media}>
//               {/* Изображения */}
//               <div className={styles.specs__images}>
//                 <figure className={styles.specs__imageItem}>
//                   <img
//                     src="/core/3.png"
//                     alt="Вид спереди"
//                     className={styles.specs__img}
//                   />
//                   <figcaption className={styles.specs__caption}>
//                     79 см × 52 см × 30 см
//                   </figcaption>
//                 </figure>
//                 <figure className={styles.specs__imageItem}>
//                   <img
//                     src="/core/4.png"
//                     alt="Вид сбоку"
//                     className={styles.specs__img}
//                   />
//                   <figcaption className={styles.specs__caption}>
//                     79 см × 52 см
//                   </figcaption>
//                 </figure>
//               </div>

//               {/* Скачать */}
//               <div className={styles.specs__downloads}>
//                 <div className={styles.downloads__item}>
//                   <div className={styles.downloads__info}>
//                     <div className={styles.downloads__name}>
//                       Aurora 3Ds Max model.max
//                     </div>
//                     <div className={styles.downloads__meta}>
//                       Corona Renderer · 54 мб
//                     </div>
//                   </div>
//                   <button className={styles.downloads__btn}>Скачать</button>
//                 </div>
//                 <div className={styles.downloads__item}>
//                   <div className={styles.downloads__info}>
//                     <div className={styles.downloads__name}>
//                       Инструкция по сборке.pdf
//                     </div>
//                     <div className={styles.downloads__meta}>2 мб</div>
//                   </div>
//                   <button className={styles.downloads__btn}>Скачать</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }


import styles from "./Description.module.css";
import { SpecsList } from '../../shared/SpecsList/SpecsList';
import { ButtonOrange } from '../../ui/ButtonOrange/ButtonOrange';
import { DescriptionDownload } from '../../shared/DescriptionDownload/DescriptionDownload';

export default function Description() {
  const specs = [
    {
      "name": 'Наполнение',
      "values": 'Пенополиуретан, холофайбер'
    },
    {
      "name": 'Тип обивки',
      "values": 'Экокожа'
    },
    {
      "name": 'Материал подлокотников',
      "values": 'Экокожа'
    },
    {
      "name": 'Материал каркаса',
      "values": 'Фанера (ЛДСП)'
    },
    {
      "name": 'Максимальная нагрузка',
      "values": '180 кг'
    },
    {
      "name": 'Механизм',
      "values": 'Пиастра'
    },
    {
      "name": 'Вариант доставки',
      "values": 'В разобранном виде'
    },
    {
      "name": 'Цвет',
      "values": 'Металл'
    }
  ]

  const downloadable = [
    {
      'title': "Aurora 3Ds Max model.max",
      'device': "Corona Renderer",
      'weight': "54 мб"
    },
    {
      'title': "Инструкция по сборке.pdf",
      'weight': "2 мб"
    }
  ]

  return (
    <div className={styles.description}>
      <div className={`${styles.description__inner} _container`}>
        <section className={styles.specs}>
          <h2 className={[styles.specs__title, 'title'].join(" ")}>Характеристики</h2>

          <div className={styles.description__tabs}>
            <div className={styles.specs__tabs}>
              <button className={`${styles.tabs__btn} ${styles.tabs__btn_active}`}>
                Характеристики
              </button>
              <button className={styles.tabs__btn}>Размеры</button>
              <button className={styles.tabs__btn}>Дизайнерам</button>
            </div>
          </div>

          <div className={styles.specs__main}>
            <SpecsList specsData={specs} />

            <div className={styles.specs__media}>
              {/* Изображения */}
              <div className={styles.specs__images}>
                <div className={[styles.specs__image, styles.sizes].join(" ")}>
                  <div className={[styles.description__image, '_img'].join(" ")}>
                    <img src="/core/3.png" alt="Вид спереди" />
                  </div>
                  <div className={styles.sizes__elem}>
                    <div className={styles.sizes__item}>79 см</div>
                    <div className={styles.sizes__line}></div>
                  </div>
                  {/* <div className={styles.sizes__elem}>
                    <div className={styles.sizes__item}>52 см</div>
                    <div className={styles.sizes__line}></div>
                  </div>
                  <div className={styles.sizes__elem}>
                    <div className={styles.sizes__item}>52 см</div>
                    <div className={styles.sizes__line}></div>
                  </div>
                  <div className={styles.sizes__elem}>
                    <div className={styles.sizes__item}>30 см</div>
                    <div className={styles.sizes__line}></div>
                  </div> */}
                </div>

                {/* <figure className={styles.specs__imageItem}>
                  <img
                    src="/core/3.png"
                    alt="Вид спереди"
                    className={styles.specs__img}
                  />
                  <figcaption className={styles.specs__caption}>
                    79 см × 52 см × 30 см
                  </figcaption>
                </figure> */}
                <figure className={styles.specs__imageItem}>
                  <img
                    src="/core/4.png"
                    alt="Вид сбоку"
                    className={styles.specs__img}
                  />
                  <figcaption className={styles.specs__caption}>
                    79 см × 52 см
                  </figcaption>
                </figure>
              </div>
              {/* Скачать */}
              <div className={styles.specs__downloads}>
                {
                  downloadable.map((item, idx) => (
                    <DescriptionDownload
                      key={idx}
                      title={item.title}
                      device={item.device}
                      weight={item.weight} />
                  ))
                }
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
