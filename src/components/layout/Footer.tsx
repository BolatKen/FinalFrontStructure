export default function Footer() {
  return (
    <footer className="footer">
      <div className="_container">
        <div className="footer__upper">
          {/* Горизонтальное меню */}
          <div className="footer__header">
            <ul className="footer__list footer-list">
              <li className="footer-list__item">
                <a href="#" className="footer-list__link">
                  Кресла
                </a>
              </li>
              <li className="footer-list__item">
                <a href="#" className="footer-list__link">
                  Мойки
                </a>
              </li>
              <li className="footer-list__item">
                <a href="#" className="footer-list__link">
                  Диваны
                </a>
              </li>
              <li className="footer-list__item">
                <a href="#" className="footer-list__link">
                  Столы
                </a>
              </li>
              <li className="footer-list__item">
                <a href="#" className="footer-list__link">
                  Стулья
                </a>
              </li>
              <li className="footer-list__item">
                <a href="#" className="footer-list__link">
                  Шкафы
                </a>
              </li>
              <li className="footer-list__item">
                <a href="#" className="footer-list__link">
                  Другая мебель
                </a>
              </li>
            </ul>
          </div>

          {/* Контент футера */}
          <div className="footer__content">
            {/* Левая колонка */}
            <div className="footer__column">
              <div className="footer__logo">Leka Beauty</div>
              <div className="footer__desc">
                Больше чем просто мебель для вашего бизнеса
              </div>

              <div className="footer__contacts">
                <div className="footer__phone">+7 (702) 270 000</div>
                <div className="footer__email">leka_solnce@bk.ru</div>
              </div>

              <div className="footer__info">
                <div className="footer__info-block">
                  <div className="footer__info-title">Офис продаж</div>
                  <div className="footer__info-text">
                    Биянху 67, Алматы, Казахстан
                  </div>
                </div>
                <div className="footer__info-block">
                  <div className="footer__info-title">Режим работы</div>
                  <div className="footer__info-text">
                    Пн–пт с 10:00 до 19:00, Сб–вс с 9:00 до 17:00
                  </div>
                </div>
              </div>
            </div>

            {/* Правая колонка */}
            <div className="footer__column">
              <ul className="footer__menu">
                <li>
                  <a href="#">Контакты</a>
                </li>
                <li>
                  <a href="#">Гарантия</a>
                </li>
                <li>
                  <a href="#">Доставка и оплата</a>
                </li>
                <li>
                  <a href="#">О компании</a>
                </li>
              </ul>

              <div className="footer__whatsapp">
                <div className="footer__whatsapp-icon">
                  <img src="/icons/whatsapp-line.png" alt="WhatsApp" />
                </div>
                <div className="footer__whatsapp-text">
                  <div className="footer__whatsapp-title">Офис продаж</div>
                  <a
                    href="https://wa.me/7702270000"
                    className="footer__whatsapp-link"
                  >
                    Написать в Whatsapp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Нижняя часть футера */}
      <div className="_container-bigger">
        <div className="footer__bottom">
          <div className="footer__copyright">2025 © Leka Beauty</div>
          <ul className="footer__conf conf">
            <li className="conf__item">
              <a href="#" className="conf__link">
                Публичная оферта
              </a>
            </li>
            <li className="conf__item">
              <a href="#" className="conf__link">
                Политика конфиденциальности
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
