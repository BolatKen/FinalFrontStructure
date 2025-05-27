"use client";

import React, { useEffect, useState } from "react";
import "./ProductCard.module.css";
import styles from "./ProductCard.module.css";
import BonusValue from "@/components/ui/BonusValue/BonusValue";
import ColorProductList from "@/components/ui/ColorProductList/ColorProductList";
import { ProductShort } from "@/types/product";
import { ColorItemType as ColorItem } from "@/types/color";
import Link from "next/link";
import Image from "next/image";

const ProductCard: React.FC<ProductShort> = ({
  name,
  slug,
  variants,
  images,
  material_colors,
}) => {
  const [colors, setColors] = useState<ColorItem[]>([]);
  const [selectedColor, setSelectedColor] = useState<ColorItem | undefined>(
    undefined
  );

  const [newPrice, setNewPrice] = useState(0);
  const [oldPrice, setOldPrice] = useState(0);
  const [bonusNumber, setBonusNumber] = useState(0);

  const updatePrices = (variantIndex: number) => {
    const variant = variants.find((v) => v.id === variantIndex);
    if (variant) {
      setNewPrice(Number(variant.final_price) ?? 0);
      setOldPrice(
        (Number(variant.final_price) ?? 0) +
          (Number(variant.discount_number) ?? 0)
      );
      setBonusNumber(Number(variant.bonus_number) ?? 0);
    }
  };

  useEffect(() => {
    if (material_colors && material_colors.length > 0) {
      const mappedColors = material_colors.map((item, idx) => ({
        id: item.color.id,
        image: item.color.image,
        hex_code: item.color.hex_code,
        name: item.color.name,
        isSelected: idx === 0,
        variant: item.variant,
      }));
      setColors(mappedColors);
      setSelectedColor(mappedColors[0]);
      updatePrices(mappedColors[0].variant);
    }
  }, [material_colors]);

  const handleColorSelect = (selected: ColorItem) => {
    setColors((prev) =>
      prev.map((color) => ({
        ...color,
        isSelected: color.variant === selected.variant,
      }))
    );
    setSelectedColor(selected);
    updatePrices(selected.variant);
  };

  function formatWithSpaces(n: number): string {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  const image =
    Array.isArray(images) && images[0]?.image
      ? images[0].image
      : "/products/chair1.png";

  if (!selectedColor) return null;

  return (
    <div className={styles["product-card"]}>
      <Link
        href={
          "/catalog/products/" + slug + `?selectedColorId=${selectedColor.id}`
        }
      >
        <div className={styles["product-card__image"]}>
          <Image
            src={image}
            alt={name}
            width={400} // фиксированная ширина карточки.
            height={500} // или другую подходящую высоту.
            loading="lazy"
          />
        </div>
        <div className={styles["product-card__inner"]}>
          <div className={styles["product-cart__colors"]}>
            <ColorProductList
              colorData={colors}
              onColorSelect={handleColorSelect}
            />
          </div>

          <div className={styles["product-card__info"]}>
            <div className={styles["product-card__more"]}>
              <h3 className={styles["product-card__title"]}>{name}</h3>
              <div className={styles["product-card__bottom"]}>
                <div className={styles["product-card__prices"]}>
                  {oldPrice !== newPrice ? (
                    <span className={styles["product-card__old-price"]}>
                      {formatWithSpaces(Number(oldPrice))} ТГ
                    </span>
                  ) : (
                    ""
                  )}
                  <span className={styles["product-card__new-price"]}>
                    {formatWithSpaces(Number(newPrice))} ТГ
                  </span>
                </div>
                {bonusNumber !== 0 ? (
                  <BonusValue bonusVal={bonusNumber} isDark={true} />
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="product-card__arrow">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 6L15 12L9 18"
                  stroke="#1D1C1B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
