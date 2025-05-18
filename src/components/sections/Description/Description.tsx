import styles from "./Description.module.css";
import { SpecsList } from "../../shared/SpecsList/SpecsList";
import { DescriptionDownload } from "../../shared/DescriptionDownload/DescriptionDownload";
import Image from "next/image";
import { Product } from "@/types/product";

interface DescriptionProps {
  product: Product;
}

export default function Description({ product }: DescriptionProps) {
  if (!product?.characteristics) {
    return <div>Загрузка характеристик...</div>;
  }

  const groupedOptions = product.characteristics.reduce(
    (acc: Record<string, string[]>, characteristic) => {
      const key = characteristic.option_type_display;
      if (!acc[key]) acc[key] = [];
      acc[key].push(characteristic.value);
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
      <div className={[styles.description__inner, "_container"].join(" ")}>
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
            <SpecsList specsData={specsDB.length > 0 ? specsDB : []} />

            <div className={styles.specs__media}>
              {/* Галерея изображений */}
              <div className={styles.specs__images}>
                {/* Первое изображение с размерами */}
                <figure className={`${styles.specs__image} ${styles.sizes}`}>
                  <div className={styles.description__image}>
                    <Image
                      src={
                        product.images?.find((img) => img.type === "FRONT")
                          ?.image || ""
                      }
                      alt="Вид спереди"
                      width={393}
                      height={393}
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
                      product.images?.find((img) => img.type === "SIDE")
                        ?.image || ""
                    }
                    alt="Вид сбоку"
                    width={393}
                    height={393}
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
