import styles from "./Configurator.module.css";
import { ButtonPrimary } from "../../ui/ButtonPrimary/ButtonPrimary";
import { ButtonOrange } from "../../ui/ButtonOrange/ButtonOrange";
import { ColorConfigureEdit } from "../../shared/ColorConfigureEdit/ColorConfigureEdit";
import { info } from "console";

import Image from "next/image";

interface ProductOption {
  id: number;
  option_type_display: string;
  value: string;
  code: string;
}

interface ProductPartDimension {
  id: number;
  name: string;
  value: string;
  unit: string;
}

interface ProductPart {
  id: number;
  name: string;
  dimensions: ProductPartDimension[];
}

interface VariantOption {
  id: number;
  option_display: {
    id: number;
    option_type_display: string;
    value: string;
    code: string;
  };
}

interface Variant {
  id: number;
  sku: string;
  price: string;
  old_price?: string | null;
  currency: string;
  variant_options: VariantOption[];
}

interface ProductImage {
  id: number;
  image: string;
  alt: string;
  type: string;
  type_display: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  base_sku: string;
  slug: string;
  category: string;
  model_url: string;
  options: ProductOption[];
  parts: ProductPart[];
  variants: Variant[];
  images: ProductImage[];
}

interface ConfiguratorProps {
  product: Product;
}

export default function Configurator({ product }: ConfiguratorProps) {
  if (!product?.options) {
    return <div>Загрузка характеристик...</div>; // или просто null
  }
  const productItemBtns = [
    {
      children: "Подлокотники",
      onClick: null,
      isSelected: true,
      isPadding: true,
      isNotification: true,
    },
    {
      children: "Без подлокотника",
      onClick: null,
      isSelected: false,
      isPadding: true,
      isNotification: false,
    },
  ];

  const colorConfigure = [
    {
      configureTitle: "Обивка",
      configureVal: "Черный, экокожа",
      colorData: [
        {
          imageUrl: "/textures/material-black.png",
          altText: "Черный",
          isSelected: true,
        },
        {
          imageUrl: "/textures/material-green.png",
          altText: "Зеленый",
          isSelected: false,
        },
        {
          imageUrl: "/textures/material-blue.png",
          altText: "Синий",
          isSelected: false,
        },
        {
          imageUrl: "/textures/material-pink.png",
          altText: "Розовый",
          isSelected: false,
        },
      ],
    },
    {
      configureTitle: "Каркас",
      configureVal: "Темное дерево",
      colorData: [
        {
          imageUrl: "/textures/wood-dark.png",
          altText: "Темное дерево",
          isSelected: true,
        },
        {
          imageUrl: "/textures/wood-white.png",
          altText: "Светлое дерево",
          isSelected: false,
        },
      ],
    },
  ];

  const information = {
    title: product.name,
    description: product.description,
  };
  return (
    <div className={styles.configurator}>
      <section className={[styles.configurator__inner, "_container"].join(" ")}>
        <div className={styles.configurator__main}>
          {/* Фото товара */}
          <div className={[styles.configurator__image, "_img"].join(" ")}>
            <Image
              src={
                product.images.find((img) => img.type === "MAIN")?.image || ""
              }
              alt="Кресло Aurora"
              fill
            />
          </div>
          {/* Панель выбора */}
          <div className={styles.configurator__panel}>
            <h2 className={[styles.configurator__title, "title"].join(" ")}>
              Конфигуратор
            </h2>

            <div className={styles.configurator__icon}>
              <p className={styles.configurator__text}>
                Создайте уникальную мебель, отражающую ваш вкус и интерьер
              </p>
              <div
                className={[styles["configurator__icon-element"], "_img"].join(
                  " "
                )}
              >
                <img src="/icons/info.svg" alt="Знак подсказки" />
              </div>
            </div>

            <div
              className={[styles.configurator__group, styles.group].join(" ")}
            >
              {productItemBtns.map((item, idx) => (
                <ButtonPrimary
                  key={idx}
                  children={item.children}
                  onClick={item.onClick}
                  isSelected={item.isSelected}
                  isNotification={item.isNotification}
                  isPadding={item.isPadding}
                />
              ))}
            </div>

            {colorConfigure.map((item, idx) => (
              <ColorConfigureEdit
                key={idx}
                configureTitle={item.configureTitle}
                configureVal={item.configureVal}
                colorData={item.colorData}
              />
            ))}

            <ButtonOrange
              className={styles["configurator__button-last"]}
              children={"Под заказ"}
              onClick={null}
              type={"button"}
            />
          </div>
        </div>

        {/* Описание */}
        <div
          className={[
            styles["configurator__description"],
            styles["configurator-text"],
          ].join(" ")}
        >
          <h3
            className={[styles["configurator-text__title"], "title"].join(" ")}
          >
            {information.title}
          </h3>
          <p className={styles["configurator-text__desc"]}>
            {information.description}
          </p>
        </div>
      </section>
    </div>
  );
}
