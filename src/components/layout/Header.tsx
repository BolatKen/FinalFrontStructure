import Link from "next/link";

export default function Header() {
  return (
    <header className="header">
      <div className="header__inner _container-bigger">
        <div className="header__logo">Leka Beauty</div>

        <ul className="header__items">
          <li className="header__item">
            <Link
              href="/catalog
            "
              className="header__link"
            >
              Кресла
            </Link>
          </li>
          <li className="header__item">
            <Link href="#" className="header__link">
              Столы
            </Link>
          </li>
          <li className="header__item">
            <Link href="#" className="header__link">
              Диваны
            </Link>
          </li>
          <li className="header__item">
            <Link href="#" className="header__link">
              Мойки
            </Link>
          </li>
          <li className="header__item">
            <Link href="#" className="header__link">
              Стулья
            </Link>
          </li>
          <li className="header__item">
            <Link href="#" className="header__link">
              Шкафы
            </Link>
          </li>
          <li className="header__item">
            <Link href="#" className="header__link">
              Другая мебель
            </Link>
          </li>
        </ul>

        <div className="header__cart cart icon">
          <div className="cart__icon">
            <div className="cart__rect"></div>
            <img
              className="cart__svg"
              src="/icons/cart-icon.svg"
              alt="shopping-cart-line"
            />
          </div>
          <div className="icon__notification">1</div>
        </div>
      </div>
    </header>
  );
}
