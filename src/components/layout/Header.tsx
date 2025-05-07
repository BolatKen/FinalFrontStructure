export default function Header() {
  return (
    <header className="header">
      <div className="header__inner _container-bigger">
        <div className="header__logo">Leka Beauty</div>

        <ul className="header__items">
          <li className="header__item">
            <a href="#" className="header__link">
              Кресла
            </a>
          </li>
          <li className="header__item">
            <a href="#" className="header__link">
              Столы
            </a>
          </li>
          <li className="header__item">
            <a href="#" className="header__link">
              Диваны
            </a>
          </li>
          <li className="header__item">
            <a href="#" className="header__link">
              Мойки
            </a>
          </li>
          <li className="header__item">
            <a href="#" className="header__link">
              Стулья
            </a>
          </li>
          <li className="header__item">
            <a href="#" className="header__link">
              Шкафы
            </a>
          </li>
          <li className="header__item">
            <a href="#" className="header__link">
              Другая мебель
            </a>
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
