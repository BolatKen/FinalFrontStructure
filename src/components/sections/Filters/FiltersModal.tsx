// components/sections/Filters/FiltersModal.tsx
"use client";

import { useState } from "react";
import styles from "./FiltersModal.module.css";
import { ReactNode } from "react";

type FiltersModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
  children?: ReactNode;
};

export default function FiltersModal({
  isOpen,
  onClose,
  onApply,
}: FiltersModalProps) {
  const [inStock, setInStock] = useState(false);
  const [discountOnly, setDiscountOnly] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [priceFrom, setPriceFrom] = useState("600000");
  const [priceTo, setPriceTo] = useState("800000");
  const [material, setMaterial] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);

  const materials = ["Велюр", "Экокожа", "Бархат", "Кожа"];
  const colors = [
    "#F2D4CA", "#B8A59C", "#B8B3A7", "#A7A6A3", "#78737B",
    "#6D7C87", "#888A96", "#5A4942", "#D7ECF7", "#536161"
  ];

  const handleApply = () => {
    onApply({
      inStock,
      discountOnly,
      isNew,
      priceFrom,
      priceTo,
      material,
      color,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Фильтр</h2>
          <button onClick={onClose}>×</button>
        </div>

        <label className={styles.switch}>
          <input type="checkbox" checked={inStock} onChange={() => setInStock(!inStock)} />
          <span>В наличии</span>
        </label>

        <label className={styles.switch}>
          <input type="checkbox" checked={discountOnly} onChange={() => setDiscountOnly(!discountOnly)} />
          <span>Товары со скидкой</span>
        </label>

        <label className={styles.switch}>
          <input type="checkbox" checked={isNew} onChange={() => setIsNew(!isNew)} />
          <span>Новинки</span>
        </label>

        <div className={styles.prices}>
          <input value={priceFrom} onChange={(e) => setPriceFrom(e.target.value)} placeholder="Цена от" />
          <input value={priceTo} onChange={(e) => setPriceTo(e.target.value)} placeholder="Цена до" />
        </div>

        <div className={styles.section}>
          <span>Материал</span>
          <div className={styles.choices}>
            {materials.map((mat) => (
              <button
                key={mat}
                className={material === mat ? styles.selected : ""}
                onClick={() => setMaterial(mat)}
              >
                {mat}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <span>Цвет</span>
          <div className={styles.colors}>
            {colors.map((col, idx) => (
              <button
                key={idx}
                style={{ backgroundColor: col }}
                className={`${styles.colorCircle} ${color === col ? styles.colorSelected : ""}`}
                onClick={() => setColor(col)}
              />
            ))}
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.apply} onClick={handleApply}>Применить</button>
          <button className={styles.reset} onClick={() => {
            setInStock(false);
            setDiscountOnly(false);
            setIsNew(false);
            setPriceFrom("");
            setPriceTo("");
            setMaterial(null);
            setColor(null);
          }}>
            Сбросить фильтр
          </button>
        </div>
      </div>
    </div>
  );
}
