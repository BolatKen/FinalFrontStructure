import styles from "./Description.module.css";

export default function Description() {
  return (
    <div className={styles.description}>
      <div className={`${styles.description__inner} _container`}>
        <section className={styles.specs}>
          <h2 className={styles.specs__title}>Характеристики</h2>

          <div className={styles.specs__tabs}>
            <button className={`${styles.tabs__btn} ${styles.tabs__btn_active}`}>
              Характеристики
            </button>
            <button className={styles.tabs__btn}>Размеры</button>
            <button className={styles.tabs__btn}>Дизайнерам</button>
          </div>

          <div className={styles.specs__main}>
            <div className={styles.specs__list}>
              <div className={styles.specs__row}>
                <div className={styles.specs__name}>Наполнение</div>
                <div className={styles.specs__line}></div>
                <div className={styles.specs__value}>пенополиуретан, холофайбер</div>
              </div>
              <div className={styles.specs__row}>
                <div className={styles.specs__name}>Тип обивки</div>
                <div className={styles.specs__line}></div>
                <div className={styles.specs__value}>Экокожа</div>
              </div>
              <div className={styles.specs__row}>
                <div className={styles.specs__name}>Материал подлокотников</div>
                <div className={styles.specs__line}></div>
                <div className={styles.specs__value}>Экокожа</div>
              </div>
              <div className={styles.specs__row}>
                <div className={styles.specs__name}>Материал каркаса</div>
                <div className={styles.specs__line}></div>
                <div className={styles.specs__value}>Фанера (ЛДСП)</div>
              </div>
              <div className={styles.specs__row}>
                <div className={styles.specs__name}>Максимальная нагрузка</div>
                <div className={styles.specs__line}></div>
                <div className={styles.specs__value}>180 кг</div>
              </div>
              <div className={styles.specs__row}>
                <div className={styles.specs__name}>Механизм</div>
                <div className={styles.specs__line}></div>
                <div className={styles.specs__value}>пиастра</div>
              </div>
              <div className={styles.specs__row}>
                <div className={styles.specs__name}>Вариант доставки</div>
                <div className={styles.specs__line}></div>
                <div className={styles.specs__value}>в разобранном виде</div>
              </div>
              <div className={styles.specs__row}>
                <div className={styles.specs__name}>Цвет</div>
                <div className={styles.specs__line}></div>
                <div className={styles.specs__value}>металл</div>
              </div>
            </div>

            <div className={styles.specs__media}>
              {/* Изображения */}
              <div className={styles.specs__images}>
                <figure className={styles.specs__imageItem}>
                  <img
                    src="/core/3.png"
                    alt="Вид спереди"
                    className={styles.specs__img}
                  />
                  <figcaption className={styles.specs__caption}>
                    79 см × 52 см × 30 см
                  </figcaption>
                </figure>
                <figure className={styles.specs__imageItem}>
                  <img
                    src="/core/4.png"
                    alt="Вид сбоку"
                    className={styles.specs__img}
                  />
                  <figcaption className={styles.specs__caption}>
                    79 см × 52 см
                  </figcaption>
                </figure>
              </div>

              {/* Скачать */}
              <div className={styles.specs__downloads}>
                <div className={styles.downloads__item}>
                  <div className={styles.downloads__info}>
                    <div className={styles.downloads__name}>
                      Aurora 3Ds Max model.max
                    </div>
                    <div className={styles.downloads__meta}>
                      Corona Renderer · 54 мб
                    </div>
                  </div>
                  <button className={styles.downloads__btn}>Скачать</button>
                </div>
                <div className={styles.downloads__item}>
                  <div className={styles.downloads__info}>
                    <div className={styles.downloads__name}>
                      Инструкция по сборке.pdf
                    </div>
                    <div className={styles.downloads__meta}>2 мб</div>
                  </div>
                  <button className={styles.downloads__btn}>Скачать</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
