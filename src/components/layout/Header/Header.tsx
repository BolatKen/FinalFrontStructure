"use client";

import { useEffect, useState } from "react";
import { HeaderItem } from "../../shared/HeaderItem/HeaderItem";
import Modal from "@/components/ui/Modal/Modal";
import CartContent from "@/components/cartComp/CartContent";
import styles from "./Header.module.css";

export default function Header({ isBlur = false }) {
  const [cartCount, setCartCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          onClick={() => setIsModalOpen(true)}
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

        {/* Модалка */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <CartContent />
        </Modal>
      </div>
    </header>
  );
}

