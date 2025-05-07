export default function Description() {
  return (
    <div className="description">
      <div className="description__inner _container">
        <section className="specs">
          <h2 className="specs__title">Характеристики</h2>

          <div className="specs__tabs">
            <button className="tabs__btn tabs__btn--active">
              Характеристики
            </button>
            <button className="tabs__btn">Размеры</button>
            <button className="tabs__btn">Дизайнерам</button>
          </div>

          <div className="specs__main">
            <div className="specs__list">
              <div className="specs__row">
                <div className="specs__name">Наполнение</div>
                <div className="specs__value">пенополиуретан, холофайбер</div>
              </div>
              <div className="specs__row">
                <div className="specs__name">Тип обивки</div>
                <div className="specs__value">Экокожа</div>
              </div>
              <div className="specs__row">
                <div className="specs__name">Материал подлокотников</div>
                <div className="specs__value">Экокожа</div>
              </div>
              <div className="specs__row">
                <div className="specs__name">Материал каркаса</div>
                <div className="specs__value">Фанера (ЛДСП)</div>
              </div>
              <div className="specs__row">
                <div className="specs__name">Максимальная нагрузка</div>
                <div className="specs__value">180 кг</div>
              </div>
              <div className="specs__row">
                <div className="specs__name">Механизм</div>
                <div className="specs__value">пиастра</div>
              </div>
              <div className="specs__row">
                <div className="specs__name">Вариант доставки</div>
                <div className="specs__value">в разобранном виде</div>
              </div>
              <div className="specs__row">
                <div className="specs__name">Цвет</div>
                <div className="specs__value">металл</div>
              </div>
            </div>

            <div className="specs__media">
              {/* Изображения */}
              <div className="specs__images">
                <figure className="specs__image-item">
                  <img
                    src="/core/3.png"
                    alt="Вид спереди"
                    className="specs__img"
                  />
                  <figcaption className="specs__caption">
                    79 см × 52 см × 30 см
                  </figcaption>
                </figure>
                <figure className="specs__image-item">
                  <img
                    src="/core/4.png"
                    alt="Вид сбоку"
                    className="specs__img"
                  />
                  <figcaption className="specs__caption">
                    79 см × 52 см
                  </figcaption>
                </figure>
              </div>

              {/* Скачать */}
              <div className="specs__downloads">
                <div className="downloads__item">
                  <div className="downloads__info">
                    <div className="downloads__name">
                      Aurora 3Ds Max model.max
                    </div>
                    <div className="downloads__meta">
                      Corona Renderer · 54 мб
                    </div>
                  </div>
                  <button className="downloads__btn">Скачать</button>
                </div>
                <div className="downloads__item">
                  <div className="downloads__info">
                    <div className="downloads__name">
                      Инструкция по сборке.pdf
                    </div>
                    <div className="downloads__meta">2 мб</div>
                  </div>
                  <button className="downloads__btn">Скачать</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
