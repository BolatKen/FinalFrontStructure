"use client"

import styles from './ColorList.module.css';
import { useState } from 'react';
import ColorItem from '../ColorItem/ColorItem';

export default function ColorList({
  colorData,
  isSmall = false,
  onColorSelect
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSelect = (code, idx) => {
    setSelectedIndex(idx);
    onColorSelect?.(code);
  };

  return (
    <ul className={`${styles.color__items} ${styles.color__margin}`}>
      {Array.isArray(colorData) && colorData.map((item, idx) => (
        <ColorItem
          key={idx}
          itemKey={idx}
          color={item.color}
          code={item.code}
          imageUrl={item.imageUrl}
          altText={item.altText}
          isSelected={selectedIndex === idx}
          isSmall={isSmall}
          onSelect={() => handleSelect(item.code, idx)}
        />
      ))}
    </ul>
  );
}
