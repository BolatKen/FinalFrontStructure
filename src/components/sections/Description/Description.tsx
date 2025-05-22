import styles from "./Description.module.css";
import { SpecsList } from "../../shared/SpecsList/SpecsList";
import { DescriptionDownload } from "../../shared/DescriptionDownload/DescriptionDownload";
// import Image from "next/image";
import { Product } from "@/types/product";
import { useRef, useState } from "react";

interface DescriptionProps {
  product: Product;
}

export default function Description({ product }: DescriptionProps) {

  const specsRef = useRef<HTMLDivElement | null>(null);
  const sizesRef = useRef<HTMLDivElement | null>(null);
  const designersRef = useRef<HTMLDivElement | null>(null);
  const tabsRef = useRef<HTMLDivElement | null>(null);
  
  const [activeTab, setActiveTab] = useState<"specs" | "sizes" | "designers">("specs");


  if (!product?.characteristics) {
    return <div>Загрузка характеристик...</div>;
  }

  


  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>, tab: typeof activeTab) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveTab(tab);
  };



  const groupedOptions = product.characteristics.reduce(
    (acc: Record<string, string[]>, characteristic) => {
      const key = characteristic.option_type_display;
      if (!acc[key]) acc[key] = [];
      acc[key].push(characteristic.value);
      return acc;
    },
    {}
  );

const specsDB = Object.entries(groupedOptions).map(([type, values]) => {
  const val = values.join(", ").toLowerCase();
  return {
    name: type,
    values: val.charAt(0).toUpperCase() + val.slice(1),
  };
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
          <div
            ref={tabsRef}
            className={styles.specs__tabs}
            role="tablist"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "specs"}
              onClick={() => scrollToSection(specsRef, "specs")}
              className={`${styles.tabs__btn} ${activeTab === "specs" ? styles.tabs__btn_active : ""}`}
            >
              Характеристики
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "sizes"}
              onClick={() => scrollToSection(sizesRef, "sizes")}
              className={`${styles.tabs__btn} ${activeTab === "sizes" ? styles.tabs__btn_active : ""}`}
            >
              Размеры
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "designers"}
              onClick={() => scrollToSection(designersRef, "designers")}
              className={`${styles.tabs__btn} ${activeTab === "designers" ? styles.tabs__btn_active : ""}`}
            >
              Дизайнерам
            </button>
          </div>

          <div className={styles.specs__main}>
            <SpecsList className={styles.specs__item} ref={specsRef} specsData={specsDB.length > 0 ? specsDB : []} />

            <div ref={sizesRef} className={[styles.specs__media, styles.specs__item].join(' ')}>
              {/* Галерея изображений */}
              <div className={styles.specs__images}>
                {/* Первое изображение с размерами */}

                <div className={styles.figure}>
                  <div className={[styles.specs__img,].join(' ')}>
                    <img src={
                      product.images?.find((img) => img.type === "FRONT")
                        ?.image || "/core/1.png"
                    } alt="Вид спереди" />
                  </div>
                  <div className={styles.figure__caption}>
                    79 см × 52 см
                  </div>
                </div>

                <div className={styles.figure}>
                  <div className={[styles.specs__img,].join(' ')}>
                    <img src={
                      product.images?.find((img) => img.type === "SIDE")
                        ?.image || ""
                    } alt="Вид сбоку" />
                  </div>
                  <div className={styles.figure__caption}>
                    79 см × 52 см
                  </div>
                </div>
              </div>

              {/* Блок загрузок */}
              <div ref={designersRef} className={[styles.specs__downloads, styles.specs__item].join(' ')}>
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