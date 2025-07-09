// import styles from './WelcomePrice.module.css';
// import BonusValue from '@/components/ui/BonusValue/BonusValue';
// import ButtonOrange from '@/components/ui/ButtonOrange/ButtonOrange';
// import { Product, Variant } from '@/types/product';


// export default function WelcomePrice({ product, variant }: { product: Product; variant: Variant }) {
// //   console.log("🔥 product:", product);
//     return (<div className={`${styles.configure__price} ${styles.price}`}>
//         <div className={styles.price__item}>
//             <div className={styles.configure__title}>Цена</div>
//             <div className={styles.price__text}>
//   {new Intl.NumberFormat('ru-RU').format(Number(variant.final_price))} {variant.currency}
// </div>

//             {(Number(variant.bonus_number) !== 0) ? (<BonusValue bonusVal={new Intl.NumberFormat('ru-RU').format(Number(variant.bonus_number))} />
// ) : ''}
//         </div>
//         <div className={`${styles.configure__btn} ${styles.btn}`}>
//             <ButtonOrange
//                 onClick={() => {
//                     const storedCart = localStorage.getItem("cartItems");
//                     type CartItem = {
//                         base_sku: string;
//                         id: number | string;
//                         name: string;
//                         price: number;
//                         currency: string;
//                         quantity: number;
//                         image: string;
//                     };

//                     const cartItems: CartItem[] = storedCart ? JSON.parse(storedCart) : [];


//                     // Собираем только реально выбранные пользователем опции (selected === true или isSelected === true)
//                     // Если в variant.options нет флага выбора, берём только уникальные part + colorId
//                     const selectedOptions = Array.isArray(variant.options)
//                       ? Object.values(
//                           variant.options.reduce((acc, opt) => {
//                             const partName = opt.part?.name || '';
//                             const colorId = opt.color?.id || '';
//                             // Ключ — уникальная комбинация part+colorId
//                             const key = partName + ':' + colorId;
//                             // Сохраняем только если part и colorId не пустые и ещё не добавлены
//                             if (partName && colorId && !acc[key]) {
//                               acc[key] = {
//                                 part: partName,
//                                 color: opt.color?.name || '',
//                                 colorId: colorId
//                               };
//                             }
//                             return acc;
//                           }, {} as Record<string, { part: string; color: string; colorId: string | number }>))
//                       : [];

//                     const newItem: CartItem & { config?: any } = {
//                         base_sku: product.base_sku,
//                         id: product.id,
//                         name: product.name,
//                         price: Number(variant.final_price) || 0,
//                         currency: variant.currency,
//                         quantity: 1,
//                         image: product.images?.[0]?.image ?? '',
//                         config: selectedOptions
//                     };

//                     const existingItemIndex = cartItems.findIndex(
//                         (item: CartItem) => item.id === newItem.id
//                     );

//                     if (existingItemIndex !== -1) {
//                         cartItems[existingItemIndex].quantity += 1;
//                     } else {
//                         cartItems.push(newItem);
//                     }

//                     localStorage.setItem(
//                         "cartItems",
//                         JSON.stringify(cartItems)
//                     );
//                     window.dispatchEvent(new Event("storage"));
//                 }}
//                 type="button"
//             >
//                 В корзину
//             </ButtonOrange>
//         </div>
//     </div>);
// }

// export { default as WelcomePrice } from './WelcomePrice';




import styles from './WelcomePrice.module.css';
import BonusValue from '@/components/ui/BonusValue/BonusValue';
import ButtonOrange from '@/components/ui/ButtonOrange/ButtonOrange';
import { Product } from '@/types/product';
import { useState } from 'react';

interface Option {
  name: string;
  price: string;
  type: "base_cost" | "surcharge";
  comment?: string;
}

interface OptionGroup {
  title: string;
  options: Option[];
}

interface WelcomePriceProps {
  product: Product;
  basePrice: string;
  currency?: string;
  bonusNumber?: string;
  optionGroups?: OptionGroup[];
  surcharges?: Array<{name: string, price: number}>;
  onSurchargesChange?: (surcharges: Array<{name: string, price: number}>) => void;
}

export default function WelcomePrice({ 
  product, 
  basePrice: initialBasePrice,
  currency = "KZT",
  bonusNumber = "0",
  optionGroups = [], 
  surcharges = [], 
  onSurchargesChange 
}: WelcomePriceProps) {
  const [expandedGroup, setExpandedGroup] = useState<number | null>(null);
  const [basePrice, setBasePrice] = useState<number>(Number(initialBasePrice));
  const [selectedOptions, setSelectedOptions] = useState<Record<number, number>>({});

  const handleOptionSelect = (groupIndex: number, optionIndex: number) => {
    const option = optionGroups[groupIndex].options[optionIndex];
    
    const newSelectedOptions = {...selectedOptions, [groupIndex]: optionIndex};
    setSelectedOptions(newSelectedOptions);
    
    setExpandedGroup(null);
    
    if (option.type === 'base_cost') {
      setBasePrice(parseFloat(option.price));
    } else if (option.type === 'surcharge' && onSurchargesChange) {
      if (!surcharges.some(item => item.name === option.name)) {
        onSurchargesChange([
          ...surcharges, 
          {
            name: option.name,
            price: parseFloat(option.price)
          }
        ]);
      }
    }
  };

  const totalPrice = basePrice + (surcharges?.reduce((sum, item) => sum + item.price, 0) || 0);

  const addToCart = () => {
    const storedCart = localStorage.getItem("cartItems");
    type CartItem = {
      base_sku: string;
      id: number | string;
      name: string;
      price: number;
      currency: string;
      quantity: number;
      image: string;
      config?: {
        additionalOptions: Array<{name: string, price: number}>;
      };
    };

    const cartItems: CartItem[] = storedCart ? JSON.parse(storedCart) : [];

    const newItem: CartItem = {
      base_sku: product.base_sku,
      id: product.id,
      name: product.name,
      price: totalPrice,
      currency: currency,
      quantity: 1,
      image: product.images?.[0]?.image ?? '',
      config: {
        additionalOptions: surcharges
      }
    };

    const existingItemIndex = cartItems.findIndex(
      (item: CartItem) => item.id === newItem.id
    );

    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].quantity += 1;
    } else {
      cartItems.push(newItem);
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    window.dispatchEvent(new Event("storage"));
  };

  return (
  <div className={styles.priceContainer}>
    {/* Левый блок - выбор группы */}
    <div className={styles.leftSection}>
      {optionGroups.length > 0 && (
        <div className={styles.optionGroups}>
          {optionGroups.map((group, groupIndex) => (
            <div key={groupIndex} className={styles.optionGroup}>
              <button 
                className={styles.optionGroupButton}
                onClick={() => setExpandedGroup(expandedGroup === groupIndex ? null : groupIndex)}
              >
                {group.title}
              </button>
              
              {expandedGroup === groupIndex && (
                <div className={styles.optionsDropdown}>
                  {group.options.map((option, optionIndex) => (
                    <div 
                      key={optionIndex}
                      className={`${styles.optionItem} ${
                        selectedOptions[groupIndex] === optionIndex ? styles.optionItemSelected : ''
                      }`}
                      onClick={() => handleOptionSelect(groupIndex, optionIndex)}
                    >
                      <span className={styles.optionName}>{option.name}</span>
                      <span className={styles.optionPrice}>{option.price} {currency}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>

    {/* Правый блок - цена, доплаты и кнопка */}
    <div className={styles.rightSection}>
      <div className={styles.price__item}>
        <div className={styles.configure__title}>Цена</div>
        <div className={styles.price__text}>
          {new Intl.NumberFormat('ru-RU').format(totalPrice)} {currency}
        </div>
        {Number(bonusNumber) !== 0 && (
          <BonusValue bonusVal={new Intl.NumberFormat('ru-RU').format(Number(bonusNumber))} />
        )}
      </div>

      {surcharges.length > 0 && (
        <div className={styles.surchargesList}>
          {surcharges.map((item, index) => (
            <div key={index} className={styles.surchargeItem}>
              <span>{item.name}</span>
              <span>+{item.price.toLocaleString('ru-RU')} {currency}</span>
            </div>
          ))}
        </div>
      )}

      <div className={styles.configure__btn}>
        <ButtonOrange onClick={addToCart} type="button">
          В корзину
        </ButtonOrange>
      </div>
    </div>
  </div>
);
}




// import styles from './WelcomePrice.module.css';
// import BonusValue from '@/components/ui/BonusValue/BonusValue';
// import ButtonOrange from '@/components/ui/ButtonOrange/ButtonOrange';
// import { Product, Variant } from '@/types/product';
// import { useState } from 'react';

// // Define types for option groups and options
// interface ProductOption {
//   name: string;
//   price: string;
//   type: 'base_cost' | 'surcharge';
//   comment?: string;
// }

// interface OptionGroup {
//   title: string;
//   options: ProductOption[];
// }

// interface SelectedOption {
//   name: string;
//   price: number;
//   type: 'base_cost' | 'surcharge';
// }

// export default function WelcomePrice({ product, variant }: { product: Product; variant: Variant }) {
//   const [selectedOptions, setSelectedOptions] = useState<Record<string, SelectedOption>>({});
//   const [showOptions, setShowOptions] = useState<Record<string, boolean>>({});
  
//   // Calculate current price based on selected options
//   const basePrice = Number(variant.final_price);
//   let currentPrice = basePrice;
  
//   Object.values(selectedOptions).forEach((option: SelectedOption) => {
//     if (option.type === 'surcharge') {
//       currentPrice += Number(option.price);
//     } else if (option.type === 'base_cost') {
//       currentPrice = Number(option.price);
//     }
//   });

//   const toggleOptionGroup = (groupTitle: string) => {
//     setShowOptions(prev => ({
//       ...prev,
//       [groupTitle]: !prev[groupTitle]
//     }));
//   };

//   const selectOption = (groupTitle: string, option: ProductOption) => {
//     setSelectedOptions(prev => {
//       // For base_cost options, we only allow one selection per group
//       if (option.type === 'base_cost') {
//         return {
//           ...prev,
//           [groupTitle]: {
//             name: option.name,
//             price: Number(option.price),
//             type: option.type
//           }
//         };
//       }
      
//       // For surcharge options, toggle selection
//       if (prev[groupTitle] && prev[groupTitle].name === option.name) {
//         const newOptions = {...prev};
//         delete newOptions[groupTitle];
//         return newOptions;
//       } else {
//         return {
//           ...prev,
//           [groupTitle]: {
//             name: option.name,
//             price: Number(option.price),
//             type: option.type
//           }
//         };
//       }
//     });
//   };

//   const isOptionSelected = (groupTitle: string, optionName: string) => {
//     return selectedOptions[groupTitle]?.name === optionName;
//   };

//   return (
//     <div className={`${styles.configure__price} ${styles.price}`}>
//       <div className={styles.price__item}>
//         <div className={styles.configure__title}>Цена</div>
//         <div className={styles.price__text}>
//           {new Intl.NumberFormat('ru-RU').format(currentPrice)} {variant.currency}
//         </div>
//         {(Number(variant.bonus_number) !== 0) ? (
//           <BonusValue bonusVal={new Intl.NumberFormat('ru-RU').format(Number(variant.bonus_number))} />
//         ) : ''}
//       </div>

//       {/* Option groups */}
//       {product.option_groups?.map((group: OptionGroup) => (
//         <div key={group.title} className={styles.optionGroup}>
//           <button 
//             className={styles.optionGroupButton}
//             onClick={() => toggleOptionGroup(group.title)}
//           >
//             {group.title}
//           </button>
          
//           {showOptions[group.title] && (
//             <div className={styles.optionsList}>
//               {group.options.map((option: ProductOption) => (
//                 <div 
//                   key={option.name}
//                   className={`${styles.optionItem} ${isOptionSelected(group.title, option.name) ? styles.selected : ''}`}
//                   onClick={() => selectOption(group.title, option)}
//                 >
//                   <div className={styles.optionName}>{option.name}</div>
//                   <div className={styles.optionPrice}>
//                     {option.type === 'surcharge' ? '+' : ''}
//                     {new Intl.NumberFormat('ru-RU').format(Number(option.price))} {variant.currency}
//                   </div>
//                   {option.comment && <div className={styles.optionComment}>{option.comment}</div>}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       ))}

//       <div className={`${styles.configure__btn} ${styles.btn}`}>
//         <ButtonOrange
//           onClick={() => {
//             const storedCart = localStorage.getItem("cartItems");
//             type CartItem = {
//               base_sku: string;
//               id: number | string;
//               name: string;
//               price: number;
//               currency: string;
//               quantity: number;
//               image: string;
//             };

//             const cartItems: CartItem[] = storedCart ? JSON.parse(storedCart) : [];

//             // Prepare selected options for config
//             const configOptions = Object.entries(selectedOptions).map(([group, option]) => ({
//               group,
//               name: option.name,
//               price: option.price,
//               type: option.type
//             }));

//             const newItem: CartItem & { config?: any } = {
//               base_sku: product.base_sku,
//               id: product.id,
//               name: product.name,
//               price: currentPrice,
//               currency: variant.currency,
//               quantity: 1,
//               image: product.images?.[0]?.image ?? '',
//               config: {
//                 selectedOptions: configOptions,
//                 originalPrice: basePrice
//               }
//             };

//             const existingItemIndex = cartItems.findIndex(
//               (item: CartItem) => item.id === newItem.id
//             );

//             if (existingItemIndex !== -1) {
//               cartItems[existingItemIndex].quantity += 1;
//             } else {
//               cartItems.push(newItem);
//             }

//             localStorage.setItem("cartItems", JSON.stringify(cartItems));
//             window.dispatchEvent(new Event("storage"));
//           }}
//           type="button"
//         >
//           В корзину
//         </ButtonOrange>
//       </div>
//     </div>
//   );
// }

// export { default as WelcomePrice } from './WelcomePrice';