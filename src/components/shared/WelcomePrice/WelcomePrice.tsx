import styles from './WelcomePrice.module.css';
import BonusValue from '@/components/ui/BonusValue/BonusValue';
import ButtonOrange from '@/components/ui/ButtonOrange/ButtonOrange';
import { Product, Variant } from '@/types/product';


export default function WelcomePrice({ product, variant }: { product: Product; variant: Variant }) {
    return (<div className={`${styles.configure__price} ${styles.price}`}>
        <div className={styles.price__item}>
            <div className={styles.configure__title}>Цена</div>
            <div className={styles.price__text}>
                {variant.final_price} {variant.currency}
            </div>
            {(Number(variant.bonus_number) !== 0) ? (<BonusValue bonusVal={Number(variant.bonus_number)} />) : ''}
        </div>
        <div className={`${styles.configure__btn} ${styles.btn}`}>
            <ButtonOrange
                onClick={() => {
                    const storedCart = localStorage.getItem("cartItems");
                    type CartItem = {
                        id: number | string;
                        name: string;
                        price: number;
                        currency: string;
                        quantity: number;
                    };

                    const cartItems: CartItem[] = storedCart ? JSON.parse(storedCart) : [];

                    const newItem: CartItem = {
                        id: product.id,
                        name: product.name,
                        price: Number(variant.final_price) || 0,
                        currency: variant.currency,
                        quantity: 1,
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