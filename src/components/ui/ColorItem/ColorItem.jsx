"use client"

import styles from './ColorItem.module.css';

export default function ColorItem({
  itemKey = 0,
  color,
  code,
  imageUrl,
  altText,
  isSelected = false,
  isSmall = false,
  onSelect
}) {
  return (
    <li
      className={[
        styles.color__item,
        isSmall && styles.color__item_small,
        isSmall
          ? isSelected && styles.color__item_small_selected
          : isSelected && styles.color__item_selected
      ].filter(Boolean).join(" ")}
      onClick={onSelect}
    >
      <img
        src={imageUrl}
        alt={altText}
      />
    </li>
  );
}
