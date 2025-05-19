"use client"

import styles from './ColorList.module.css';
import { useState, useEffect } from 'react';
import ColorItem from '../ColorItem/ColorItem';

export default function ColorList({
  colorData,
  onColorSelect,
  selectedMaterialId = 0,
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setSelectedIndex(0);
    if (Array.isArray(colorData) && colorData.length > 0) {
      onColorSelect?.(colorData[0].id);
    } else {
      onColorSelect?.(null);
    }
  }, [selectedMaterialId]);

  const handleSelect = (colorId, idx) => {
    setSelectedIndex(idx);
    onColorSelect?.(colorId);
  };

  return (
    <ul className={`${styles.color__items} ${styles.color__margin}`}>
      {Array.isArray(colorData) && colorData.map((item, idx) => (<ColorItem
        key={idx}
        color={item.name}
        code={item.hex_code}
        imageUrl={item.image}
        altText={item.name}
        isSelected={selectedIndex === idx}
        isSmall={false}
        onSelect={() => (handleSelect(item.id, idx))}
      />))}
    </ul>
  );
}
