import styles from './WelcomePrice.module.css';
import BonusValue from '@/components/ui/BonusValue/BonusValue';
import ButtonOrange from '@/components/ui/ButtonOrange/ButtonOrange';
import { Product, Variant } from '@/types/product';


export default function WelcomePrice({ product, variant }: { product: Product; variant: Variant }) {
//   console.log("🔥 product:", product);
    return (<div className={`${styles.configure__price} ${styles.price}`}>
        <div className={styles.price__item}>
            <div className={styles.configure__title}>Цена</div>
            <div className={styles.price__text}>
  {new Intl.NumberFormat('ru-RU').format(Number(variant.final_price))} {variant.currency}
</div>

            {(Number(variant.bonus_number) !== 0) ? (<BonusValue bonusVal={new Intl.NumberFormat('ru-RU').format(Number(variant.bonus_number))} />
) : ''}
        </div>
        <div className={`${styles.configure__btn} ${styles.btn}`}>
            <ButtonOrange
                onClick={() => {
                    const storedCart = localStorage.getItem("cartItems");
                    type CartItem = {
                        base_sku: string;
                        id: number | string;
                        name: string;
                        price: number;
                        currency: string;
                        quantity: number;
                        image: string;
                    };

                    const cartItems: CartItem[] = storedCart ? JSON.parse(storedCart) : [];


                    // Собираем только реально выбранные пользователем опции (selected === true или isSelected === true)
                    // Если в variant.options нет флага выбора, берём только уникальные part + colorId
                    const selectedOptions = Array.isArray(variant.options)
                      ? Object.values(
                          variant.options.reduce((acc, opt) => {
                            const partName = opt.part?.name || '';
                            const colorId = opt.color?.id || '';
                            // Ключ — уникальная комбинация part+colorId
                            const key = partName + ':' + colorId;
                            // Сохраняем только если part и colorId не пустые и ещё не добавлены
                            if (partName && colorId && !acc[key]) {
                              acc[key] = {
                                part: partName,
                                color: opt.color?.name || '',
                                colorId: colorId
                              };
                            }
                            return acc;
                          }, {} as Record<string, { part: string; color: string; colorId: string | number }>))
                      : [];

                    const newItem: CartItem & { config?: any } = {
                        base_sku: product.base_sku,
                        id: product.id,
                        name: product.name,
                        price: Number(variant.final_price) || 0,
                        currency: variant.currency,
                        quantity: 1,
                        image: product.images?.[0]?.image ?? '',
                        config: selectedOptions
                    };

                    const existingItemIndex = cartItems.findIndex(
                        (item: CartItem) => item.id === newItem.id
                    );

                    if (existingItemIndex !== -1) {
                        cartItems[existingItemIndex].quantity += 1;
                    } else {
                        cartItems.push(newItem);
                    }

                    localStorage.setItem(
                        "cartItems",
                        JSON.stringify(cartItems)
                    );
                    window.dispatchEvent(new Event("storage"));
                }}
                type="button"
            >
                В корзину
            </ButtonOrange>
        </div>
    </div>);
}

export { default as WelcomePrice } from './WelcomePrice';



