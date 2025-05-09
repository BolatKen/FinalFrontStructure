import { HeaderItem } from "../../shared/HeaderItem/HeaderItem";
import styles from "./Header.module.css";

export default function Header() {
  const headerItems = [
    "Кресла",
    "Столы",
    "Диваны",
    "Мойки",
    "Стулья",
    "Шкафы",
    "Другая мебель",
  ];

  return (
    <header className={styles.header}>
      <div className={`${styles.header__inner} _container-bigger`}>
        <div className={styles.header__logo}>Leka Beauty</div>

        <ul className={styles.header__items}>
          {headerItems.map((item, idx) => (
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
          <div className="icon__notification">1</div>
        </div>
      </div>
    </header>
  );
}
