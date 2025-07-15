"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { HeaderItem } from "../../shared/HeaderItem/HeaderItem";
import styles from "./Header.module.css";
import { Category } from "@/types/category";
import { getCategories } from "@/services/category.service";
import Link from "next/link";
import Image from "next/image";

export default function Header({ isBlur = false }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const toggleSection = useCallback((section: string) => {
    setOpenSection((prev) => (prev === section ? null : section));
  }, []);

  // Мемоизируем категории для предотвращения лишних рендеров
  const { parentCategories, childCategoriesMap } = useMemo(() => {
    const parentCats = categories.filter(
      (cat) => cat.parent === null && cat.is_in_welcome
    );

    const childCatsMap = new Map();
    categories.forEach((cat) => {
      if (cat.parent !== null) {
        if (!childCatsMap.has(cat.parent)) {
          childCatsMap.set(cat.parent, []);
        }
        childCatsMap.get(cat.parent).push(cat);
      }
    });

    return {
      parentCategories: parentCats,
      childCategoriesMap: childCatsMap,
    };
  }, [categories]);

  const childCategories = useCallback(
    (parentId: number) => childCategoriesMap.get(parentId) || [],
    [childCategoriesMap]
  );

  useEffect(() => {
    // Кешируем категории
    const cachedCategories = sessionStorage.getItem("headerCategories");
    if (cachedCategories) {
      setCategories(JSON.parse(cachedCategories));
    } else {
      getCategories().then((cats) => {
        setCategories(cats);
        sessionStorage.setItem("headerCategories", JSON.stringify(cats));
      });
    }
  }, []);

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

  const handleCartClick = useCallback(() => {
    router.push("/cart");
  }, [router]);

  const spanStyle = useMemo(
    () => ({
      height: "3px",
      backgroundColor: isBlur ? "#ffffff" : "#000000",
      margin: "5px 0",
      borderRadius: "2px",
      transition: "0.3s",
      display: "block" as const,
    }),
    [isBlur]
  );

  return (
    <header
      className={[styles.header, isBlur ? styles.header_blur : ""].join(" ")}
    >
      <div className={`${styles.header__inner} _container-bigger`}>
        <div className={[styles.header__logo, styles.logo].join(" ")}>
          <div className={styles.burger} onClick={toggleMenu}>
            <span style={spanStyle} />
            <span style={spanStyle} />
          </div>
          <Link href="/" className={styles.logo__link} prefetch={true}>
            <div className={[styles.logo__item, "_img"].join(" ")}>
              {isBlur ? (
                <Image
                  src="/logo/LB_light.svg"
                  alt="Логотип Leka Beauty"
                  width={40}
                  height={40}
                  priority
                />
              ) : (
                <Image
                  src="/logo/LB.svg"
                  alt="Логотип Leka Beauty"
                  width={40}
                  height={40}
                  priority
                />
              )}
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
              <Image
                className={styles.cart__svg}
                src="/icons/cart-icon.png"
                alt="shopping-cart-line"
                width={24}
                height={24}
                priority
              />
            ) : (
              <Image
                className={styles.cart__svg}
                src="/icons/cart-icon-white.png"
                alt="shopping-cart-line"
                width={24}
                height={24}
                priority
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
          <div className={styles.burgerOverlay} onClick={closeMenu} />
          <nav className={styles.burgerMenu}>
            <button
              className={styles.burgerMenuClose}
              onClick={closeMenu}
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
                    <Link
                      href={`/catalog/categories/${parent.slug}`}
                      prefetch={true}
                    >
                      {parent.name}
                    </Link>
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
                        {childCategories(parent.id).map((child: Category) => (
                          <li key={child.id}>
                            <Link
                              href={`/catalog/categories/${child.slug}`}
                              prefetch={true}
                            >
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
                <Link href="/addresses" prefetch={true}>
                  <span className={styles.burgerToggle}>Контакты</span>
                </Link>
              </li>
              <li>
                <Link href="/warranty" prefetch={true}>
                  <span className={styles.burgerToggle}>Гарантия</span>
                </Link>
              </li>
              <li>
                <Link href="/info" prefetch={true}>
                  <span className={styles.burgerToggle}>О компании</span>
                </Link>
              </li>
            </ul>

            {/* Мессенджеры */}
            <div className={styles.messengerLinks}>
              <a
                href="https://wa.me/77022720000"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/icons/burger/whatsapp-svgrepo-com.svg"
                  alt="WhatsApp"
                />
              </a>
              {/* <a href="https://t.me/lekabeauty" target="_blank" rel="noopener noreferrer">
    <img src="/icons/burger/telegram-svgrepo-com.svg" alt="Telegram" />
  </a> */}
              <a
                href="https://www.instagram.com/oborudovaniedliasalonov"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/icons/burger/instagram-svgrepo-com.svg"
                  alt="Instagram"
                />
              </a>
            </div>
          </nav>
        </>
      )}
    </header>
  );
}
