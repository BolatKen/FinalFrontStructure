// "use client";

// import { useEffect, useState } from "react";

// export default function CartPage() {
//   const [cartItems, setCartItems] = useState<any[]>([]);

//   useEffect(() => {
//     const storedCart = localStorage.getItem("cartItems");
//     if (storedCart) {
//       setCartItems(JSON.parse(storedCart));
//     }
//   }, []);

//   // Подсчёт итоговой суммы
//   const totalPrice = cartItems.reduce((acc, item) => {
//     return acc + item.price * item.quantity;
//   }, 0);

//   // Очистить корзину
//   const clearCart = () => {
//     localStorage.removeItem("cartItems");
//     setCartItems([]);
//   };

//   if (cartItems.length === 0) {
//     return (
//       <div style={{ padding: "20px", fontSize: "22px", color: "#222" }}>
//         Корзина пуста
//       </div>
//     );
//   }

//   return (
//     <div style={{ padding: "20px", color: "#222" }}>
//       <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>Корзина</h1>

//       <ul style={{ listStyle: "none", padding: 0 }}>
//         {cartItems.map((item) => (
//           <li
//             key={item.id}
//             style={{
//               marginBottom: "20px",
//               padding: "10px",
//               border: "1px solid #ccc",
//               borderRadius: "8px",
//               fontSize: "18px",
//             }}
//           >
//             <strong>{item.name}</strong><br />
//             Цена: {item.price} {item.currency}<br />
//             Количество: {item.quantity}
//           </li>
//         ))}
//       </ul>

//       <div style={{ fontSize: "24px", marginTop: "30px", fontWeight: "bold" }}>
//         Итого: {totalPrice.toFixed(2)} {cartItems[0]?.currency}
//       </div>

//       <button
//         onClick={clearCart}
//         style={{
//           marginTop: "20px",
//           padding: "10px 20px",
//           backgroundColor: "#FF7244",
//           color: "#fff",
//           border: "none",
//           borderRadius: "8px",
//           cursor: "pointer",
//           fontSize: "18px",
//         }}
//       >
//         Очистить корзину
//       </button>
//     </div>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./Cart.module.css";
import { ButtonOrange } from "@/components/ui/ButtonOrange/ButtonOrange";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  currency: string;
  image: string;
}

function getCartItems(): CartItem[] {
  const raw = localStorage.getItem("cartItems");
  if (!raw) return [];

  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveCartItems(cart: CartItem[]) {
  localStorage.setItem("cartItems", JSON.stringify(cart));
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const updateCart = () => {
      const loaded = getCartItems();
      setCartItems(loaded);
    };

    updateCart();
    window.addEventListener("storage", updateCart);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") updateCart();
    });

    return () => {
      window.removeEventListener("storage", updateCart);
      document.removeEventListener("visibilitychange", updateCart);
    };
  }, []);

  useEffect(() => {
    saveCartItems(cartItems);
  }, [cartItems]);

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const clearCart = () => {
    localStorage.removeItem("cartItems");
    setCartItems([]);
  };

  const increaseQuantity = (id: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  if (cartItems.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <img src="/icons/korzina.png" alt="Empty Cart" className={styles.emptyIcon} />
        <h2 className={styles.emptyCartTitle}>Ваша корзина пуста</h2>
        <p className={styles.emptyCartText}>Воспользуйтесь каталогом для выбора товара</p>
        <div className={styles.emptyCartButtons}>
          <Link href="/catalog"><ButtonOrange>Перейти в каталог</ButtonOrange></Link>
          <Link href="/order-status">
            <ButtonOrange className={styles.secondaryButton}>Статус заказа</ButtonOrange>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cartPage}>
      <h1 className={styles.cartTitle}>Корзина</h1>
      <div className={styles.cartContent}>
        <div className={styles.cartLeft}>
          <div className={styles.cartHeader}>
            <label><input type="checkbox" /> Выбрать все</label>
            <button className={styles.deleteSelected}>Удалить выбранные</button>
          </div>

          {cartItems.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <input type="checkbox" className={styles.checkbox} />
              <img src={item.image} alt={item.name} className={styles.itemImage} />
              <div className={styles.itemInfo}>
                <div className={styles.itemTitle}>{item.name}</div>
                <div className={styles.itemPrice}>
                  {item.price.toLocaleString()} {item.currency} + 12 000 бонусов
                </div>
              </div>
              <div className={styles.quantityControl}>
                <button onClick={() => decreaseQuantity(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseQuantity(item.id)}>+</button>
              </div>
            </div>
          ))}

          <div className={styles.customerInfo}>
            <h2 className={styles.sectionTitle}>Информация о получателе</h2>
            <div className={styles.inputGroup}>
              <input type="text" placeholder="Имя" className={styles.input} />
              <input type="text" placeholder="Фамилия" className={styles.input} />
            </div>
            <input type="text" placeholder="Номер телефона" className={styles.input} />
          </div>

          <div className={styles.deliverySection}>
            <h2 className={styles.sectionTitle}>Доставка курьером</h2>
            <div className={styles.inputGroup}>
              <input type="text" placeholder="Город" className={styles.input} />
              <input type="text" placeholder="Улица" className={styles.input} />
              <input type="text" placeholder="Дом" defaultValue="256" className={styles.input} />
            </div>
            <label className={styles.assemblyCheckbox}>
              <input type="checkbox" /> Необходима сборка мебели
            </label>
          </div>

          <div className={styles.paymentSection}>
            <h2 className={styles.sectionTitle}>Выберите способ оплаты</h2>
            <div className={styles.paymentMethods}>
              <label><input type="radio" name="payment" /> Счёт на оплату</label>
              <label><input type="radio" name="payment" /> Freedom Pay</label>
              <label><input type="radio" name="payment" /> Kaspi</label>
            </div>
          </div>
        </div>

        <div className={styles.cartRight}>
          <div className={styles.promoBlock}>
            <input type="text" placeholder="Введите промокод" className={styles.promoInput} />
            <button className={styles.applyPromo}>Применить</button>
          </div>

          <div className={styles.totalBlock}>
            <h2>Итого:</h2>
            <p>{cartItems.length} товара на сумму</p>
            <div className={styles.totalPrice}>
              {totalPrice.toLocaleString()} {cartItems[0]?.currency}
            </div>
            <p className={styles.discount}>Скидка - 240.000 KZT</p>
            <div className={styles.bonus}>+ 12 000 бонусов</div>
          </div>

          <ButtonOrange>Оформить заказ</ButtonOrange>

          <button onClick={clearCart} className={styles.clearCartButton}>Очистить корзину</button>

          <div className={styles.legalLinks}>
            <Link href="#">Доставка</Link>
            <Link href="#">Оферта физических лиц</Link>
            <Link href="#">Оферта для юридических лиц</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
