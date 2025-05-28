"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HeaderItem } from "../../shared/HeaderItem/HeaderItem";
import styles from "./Header.module.css";
import { Category } from "@/types/category";
import { getCategories } from "@/services/category.service";
import Link from "next/link";

export default function Header({ isBlur = false }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  const parentCategories = categories.filter(
    (cat) => cat.parent === null && cat.is_in_welcome
  );

  const childCategories = (parentId: number) =>
    categories.filter((cat) => cat.parent === parentId);

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


   const spanStyle = {
    height: '3px',
    backgroundColor: isBlur ? '#ffffff' : '#000000',
    margin: '5px 0',
    borderRadius: '2px',
    transition: '0.3s',
    display: 'block',
  };

  return (
    <header className={[styles.header, isBlur ? styles.header_blur : ""].join(" ")}>
      <div className={`${styles.header__inner} _container-bigger`}>
        <div className={[styles.header__logo, styles.logo].join(' ')}>
          <div
            className={styles.burger}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <span style={spanStyle}/>
            <span style={spanStyle}/>
          </div>
          <Link href="/" className={styles.logo__link}>
            <div className={[styles.logo__item, '_img'].join(' ')}>
              {
                isBlur ? (<img src="/logo/LB_light.svg" alt="Логотип Leka Beauty" />) :
                  (<img src="/logo/LB.svg" alt="Логотип Leka Beauty" />)
              }
            </div>
            <div className={styles.logo__text}>Leka Beauty</div>
          </Link>
        </div>

        <ul className={styles.header__items}>
          {parentCategories.map((parent) => (
            <HeaderItem
              key={parent.id}
              category={parent}
              childrenCategories={childCategories(parent.id)}
            />
          ))}
          {/* <li className={styles.header__item}>
            <Link href={`/order-status/`}>
              Статус заказа
            </Link>
          </li> */}
        </ul>

        <div
          className={`${styles.header__cart} ${styles.cart} icon`}
          onClick={handleCartClick}
          style={{ cursor: "pointer" }}
        >
          <div className={styles.cart__icon}>
            <div
              className={[
                styles.cart__rect,
                isBlur ? styles.cart__rect_white : "",
              ].join(" ")}
            ></div>
            {!isBlur ? (
              <img
                className={styles.cart__svg}
                src="/icons/cart-icon.png"
                alt="shopping-cart-line"
              />
            ) : (
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

      {isMenuOpen && (
        <>
          <div
            className={styles.burgerOverlay}
            onClick={() => setIsMenuOpen(false)}
          />
          <nav className={styles.burgerMenu}>
            <button
              className={styles.burgerMenuClose}
              onClick={() => setIsMenuOpen(false)}
              aria-label="Закрыть меню"
            >
              ×
            </button>
            <ul className={styles.burgerMenuList}>
  {/* Динамические категории */}
  {parentCategories.map((parent) => (
    <li key={parent.id}>
      <button
        className={styles.burgerToggle}
        onClick={() => toggleSection(parent.name)}
      >
        <Link href={`/catalog/categories/${parent.slug}`}>{parent.name}</Link>
        <span
          className={
            openSection === parent.name
              ? styles.arrowUp
              : styles.arrowDown
          }
        />
      </button>

      {openSection === parent.name &&
        childCategories(parent.id).length > 0 && (
          <ul className={styles.subMenu}>
            {childCategories(parent.id).map((child) => (
              <li key={child.id}>
                <Link href={`/catalog/categories/${child.slug}`}>
                  {child.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
    </li>
  ))}

  {/* Статичные пункты — как динамичные */}
  <li>
    <Link href="/addresses">
      <span className={styles.burgerToggle}>Контакты</span>
    </Link>
  </li>
  <li>
    <Link href="/warranty">
      <span className={styles.burgerToggle}>Гарантия</span>
    </Link>
  </li>
  {/* <li>
    <Link href="/order-status">
      <span className={styles.burgerToggle}>Доставка и оплата</span>
    </Link>
  </li> */}
  <li>
    <Link href="/info">
      <span className={styles.burgerToggle}>О компании</span>
    </Link>
  </li>
</ul>

{/* Мессенджеры */}
<div className={styles.messengerLinks}>
  <a href="https://wa.me/7702270000" target="_blank" rel="noopener noreferrer">
    <img src="/icons/burger/whatsapp-svgrepo-com.svg" alt="WhatsApp" />
  </a>
  <a href="https://t.me/lekabeauty" target="_blank" rel="noopener noreferrer">
    <img src="/icons/burger/telegram-svgrepo-com.svg" alt="Telegram" />
  </a>
  <a href="https://www.instagram.com/lekabeauty" target="_blank" rel="noopener noreferrer">
    <img src="/icons/burger/instagram-svgrepo-com.svg" alt="Instagram" />
  </a>
</div>


          </nav>
        </>
      )}
    </header>
  );
}
