import styles from "./Configurator.module.css";
import { ButtonPrimary } from '../../ui/ButtonPrimary/ButtonPrimary';
import { ButtonOrange } from '../../ui/ButtonOrange/ButtonOrange';
import { ColorConfigureEdit } from '../../shared/ColorConfigureEdit/ColorConfigureEdit';

export default function Configurator() {
  const productItemBtns = [
    {
      children: 'Подлокотники',
      onClick: null,
      isSelected: true,
      isPadding: true,
      isNotification: true
    },
    {
      children: 'Без подлокотника',
      onClick: null,
      isSelected: false,
      isPadding: true,
      isNotification: false
    }
  ]

  const colorConfigure = [
    {
      configureTitle: 'Обивка',
      configureVal: 'Черный, экокожа',
      colorData: [
        {
          'imageUrl': '/textures/material-black.png',
          'altText': 'Черный',
          'isSelected': true
        },
        {
          'imageUrl': '/textures/material-green.png',
          'altText': 'Зеленый',
          'isSelected': false
        },
        {
          'imageUrl': '/textures/material-blue.png',
          'altText': 'Синий',
          'isSelected': false
        },
        {
          'imageUrl': '/textures/material-pink.png',
          'altText': 'Розовый',
          'isSelected': false
        }
      ]
    },
    {
      configureTitle: 'Каркас',
      configureVal: 'Темное дерево',
      colorData: [
        {
          'imageUrl': '/textures/wood-dark.png',
          'altText': 'Темное дерево',
          'isSelected': true
        },
        {
          'imageUrl': '/textures/wood-white.png',
          'altText': 'Светлое дерево',
          'isSelected': false
        },
      ]
    }
  ]

  return (
    <div className={styles.configurator}>
      <section className={[styles.configurator__inner, '_container'].join(" ")}>
        <div className={styles.configurator__main}>
          {/* Фото товара */}
          <div className={[styles.configurator__image, '_img'].join(" ")}>
            <img src="/core/2.png" alt="Кресло Aurora" />
          </div>
          {/* Панель выбора */}
          <div className={styles.configurator__panel}>
            <h2 className={[styles.configurator__title, 'title'].join(" ")}>Конфигуратор</h2>

            <div className={styles.configurator__icon}>
              <p className={styles.configurator__text}>
                Создайте уникальную мебель, отражающую ваш вкус и
                интерьер
              </p>
              <div className={[styles['configurator__icon-element'], '_img'].join(" ")}>
                <img src="icons/Union.svg" alt="Знак подсказки" />
              </div>
            </div>

            <div className={[styles.configurator__group, styles.group].join(" ")}>
              {productItemBtns.map((item, idx) => (
                <ButtonPrimary key={idx}
                  children={item.children}
                  onClick={item.onClick}
                  isSelected={item.isSelected}
                  isNotification={item.isNotification}
                  isPadding={item.isPadding} />
              ))}
            </div>

            {colorConfigure.map((item, idx) => (
              <ColorConfigureEdit key={idx} configureTitle={item.configureTitle}
                configureVal={item.configureVal}
                colorData={item.colorData} />
            ))}

            <ButtonOrange className={styles['configurator__button-last']} children={'Под заказ'} onClick={null} type={"button"} />
          </div>
        </div>

        {/* Описание */}
        <div className={[styles['configurator__description'], styles['configurator-text']].join(" ")}>
          <h3 className={[styles['configurator-text__title'], 'title'].join(" ")}>Aurora</h3>
          <p className={styles['configurator-text__desc']}>
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
