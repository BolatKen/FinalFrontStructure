"use client"
import styles from './ColorItem.module.css';

export default function ColorItem({
  color,
  code,
  imageUrl,
  altText,
  isSelected = false,
  isSmall = false,
  onSelect
}) {
  const colorInnerContent = () => {
    if (imageUrl) {
      return (<img
        src={imageUrl}
        alt={altText}
      />)
    } else {
      return (
        <div className={styles.item__inner}>
          <div className={styles.item__circle}
            style={{ backgroundColor: code }}></div>
        </div >
      )
    }
  }
  return (
    <li
      className={[
        styles.color__item,
        isSmall && styles.color__item_small,
        isSmall
          ? isSelected && styles.color__item_small_selected
          : isSelected && styles.color__item_selected,
        styles.item,
      ].filter(Boolean).join(" ")}
      onClick={onSelect}
    >
      {colorInnerContent()}
    </li>
  );
}
