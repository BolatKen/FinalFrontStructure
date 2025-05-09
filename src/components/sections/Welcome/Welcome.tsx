import ColorSelector from "../../ui/ColorItem/ColorItem";
import { ButtonPrimary } from '../../ui/ButtonPrimary/ButtonPrimary';
import { ButtonOrange } from '../../ui/ButtonOrange/ButtonOrange';
import { ColorConfigure } from '../../shared/ColorConfigure/ColorConfigure';
import styles from "./Welcome.module.css";

export default function Welcome() {

  const colorConfData = [
    {
      'configureTitle': 'Цвет и материал',
      'colorData': [
        {
          'imageUrl': '/textures/material-yellow.png',
          'altText': 'Желтый',
          'isSelected': true
        },
        {
          'imageUrl': '/textures/material-white.png',
          'altText': 'Белый',
          'isSelected': false
        },
        {
          'imageUrl': '/textures/material-brown.png',
          'altText': 'Коричневый',
          'isSelected': false
        }
      ]
    },
    {
      'configureTitle': 'Каркас',
      'colorData': [
        {
          'imageUrl': '/textures/wood-white.png',
          'altText': 'color-material-4',
          'isSelected': true
        },
      ]
    }
  ]

  return (
    <main className={styles.welcome}>
      <div className={styles.welcome__product}>
        <div className={`${styles.welcome__inner} _container-bigger`}>
          <div className={`${styles.welcome__arrow} ${styles.arrow}`}>
            <img
              className={styles.arrow__item}
              src="/core/arrow.svg"
              alt="arrow-left"
            />
          </div>
          <div className={`${styles.welcome__container} _container`}>
            <div className={styles.welcome__title}>zenspace</div>
            <div className={styles.welcome__img}>
              <img
                className={styles.welcome__item}
                src="/core/1.png"
                alt="main-welcome-image"
              />
            </div>
            <div className={`${styles.welcome__info} ${styles.info}`}>
              <div className={`${styles.info__option} ${styles.option}`}>
                <div className={`${styles.option__item} ${styles.option__item_selected}`}>
                  Галерея
                </div>
                <div className={styles.option__item}>Смотреть в 3D</div>
              </div>
              <div className={styles.info__items}>
                <div className={styles.info__item}></div>
                <div className={styles.info__item}></div>
                <div className={styles.info__item}></div>
                <div className={styles.info__item}></div>
                <div className={`${styles.info__item} ${styles.info__item_selected}`}></div>
              </div>
            </div>
          </div>
          <div className={`${styles.welcome__arrow} ${styles.arrow}`}>
            <img
              className={`${styles.arrow__item} ${styles.arrow__item_left}`}
              src="/core/arrow.svg"
              alt="arrow-left"
            />
          </div>
        </div>
      </div>
      <div className={styles.welcome__price}>
        <div className={`_container ${styles.configure}`}>
          <div className={styles.configure__inner}>
            <div className={styles.configure__material}>
              {colorConfData.map((item, key) => (
                <ColorConfigure
                  key={key}
                  configureTitle={item.configureTitle}
                  colorData={item.colorData} />
              ))}
              <ButtonPrimary children={"Конфигуратор"} onClick={null} />
            </div>
            <div className={`${styles.configure__price} ${styles.price}`}>
              <div className={styles.price__item}>
                <div className={styles.configure__title}>Цена</div>
                <div className={styles.price__text}>240.000 KZT</div>
                <div className={`${styles.price__bonus} ${styles.bonus}`}>
                  <div className={styles.bonus__icon}>
                    <p className={styles.bonus__text}>б</p>
                  </div>
                  <div className={styles.bonus__value}>+ 12 000 бонусов</div>
                </div>
              </div>
              <div className={`${styles.price__btn} ${styles.btn}`}>
                <ButtonOrange children={'Купить'} onClick={null} type={'button'} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
