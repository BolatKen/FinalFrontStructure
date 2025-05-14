import styles from "./Description.module.css";
import { SpecsList } from "../../shared/SpecsList/SpecsList";
import { DescriptionDownload } from "../../shared/DescriptionDownload/DescriptionDownload";

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

interface DescriptionProps {
  product: Product;
}

export default function Description({ product }: DescriptionProps) {
  if (!product?.options) {
    return <div>Загрузка характеристик...</div>; // или просто null
  }

  const groupedOptions = product.options.reduce(
    (acc: Record<string, string[]>, option) => {
      const key = option.option_type_display;
      if (!acc[key]) acc[key] = [];
      acc[key].push(option.value);
      return acc;
    },
    {}
  );

  let specsDB: any = [];

  Object.entries(groupedOptions).map(([type, values], idx) => {
    const val = values.join(", ").toLowerCase();
    specsDB.push({
      name: type,
      values: String(val).charAt(0).toUpperCase() + String(val).slice(1),
    });
  });

  const specs = [
    {
      name: "Наполнение",
      values: "Пенополиуретан, холофайбер",
    },
    {
      name: "Тип обивки",
      values: "Экокожа",
    },
    {
      name: "Материал подлокотников",
      values: "Экокожа",
    },
    {
      name: "Материал каркаса",
      values: "Фанера (ЛДСП)",
    },
    {
      name: "Максимальная нагрузка",
      values: "180 кг",
    },
    {
      name: "Механизм",
      values: "Пиастра",
    },
    {
      name: "Вариант доставки",
      values: "В разобранном виде",
    },
    {
      name: "Цвет",
      values: "Металл",
    },
  ];

  const downloadable = [
    {
      title: "Aurora 3Ds Max model.max",
      device: "Corona Renderer",
      weight: "54 мб",
    },
    {
      title: "Инструкция по сборке.pdf",
      weight: "2 мб",
    },
  ];

  return (
    <div className={styles.description}>
      <div className={styles.description__inner}>
        <section className={styles.specs}>
          <h2 className={`${styles.specs__title} title`}>Характеристики</h2>

          {/* Табы */}
          <div className={styles.specs__tabs} role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected="true"
              className={`${styles.tabs__btn} ${styles.tabs__btn_active}`}
            >
              Характеристики
            </button>
            <button
              type="button"
              role="tab"
              aria-selected="false"
              className={styles.tabs__btn}
            >
              Размеры
            </button>
            <button
              type="button"
              role="tab"
              aria-selected="false"
              className={styles.tabs__btn}
            >
              Дизайнерам
            </button>
          </div>

          <div className={styles.specs__main}>
            {/* Список характеристик */}
            <SpecsList specsData={specsDB.length > 0 ? specsDB : specs} />

            <div className={styles.specs__media}>
              {/* Галерея изображений */}
              <div className={styles.specs__images}>
                {/* Первое изображение с размерами */}
                <figure className={`${styles.specs__image} ${styles.sizes}`}>
                  <div className={styles.description__image}>
                    <Image
                      src={
                        product.images.find((img) => img.type === "FRONT")
                          ?.image || ""
                      }
                      alt="Вид спереди"
                      width={393}
                      height={393}
                      layout="responsive"
                    />
                  </div>
                  <figcaption className={styles.sizes__elem}>
                    <span className={styles.sizes__item}>79 см</span>
                    <div
                      className={styles.sizes__line}
                      aria-hidden="true"
                    ></div>
                  </figcaption>
                </figure>

                {/* Второе изображение */}
                <figure className={styles.specs__imageItem}>
                  <Image
                    src={
                      product.images.find((img) => img.type === "SIDE")
                        ?.image || ""
                    }
                    alt="Вид сбоку"
                    width={393}
                    height={393}
                    layout="responsive"
                  />
                  <figcaption className={styles.specs__caption}>
                    79 см × 52 см
                  </figcaption>
                </figure>
              </div>

              {/* Блок загрузок */}
              <div className={styles.specs__downloads}>
                {downloadable.map((item, idx) => (
                  <DescriptionDownload
                    key={idx}
                    title={item.title}
                    device={item.device}
                    weight={item.weight}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
