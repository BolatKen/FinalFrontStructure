import styles from "./Configurator.module.css";
import { ButtonOrange } from "../../ui/ButtonOrange/ButtonOrange";
import { ColorConfigureEdit } from "../../shared/ColorConfigureEdit/ColorConfigureEdit";
import { Product } from "@/types/product";
import ButtonFilter from "@/components/ui/ButtonFilter/ButtonFilter";
import { Color } from "@/types/color";
import { useEffect, useState } from "react";
import ProductSceneConfigurator from "@/components/explosion/ProductSceneConfigurator";

import ConfiguratorModal from "./ConfiguratorModal";

interface ConfiguratorProps {
  product: Product;
}

export default function Configurator({ product }: ConfiguratorProps) {
  const [selectedMaterials, setSelectedMaterials] = useState<Record<number, number>>({});
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [activePartId, setActivePartId] = useState<number | null>(
    product.configurable_parts.length > 0 ? product.configurable_parts[0].part.id : null
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedColors, setSelectedColors] = useState<
    Record<number, Color | null>
  >({});

  useEffect(() => {
    if (!product) return;
    const initialSelection: Record<number, number> = {};
    product.configurable_parts.forEach((item) => {
      if (item.materials.length > 0) {
        initialSelection[item.part.id] = item.materials[0].id;
      }
    });
    setSelectedMaterials(initialSelection);
  }, [product]);


  

  if (!product) {
    return <div>Загрузка товара...</div>;
  }

  const configurableData = product.configurable_parts;
  const has3DModel = !!product.model_url;

  const information = {
    title: product.name,
    description: product.description,
  };

  const activePart = configurableData.find(
    (item) => item.part.id === activePartId
  );

  return (
    <div className={styles.configurator}>
      <section
      className={[styles.configurator__inner, styles.main, "_container"].join(
        " "
      )}
      >
      <div className={[styles.main__header].join(" ")}>
        <h2 className={[styles.configurator__title, "title"].join(" ")}>
        
        </h2>

        <div className={styles.configurator__icon}>
        <p className={styles.configurator__text}>
          Соберите идеальную модель с помощью конфигуратора — выберите
          материал, цвет, отделку и другие параметры, чтобы мебель точно
          отражала концепцию вашего салона. Изделия, выполненные под заказ,
          имеют индивидуальные сроки производства и доставки, а также
          рассчитываются по отдельной стоимости.
        </p>
        </div>
      </div>
      <div className={[styles.configurator__main].join(" ")}>
        {/* Фото товара - показываем только если есть 3D модель */}
        {has3DModel ? (
        <div className={[styles.configurator__image, "_img"].join(" ")}>
          <ProductSceneConfigurator
          modelUrl={product.model_url}
          part={activePart?.part.model_part_selector}
          selectedColor={selectedColor?.hex_code}
          />
        </div>
        ) : (
        <div className={styles.configurator__no_model}>
          <p>3D модель недоступна</p>
        </div>
        )}

        {/* Панель выбора */}
        <div className={[styles.configurator__panel, styles.panel].join(" ")}>
        {configurableData.map((item, idx) => (
          <div key={idx} className={[styles.panel__inner].join(" ")}>
          {item.materials.length > 0 ? (
            <div
            className={[
              styles.panel__item,
              styles.panel__materials,
              styles.materials,
            ].join(" ")}
            >
            <div className={styles.panel__title}>Материалы</div>
            <ul className={styles.materials__items}>
              {item.materials?.map((material, idx) => (
              <ButtonFilter
                key={idx}
                iconImage={""}
                iconAlt={material.name}
                iconText={material.name}
                isSelected={
                selectedMaterials[item.part.id] === material.id
                }
                onClick={() => {
                setSelectedMaterials((prev) => ({
                  ...prev,
                  [item.part.id]: material.id,
                }));
                setActivePartId(item.part.id);
                }}
              />
              ))}
            </ul>
            </div>
          ) : (
            ""
          )}
          {item.distinct_colors.length > 0 ? (
            <div
            className={[
              styles.panel__item,
              styles.panel__colors,
              styles.colors,
            ].join(" ")}
            >
            <div className={styles.colors__title}>{item.part.name}</div>
            <ColorConfigureEdit
              className={styles.panel__conf}
              colorData={
              selectedMaterials[item.part.id]
                ? item.materials.find(
                  (m) => m.id === selectedMaterials[item.part.id]
                )?.colors ?? []
                : item.distinct_colors
              }
              onColorSelect={(colorId: number | null) => {
              if (colorId == null) return;

              const fullColor = (
                selectedMaterials[item.part.id]
                ? item.materials.find(
                  (m) => m.id === selectedMaterials[item.part.id]
                  )?.colors ?? []
                : item.distinct_colors
              ).find((c) => c.id === colorId);

              if (!fullColor) return;

              setSelectedColor(fullColor);
              setActivePartId(item.part.id);
              setSelectedColors((prev) => ({
                ...prev,
                [item.part.id]: fullColor,
              }));
              }}
            />
            </div>
          ) : (
            ""
          )}
          </div>
        ))}

        <ButtonOrange
          className={styles["configurator__button-last"]}
          onClick={() => setModalOpen(true)}
          type={"button"}
        >
          Под заказ
        </ButtonOrange>
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

      <ConfiguratorModal
      isOpen={modalOpen}
      onClose={() => setModalOpen(false)}
      selectedMaterials={selectedMaterials}
      selectedColors={selectedColors}
      partsInfo={configurableData.map((item) => ({
        partId: item.part.id,
        partName: item.part.name,
        materials: item.materials,
      }))}
      />
    </div>
  );
}
