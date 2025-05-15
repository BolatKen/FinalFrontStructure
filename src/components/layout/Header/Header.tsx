"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HeaderItem } from "../../shared/HeaderItem/HeaderItem";
import styles from "./Header.module.css";

export default function Header({ isBlur = false }) {
  const [cartCount, setCartCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const handleStorageChange = () => {
      const storedCart = localStorage.getItem("cartItems");
      if (storedCart) {
        const cartItems = JSON.parse(storedCart);
        setCartCount(cartItems.length);
      } else {
        setCartCount(0);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    handleStorageChange();

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleCartClick = () => {
    router.push("/cart");
  };

  return (
    <header className={[styles.header, isBlur ? styles.header_blur : ''].join(" ")}>
      <div className={`${styles.header__inner} _container-bigger`}>
        <div className={styles.header__logo}>Leka Beauty</div>

        <ul className={styles.header__items}>
          {["Кресла", "Столы", "Диваны", "Мойки", "Стулья", "Шкафы", "Другая мебель"].map((item, idx) => (
            <HeaderItem key={idx} children={item} onClick={null} />
          ))}
        </ul>

        <div
          className={`${styles.header__cart} ${styles.cart} icon`}
          onClick={handleCartClick}
          style={{ cursor: "pointer" }}
        >
          <div className={styles.cart__icon}>
            <div className={[styles.cart__rect,
            isBlur ? styles.cart__rect_white : '',
            ].join(' ')}></div>
            {!isBlur ? (<img
              className={styles.cart__svg}
              src="/icons/cart-icon.png"
              alt="shopping-cart-line"
            />) : (
              <img
                className={styles.cart__svg}
                src="/icons/cart-icon-white.png"
                alt="shopping-cart-line"
              />
            )}
          </div>
          {cartCount > 0 && (
            <div className="icon__notification">{cartCount}</div>
          )}
        </div>
      </div>
    </header>
  );
}
