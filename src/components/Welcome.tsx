<<<<<<< HEAD
import ColorSelector from "./ui/color-selector";
=======
import { ButtonPrimary } from './ButtonPrimary/ButtonPrimary';
>>>>>>> a43f657 (added primary button component)

export default function Welcome() {
  return (
    <main className="welcome">
      <div className="welcome__product">
        <div className="welcome__inner _container-bigger">
          <div className="welcome__arrow arrow">
            <img
              className="arrow__item"
              src="/core/arrow.svg"
              alt="arrow-left"
            />
          </div>
          <div className="welcome__container _container">
            <div className="welcome__title">zenspace</div>
            <div className="welcome__img">
              <img
                className="welcome__item"
                src="/core/1.png"
                alt="main-welcome-image"
              />
            </div>
            <div className="welcome__info info">
              <div className="info__option option">
                <div className="option__item option__item_selected">
                  Галерея
                </div>
                <div className="option__item">Смотреть в 3D</div>
              </div>
              <div className="info__items">
                <div className="info__item"></div>
                <div className="info__item"></div>
                <div className="info__item"></div>
                <div className="info__item"></div>
                <div className="info__item info__item_selected"></div>
              </div>
            </div>
          </div>
          <div className="welcome__arrow arrow">
            <img
              className="arrow__item arrow__item_left"
              src="/core/arrow.svg"
              alt="arrow-left"
            />
          </div>
        </div>
      </div>
      <div className="welcome__price">
        <div className="_container configure">
          <div className="configure__inner">
            <div className="configure__material">
              <div className="configure__color color">
                <div className="configure__title">Цвет и материал</div>
                <ul className="color__items color__margin">
                  <li className="color__item color__item_selected">
                    <ColorSelector
                      imageUrl="/textures/material-yellow.png"
                      alt="Желтый"
                      selected
                    />
                  </li>
                  <li className="color__item">
                    <ColorSelector
                      imageUrl="/textures/material-white.png"
                      alt="Белый"
                    />
                  </li>
                  <li className="color__item">
                    <ColorSelector
                      imageUrl="/textures/material-brown.png"
                      alt="Коричневый"
                    />
                  </li>
                </ul>
              </div>
              <div className="configure__color color">
                <div className="configure__title">Каркас</div>
                <ul className="color__items color__margin">
                  <li className="color__item color__item_selected">
                    <img
                      src="/textures/wood-white.png"
                      alt="color-material-4"
                    />
                  </li>
                </ul>
              </div>
              <ButtonPrimary children={"Конфигуратор"} onClick={null}/>
            </div>
            <div className="configure__price price">
              <div className="price__item">
                <div className="configure__title">Цена</div>
                <div className="price__text">240.000 KZT</div>
                <div className="price__bonus bonus">
                  <div className="bonus__icon">
                    <p className="bonus__text">б</p>
                  </div>
                  <div className="bonus__value">+ 12 000 бонусов</div>
                </div>
              </div>
              <div className="price__btn btn">
                <button className="btn__action">Купить</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
