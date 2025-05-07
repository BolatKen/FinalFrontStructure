import ColorSelector from "./ui/color-selector";

export default function Configurator() {
  return (
    <div className="configurator">
      <section className="configurator _container">
        <div className="configurator__main">
          {/* Фото товара */}
          <div className="configurator__image _img">
            <img src="/core/2.png" alt="Кресло Aurora" />
          </div>
          {/* Панель выбора */}
          <div className="configurator__panel">
            <h2 className="configurator__title">Конфигуратор</h2>

            <div className="configurator__icon">
              <p className="configurator__text">
                Создайте уникальную мебель, отражающую ваш <br /> вкус и
                интерьер
              </p>
            </div>

            {/* Радиокнопки */}
            <div className="configurator__group group">
              <div className="group__button btn icon">
                <button className="btn__item btn__item_padding btn__item_selected">
                  Подлокотники
                </button>
                <div className="icon__notification">
                  <img src="/assets/check.png" alt="check-icon" />
                </div>
              </div>
              <div className="group__button btn icon">
                <button className="btn__item btn__item_padding">
                  Без подлокотника
                </button>
              </div>
            </div>

            {/* Обивка */}
            <div className="configurator__option color variant">
              <div className="variant__title">
                <div className="variant__text">Обивка</div>
                <div className="variant__subtext">Черный, экокожа</div>
              </div>
              <div className="variant__inner">
                <ul className="color__items">
                  <li className="color__item color__item_selected">
                    <ColorSelector
                      imageUrl="/textures/material-black.png"
                      alt="Черный"
                      selected
                    />
                  </li>
                  <li className="color__item">
                    <ColorSelector
                      imageUrl="/textures/material-green.png"
                      alt="Зеленый"
                    />
                  </li>
                  <li className="color__item">
                    <ColorSelector
                      imageUrl="/textures/material-blue.png"
                      alt="Синий"
                    />
                  </li>
                  <li className="color__item">
                    <ColorSelector
                      imageUrl="/textures/material-pink.png"
                      alt="Розовый"
                    />
                  </li>
                </ul>
                <div className="variant__button btn">
                  <button className="btn__item">Под заказ</button>
                </div>
              </div>
            </div>

            {/* Каркас */}
            <div className="configurator__option color variant">
              <div className="variant__title">
                <div className="variant__text">Каркас</div>
                <div className="variant__subtext">Темное дерево</div>
              </div>
              <div className="variant__inner">
                <ul className="color__items">
                  <li className="color__item color__item_selected">
                    <ColorSelector
                      imageUrl="/textures/wood-dark.png"
                      alt="Темное дерево"
                      selected
                    />
                  </li>
                  <li className="color__item">
                    <ColorSelector
                      imageUrl="/textures/wood-white.png"
                      alt="Светлое дерево"
                    />
                  </li>
                </ul>
                <div className="variant__button btn">
                  <button className="btn__item">Под заказ</button>
                </div>
              </div>
            </div>

            {/* Кнопка под заказ */}
            <div className="configurator__btn btn">
              <button className="btn__action">Под заказ</button>
            </div>
          </div>
        </div>

        {/* Описание */}
        <div className="configurator__description configurator-text">
          <h3 className="configurator-text__title">Aurora</h3>
          <p className="configurator-text__desc">
            «Бусиновский парк» расположен на севере Москвы — в районе Западное
            Дегунино, в 20 минутах пешком от метро «Ховрино» и 15 от МЦД
            «Грачёвская». Яркий и современный образ жилого квартала создают
            башни- доминанты — у каждой из них свой уникальный фасад,
            разработанный российскими архитектурными бюро.
          </p>
        </div>
      </section>
    </div>
  );
}
