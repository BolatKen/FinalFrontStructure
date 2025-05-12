// "use client"
// import React, { useState } from 'react';
// import styles from "./Welcome.module.css";
// import ColorConfigure from "../../shared/ColorConfigure/ColorConfigure";
// import ButtonPrimary from '../../ui/ButtonPrimary/ButtonPrimary';
// import Arrow from '../../ui/Arrow/Arrow';
// import ButtonOrange from '../../ui/ButtonOrange/ButtonOrange';
// import ProductScene from "@/components/explosion/product-scene";
// import BonusValue from '../../ui/BonusValue/BonusValue';

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
//   variants: Variant[];
// }

// interface WelcomeProps {
//   product: Product;
// }

// export default function Welcome({ product }: WelcomeProps) {
//   const mainVariant = product.variants[0];
//   const colorsAndMaterials = [
//     {
//       'configureTitle': "Цвет и материал",
//       'colorData': [
//         {
//           'color': 'Желтый',
//           'code': '#bfb7ae',
//           'imageUrl': "/textures/material-yellow.png",
//           'altText': "Желтая кожа",
//           'isSelected': true
//         },
//         {
//           'color': 'Белый',
//           'code': '#e2e2e2',
//           'imageUrl': "/textures/material-white.png",
//           'altText': "Белая кожа",
//           'isSelected': false
//         },
//         {
//           'color': 'Коричневый',
//           'code': '#7b716d',
//           'imageUrl': "/textures/material-brown.png",
//           'altText': "Коричнивая кожа",
//           'isSelected': false
//         }
//       ]
//     },
//     {
//       'configureTitle': "Каркас",
//       'colorData': [
//         {
//           'color': 'Белое',
//           'code': '#bfb7ae',
//           'imageUrl': "/textures/wood-white.png",
//           'altText': "Белое дерево",
//           'isSelected': true
//         }
//       ]
//     }
//   ]

//   let titleBlock = null
//   if (product.name.length > 13) {
//     let productName = product.name.split(',');
//     let text = productName[0];
//     titleBlock = <><div className={[
//       styles.welcome__title,
//       styles.welcome__title_long
//     ].join(" ")}>{text}</div></>
//   } else {
//     titleBlock = <><div className={[
//       styles.welcome__title,
//       styles.welcome__title_short
//     ].join(" ")}>{product.name}</div></>
//   }

//   const [selectedView, setSelectedView] = useState<'gallery' | '3d'>('gallery');
//   const [selectedColor, setSelectedColor] = useState<string | null>(null);



//   return (
//     <main className={styles.welcome}>
//       <div className={styles.welcome__product}>
//         <div className={`${styles.welcome__inner} _container-bigger`}>
//           {/* arrow left */}
//           {selectedView === 'gallery' && (
//             <Arrow onClick={undefined} />
//           )}

//           <div className={`${styles.welcome__container} _container`}>
//             {selectedView === 'gallery' && (
//               <>
//                 {titleBlock}
//                 <div className={styles.welcome__img}>
//                   <img
//                     className="welcome__item"
//                     src={product.model_url || "/core/3.png"}
//                     alt="main-welcome-image"
//                   />
//                 </div>
//               </>
//             )}
//             {selectedView === '3d' && (
//               <ProductScene color={selectedColor} />
//             )}

//             <div className={`${styles.welcome__info} ${styles.info} ${selectedView === '3d' ? styles.welcome__info_margin : ''}`}>
//               <div className={`${styles.info__option} ${styles.option}`}>
//                 <div className={
//                   `${styles.option__item} ${selectedView === 'gallery' ? styles.option__item_selected : ''}`
//                 }
//                   onClick={() => setSelectedView('gallery')}
//                 > Галерея </div>
//                 <div className={
//                   `${styles.option__item} ${selectedView === '3d' ? styles.option__item_selected : ''}`
//                 }
//                   onClick={() => setSelectedView('3d')}>Смотреть в 3D</div>
//               </div>

//               {/* image scroll items */}
//               {selectedView === 'gallery' && (
//                 <div className={styles.info__items}>
//                   {Array(5).fill(null).map((_, i) => (
//                     <div key={i} className={`${styles.info__item} ${i === 4 ? styles.info__item_selected : ''}`} />
//                   ))}
//                 </div>
//               )}
//               {selectedView === '3d' && (
//                 <div className={styles.info__items}>
//                   {Array(1).fill(null).map((_, i) => (
//                     <div key={i} className={`${styles.info__item} ${i === 0 ? styles.info__item_selected : ''} ${styles.info__item_width}`} />
//                   ))}
//                 </div>
//               )}

//             </div>
//           </div>

//           {/* arrow right */}
//           {selectedView === 'gallery' && (
//             <Arrow direction='right' onClick={undefined} />
//           )}
//         </div>
//       </div>

//       <div className={styles.welcome__price}>
//         <div className={`_container ${styles.configure}`}>
//           <div className={styles.configure__inner}>
//             <div className={styles.configure__material}>
//               {colorsAndMaterials.map((item, idx) => (
//                 <ColorConfigure
//                   key={idx}
//                   configureTitle={item.configureTitle}
//                   colorData={item.colorData}
//                   onColorSelect={(color: string) => setSelectedColor(color)}
//                 />
//               ))}

//               <ButtonPrimary onClick={null}>Конфигуратор</ButtonPrimary>
//             </div>

//             <div className={`${styles.configure__price} ${styles.price}`}>
//               <div className={styles.price__item}>
//                 <div className={styles.configure__title}>Цена</div>
//                 <div className={styles.price__text}>
//                   {mainVariant.price} {mainVariant.currency}
//                 </div>
//                 <BonusValue bonusVal={'12 000'} />
//               </div>
//               <div className={`${styles.price__btn} ${styles.btn}`}>
//                 <ButtonOrange children={"Купить"} onClick={null} type="button" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main >
//   );
// }



// NORM VARIK
// "use client"
// import React, { useState } from 'react';
// import styles from "./Welcome.module.css";
// import ColorConfigure from "../../shared/ColorConfigure/ColorConfigure";
// import ButtonPrimary from '../../ui/ButtonPrimary/ButtonPrimary';
// import Arrow from '../../ui/Arrow/Arrow';
// import ButtonOrange from '../../ui/ButtonOrange/ButtonOrange';
// import ProductScene from "@/components/explosion/product-scene";
// import BonusValue from '../../ui/BonusValue/BonusValue';

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
//   variants: Variant[];
// }

// interface WelcomeProps {
//   product: Product;
// }

// export default function Welcome({ product }: WelcomeProps) {
//   const mainVariant = product.variants[0];
//   const colorsAndMaterials = [
//     {
//       'configureTitle': "Цвет и материал",
//       'colorData': [
//         {
//           'color': 'Желтый',
//           'code': '#bfb7ae',
//           'imageUrl': "/textures/material-yellow.png",
//           'altText': "Желтая кожа",
//           'isSelected': true
//         },
//         {
//           'color': 'Белый',
//           'code': '#e2e2e2',
//           'imageUrl': "/textures/material-white.png",
//           'altText': "Белая кожа",
//           'isSelected': false
//         },
//         {
//           'color': 'Коричневый',
//           'code': '#7b716d',
//           'imageUrl': "/textures/material-brown.png",
//           'altText': "Коричнивая кожа",
//           'isSelected': false
//         }
//       ]
//     },
//     {
//       'configureTitle': "Каркас",
//       'colorData': [
//         {
//           'color': 'Белое',
//           'code': '#bfb7ae',
//           'imageUrl': "/textures/wood-white.png",
//           'altText': "Белое дерево",
//           'isSelected': true
//         }
//       ]
//     }
//   ]

//   let titleBlock = null;
//   if (product.name.length > 13) {
//     let productName = product.name.split(',');
//     let text = productName[0];
//     titleBlock = (
//       <div className={[styles.welcome__title, styles.welcome__title_long].join(" ")}>
//         {text}
//       </div>
//     );
//   } else {
//     titleBlock = (
//       <div className={[styles.welcome__title, styles.welcome__title_short].join(" ")}>
//         {product.name}
//       </div>
//     );
//   }

//   const [selectedView, setSelectedView] = useState<'gallery' | '3d'>('gallery');
//   const [selectedColor, setSelectedColor] = useState<string | null>(null);

//   const galleryImages = [
//     product.model_url || "/core/1.png",
//     "/core/2.png",
//     "/core/3.png",
//     "/core/4.png",
//     "/core/5.jpg",
//   ];
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   const handlePrevImage = () => {
//     setCurrentImageIndex((prevIndex) =>
//       prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1
//     );
//   };

//   const handleNextImage = () => {
//     setCurrentImageIndex((prevIndex) =>
//       prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   return (
//     <main className={styles.welcome}>
//       <div className={styles.welcome__product}>
//         <div className={`${styles.welcome__inner} _container-bigger`}>
//           {/* arrow left */}
//           {selectedView === 'gallery' && (
//             <Arrow onClick={handlePrevImage} />
//           )}

//           <div className={`${styles.welcome__container} _container`}>
//             {selectedView === 'gallery' && (
//               <>
//                 {titleBlock}
//                 <div className={styles.welcome__img}>
//                   <img
//                     className="welcome__item"
//                     src={galleryImages[currentImageIndex]}
//                     alt={`gallery-image-${currentImageIndex}`}
//                   />
//                 </div>
//               </>
//             )}
//             {selectedView === '3d' && (
//               <ProductScene color={selectedColor} />
//             )}

//             <div className={`${styles.welcome__info} ${styles.info} ${selectedView === '3d' ? styles.welcome__info_margin : ''}`}>
//               <div className={`${styles.info__option} ${styles.option}`}>
//                 <div className={`${styles.option__item} ${selectedView === 'gallery' ? styles.option__item_selected : ''}`}
//                   onClick={() => setSelectedView('gallery')}
//                 >
//                   Галерея
//                 </div>
//                 <div className={`${styles.option__item} ${selectedView === '3d' ? styles.option__item_selected : ''}`}
//                   onClick={() => setSelectedView('3d')}
//                 >
//                   Смотреть в 3D
//                 </div>
//               </div>

//               {/* image scroll items */}
//               {selectedView === 'gallery' && (
//                 <div className={styles.info__items}>
//                   {galleryImages.map((_, i) => (
//                     <div key={i} className={`${styles.info__item} ${i === currentImageIndex ? styles.info__item_selected : ''}`} />
//                   ))}
//                 </div>
//               )}
//               {selectedView === '3d' && (
//                 <div className={styles.info__items}>
//                   <div className={`${styles.info__item} ${styles.info__item_selected} ${styles.info__item_width}`} />
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* arrow right */}
//           {selectedView === 'gallery' && (
//             <Arrow direction='right' onClick={handleNextImage} />
//           )}
//         </div>
//       </div>

//       <div className={styles.welcome__price}>
//         <div className={`_container ${styles.configure}`}>
//           <div className={styles.configure__inner}>
//             <div className={styles.configure__material}>
//               {colorsAndMaterials.map((item, idx) => (
//                 <ColorConfigure
//                   key={idx}
//                   configureTitle={item.configureTitle}
//                   colorData={item.colorData}
//                   onColorSelect={(color: string) => setSelectedColor(color)}
//                 />
//               ))}
//               <ButtonPrimary onClick={null}>Конфигуратор</ButtonPrimary>
//             </div>

//             <div className={`${styles.configure__price} ${styles.price}`}>
//               <div className={styles.price__item}>
//                 <div className={styles.configure__title}>Цена</div>
//                 <div className={styles.price__text}>
//                   {mainVariant.price} {mainVariant.currency}
//                 </div>
//                 <BonusValue bonusVal={'12 000'} />
//               </div>
//               <div className={`${styles.price__btn} ${styles.btn}`}>
//                 <ButtonOrange children={"Купить"} onClick={null} type="button" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }



// "use client"
// import React, { useState } from 'react';
// import styles from "./Welcome.module.css";
// import ColorConfigure from "../../shared/ColorConfigure/ColorConfigure";
// import ButtonPrimary from '../../ui/ButtonPrimary/ButtonPrimary';
// import Arrow from '../../ui/Arrow/Arrow';
// import ButtonOrange from '../../ui/ButtonOrange/ButtonOrange';
// import ProductScene from "@/components/explosion/product-scene";
// import BonusValue from '../../ui/BonusValue/BonusValue';

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
//   variants: Variant[];
// }

// interface WelcomeProps {
//   product: Product;
// }

// export default function Welcome({ product }: WelcomeProps) {
//   const mainVariant = product.variants[0];

//   const colorsAndMaterials = [
//     {
//       configureTitle: "Цвет и материал",
//       colorData: [
//         { color: 'Желтый', code: '#bfb7ae', imageUrl: "/textures/material-yellow.png", altText: "Желтая кожа", isSelected: true },
//         { color: 'Белый', code: '#e2e2e2', imageUrl: "/textures/material-white.png", altText: "Белая кожа", isSelected: false },
//         { color: 'Коричневый', code: '#7b716d', imageUrl: "/textures/material-brown.png", altText: "Коричневая кожа", isSelected: false }
//       ]
//     },
//     {
//       configureTitle: "Каркас",
//       colorData: [
//         { color: 'Белое', code: '#bfb7ae', imageUrl: "/textures/wood-white.png", altText: "Белое дерево", isSelected: true }
//       ]
//     }
//   ];

//   const titleBlock = product.name.length > 13
//     ? (
//       <div className={`${styles.welcome__title} ${styles.welcome__title_long}`}>
//         {product.name.split(',')[0]}
//       </div>
//     )
//     : (
//       <div className={`${styles.welcome__title} ${styles.welcome__title_short}`}>
//         {product.name}
//       </div>
//     );

//   const [selectedView, setSelectedView] = useState<'gallery' | '3d'>('gallery');
//   const [selectedColor, setSelectedColor] = useState<string | null>(null);

//   const galleryImages = [
//     product.model_url || "/core/1.png",
//     "/core/2.png",
//     "/core/3.png",
//     "/core/4.png",
//     // "/core/5.jpg",
//   ];
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   const handlePrevImage = () => {
//     setCurrentImageIndex((prev) =>
//       prev === 0 ? galleryImages.length - 1 : prev - 1
//     );
//   };

//   const handleNextImage = () => {
//     setCurrentImageIndex((prev) =>
//       prev === galleryImages.length - 1 ? 0 : prev + 1
//     );
//   };

//   const handleSelectImage = (index: number) => {
//     setCurrentImageIndex(index);
//   };

//   return (
//     <main className={styles.welcome}>
//       <div className={styles.welcome__product}>
//         <div className={`${styles.welcome__inner} _container-bigger`}>
//           {/* Стрелка влево */}
//           {selectedView === 'gallery' && (
//             <Arrow onClick={handlePrevImage} />
//           )}

//           <div className={`${styles.welcome__container} _container`}>
//             {selectedView === 'gallery' && (
//               <>
//                 {titleBlock}
//                 <div className={styles.welcome__img}>
//                   <img
//                     className="welcome__item"
//                     src={galleryImages[currentImageIndex]}
//                     alt={`gallery-image-${currentImageIndex}`}
//                   />
//                 </div>
//               </>
//             )}
//             {selectedView === '3d' && (
//               <ProductScene color={selectedColor} />
//             )}

//             <div className={`${styles.welcome__info} ${styles.info} ${selectedView === '3d' ? styles.welcome__info_margin : ''}`}>
//               <div className={`${styles.info__option} ${styles.option}`}>
//                 <div
//                   className={`${styles.option__item} ${selectedView === 'gallery' ? styles.option__item_selected : ''}`}
//                   onClick={() => setSelectedView('gallery')}
//                 >
//                   Галерея
//                 </div>
//                 <div
//                   className={`${styles.option__item} ${selectedView === '3d' ? styles.option__item_selected : ''}`}
//                   onClick={() => setSelectedView('3d')}
//                 >
//                   Смотреть в 3D
//                 </div>
//               </div>

//               {/* Кружочки выбора */}
//               {selectedView === 'gallery' && (
//                 <div className={styles.info__items}>
//                   {galleryImages.map((_, i) => (
//                     <div
//                       key={i}
//                       className={`${styles.info__item} ${i === currentImageIndex ? styles.info__item_selected : ''}`}
//                       onClick={() => handleSelectImage(i)}
//                     />
//                   ))}
//                 </div>
//               )}
//               {selectedView === '3d' && (
//                 <div className={styles.info__items}>
//                   <div className={`${styles.info__item} ${styles.info__item_selected} ${styles.info__item_width}`} />
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Стрелка вправо */}
//           {selectedView === 'gallery' && (
//             <Arrow direction="right" onClick={handleNextImage} />
//           )}
//         </div>
//       </div>

//       {/* Блок цены и конфига */}
//       <div className={styles.welcome__price}>
//         <div className={`_container ${styles.configure}`}>
//           <div className={styles.configure__inner}>
//             <div className={styles.configure__material}>
//               {colorsAndMaterials.map((item, idx) => (
//                 <ColorConfigure
//                   key={idx}
//                   configureTitle={item.configureTitle}
//                   colorData={item.colorData}
//                   onColorSelect={(color: string) => setSelectedColor(color)}
//                 />
//               ))}
//               <ButtonPrimary onClick={null}>Конфигуратор</ButtonPrimary>
//             </div>

//             <div className={`${styles.configure__price} ${styles.price}`}>
//               <div className={styles.price__item}>
//                 <div className={styles.configure__title}>Цена</div>
//                 <div className={styles.price__text}>
//                   {mainVariant.price} {mainVariant.currency}
//                 </div>
//                 <BonusValue bonusVal={'12 000'} />
//               </div>
//               <div className={`${styles.configure__btn} ${styles.btn}`}>
//                 <ButtonOrange children="Купить" onClick={null} type="button" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }



"use client"
import React, { useState } from 'react';
import styles from "./Welcome.module.css";
import ColorConfigure from "../../shared/ColorConfigure/ColorConfigure";
import ButtonPrimary from '../../ui/ButtonPrimary/ButtonPrimary';
import Arrow from '../../ui/Arrow/Arrow';
import ButtonOrange from '../../ui/ButtonOrange/ButtonOrange';
import ProductScene from "@/components/explosion/product-scene";
import BonusValue from '../../ui/BonusValue/BonusValue';

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
      configureTitle: "Цвет и материал",
      colorData: [
        { color: 'Желтый', code: '#bfb7ae', imageUrl: "/textures/material-yellow.png", altText: "Желтая кожа", isSelected: true },
        { color: 'Белый', code: '#e2e2e2', imageUrl: "/textures/material-white.png", altText: "Белая кожа", isSelected: false },
        { color: 'Коричневый', code: '#7b716d', imageUrl: "/textures/material-brown.png", altText: "Коричневая кожа", isSelected: false }
      ]
    },
    {
      configureTitle: "Каркас",
      colorData: [
        { color: 'Белое', code: '#bfb7ae', imageUrl: "/textures/wood-white.png", altText: "Белое дерево", isSelected: true }
      ]
    }
  ];

  const titleBlock = product.name.length > 13
    ? (
      <div className={`${styles.welcome__title} ${styles.welcome__title_long}`}>
        {product.name.split(',')[0]}
      </div>
    )
    : (
      <div className={`${styles.welcome__title} ${styles.welcome__title_short}`}>
        {product.name}
      </div>
    );

  const [selectedView, setSelectedView] = useState<'gallery' | '3d'>('gallery');
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const galleryImages = [
    product.model_url || "/core/1.png",
    "/core/2.png",
    "/core/3.png",
    "/core/4.png",
    // "/core/5.jpg",
  ];
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

  return (
    <main className={styles.welcome}>
      <div className={styles.welcome__product}>
        <div className={`${styles.welcome__inner} _container-bigger`}>
          {/* Стрелка влево */}
          {selectedView === 'gallery' && (
            <Arrow onClick={handlePrevImage} />
          )}

          <div className={`${styles.welcome__container} _container`}>
            {selectedView === 'gallery' && (
              <>
                {titleBlock}
                <div className={styles.welcome__img}>
                  <img
                    className="welcome__item"
                    src={galleryImages[currentImageIndex]}
                    alt={`gallery-image-${currentImageIndex}`}
                  />
                </div>
              </>
            )}
            {selectedView === '3d' && (
              <ProductScene color={selectedColor} />
            )}

            <div className={`${styles.welcome__info} ${styles.info} ${selectedView === '3d' ? styles.welcome__info_margin : ''}`}>
              <div className={`${styles.info__option} ${styles.option}`}>
                <div
                  className={`${styles.option__item} ${selectedView === 'gallery' ? styles.option__item_selected : ''}`}
                  onClick={() => setSelectedView('gallery')}
                >
                  Галерея
                </div>
                <div
                  className={`${styles.option__item} ${selectedView === '3d' ? styles.option__item_selected : ''}`}
                  onClick={() => setSelectedView('3d')}
                >
                  Смотреть в 3D
                </div>
              </div>

              {/* Кружочки выбора */}
              {selectedView === 'gallery' && (
                <div className={styles.info__items}>
                  {galleryImages.map((_, i) => (
                    <div
                      key={i}
                      className={`${styles.info__item} ${i === currentImageIndex ? styles.info__item_selected : ''}`}
                      onClick={() => handleSelectImage(i)}
                    />
                  ))}
                </div>
              )}
              {selectedView === '3d' && (
                <div className={styles.info__items}>
                  <div className={`${styles.info__item} ${styles.info__item_selected} ${styles.info__item_width}`} />
                </div>
              )}
            </div>
          </div>

          {/* Стрелка вправо */}
          {selectedView === 'gallery' && (
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
                  {mainVariant.price} {mainVariant.currency}
                </div>
                <BonusValue bonusVal={'12 000'} />
              </div>
              <div className={`${styles.configure__btn} ${styles.btn}`}>
                <ButtonOrange
                  onClick={() => {
                    const storedData = localStorage.getItem("cartData");
                    const parsedData = storedData ? JSON.parse(storedData) : { count: 0 };
                    const newCount = parsedData.count + 1;
                    localStorage.setItem("cartData", JSON.stringify({
                      count: newCount,
                      timestamp: new Date().getTime(),
                    }));
                    window.dispatchEvent(new Event('storage'));
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
