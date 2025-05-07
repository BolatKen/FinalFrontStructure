import { HeaderItem } from "./HeaderItem/HeaderItem";

export default function Header() {
  const headerItems = [
    'Кресла',
    'Столы',
    'Диваны',
    'Мойки',
    'Стулья',
    'Шкафы',
    'Другая мебель'
  ]

  return (
    <header className="header">
      <div className="header__inner _container-bigger">
        <div className="header__logo">Leka Beauty</div>

        <ul className="header__items">
          {headerItems.map((item, idx) => (
            <HeaderItem key={idx} children={item} onClick={null} />
          ))}
        </ul>

        <div className="header__cart cart icon">
          <div className="cart__icon">
            <div className="cart__rect"></div>
            <img
              className="cart__svg"
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
