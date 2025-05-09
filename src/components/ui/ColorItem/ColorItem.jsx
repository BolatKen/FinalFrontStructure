import React from "react";
import styles from './ColorItem.module.css';


export default function ColorItem({ imageUrl, altText, isSelected }) {
  return (
    <li className={`${styles.color__item} ${isSelected ? styles.color__item_selected : ''}`}>
      <img
        src={imageUrl}
        alt={altText}
      />
    </li>
  );
}

export { default as ColorItem } from './ColorItem';