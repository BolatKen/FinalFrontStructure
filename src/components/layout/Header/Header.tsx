// import { HeaderItem } from "../../shared/HeaderItem/HeaderItem";
// import styles from "./Header.module.css";

// export default function Header() {
//   const headerItems = [
//     "Кресла",
//     "Столы",
//     "Диваны",
//     "Мойки",
//     "Стулья",
//     "Шкафы",
//     "Другая мебель",
//   ];

//   return (
//     <header className={styles.header}>
//       <div className={`${styles.header__inner} _container-bigger`}>
//         <div className={styles.header__logo}>Leka Beauty</div>

//         <ul className={styles.header__items}>
//           {headerItems.map((item, idx) => (
//             <HeaderItem key={idx} children={item} onClick={null} />
//           ))}
//         </ul>

//         <div className={`${styles.header__cart} ${styles.cart} icon`}>
//           <div className={styles.cart__icon}>
//             <div className={styles.cart__rect}></div>
//             <img
//               className={styles.cart__svg}
//               src="/icons/cart-icon.png"
//               alt="shopping-cart-line"
//             />
//           </div>
//           <div className="icon__notification">1</div>
//         </div>
//       </div>
//     </header>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { HeaderItem } from "../../shared/HeaderItem/HeaderItem";
import styles from "./Header.module.css";

export default function Header() {
  const [cartCount, setCartCount] = useState(0);

useEffect(() => {
  const handleStorageChange = () => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      const cartItems = JSON.parse(storedCart);
      setCartCount(cartItems.length); // <== ВАЖНО: просто длина массива товаров
    } else {
      setCartCount(0);
    }
  };

  window.addEventListener("storage", handleStorageChange);

  // Подгружаем сразу при старте
  handleStorageChange();

  return () => {
    window.removeEventListener("storage", handleStorageChange);
  };
}, []);


  return (
    <header className={styles.header}>
      <div className={`${styles.header__inner} _container-bigger`}>
        <div className={styles.header__logo}>Leka Beauty</div>

        <ul className={styles.header__items}>
          {["Кресла", "Столы", "Диваны", "Мойки", "Стулья", "Шкафы", "Другая мебель"].map((item, idx) => (
            <HeaderItem key={idx} children={item} onClick={null} />
          ))}
        </ul>

        <div className={`${styles.header__cart} ${styles.cart} icon`}>
          <div className={styles.cart__icon}>
            <div className={styles.cart__rect}></div>
            <img
              className={styles.cart__svg}
              src="/icons/cart-icon.png"
              alt="shopping-cart-line"
            />
          </div>
          {cartCount > 0 && ( // если товаров > 0, показываем
            <div className="icon__notification">{cartCount}</div>
          )}
        </div>
      </div>
    </header>
  );
}
