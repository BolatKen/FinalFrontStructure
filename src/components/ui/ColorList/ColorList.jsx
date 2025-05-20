"use client"

import styles from './ColorList.module.css';
import { useState, useEffect } from 'react';
import ColorItem from '../ColorItem/ColorItem';

export default function ColorList({
  colorData,
  onColorSelect,
  initialSelected = -1,
  selectedMaterialId = 0,
}) {
  const findInitialIndex = () => {
    if (!initialSelected || !Array.isArray(colorData)) return null;
    const idx = colorData.findIndex(color => color.id === initialSelected);
    return idx === -1 ? null : idx;
  };
  const [selectedIndex, setSelectedIndex] = useState(findInitialIndex());

  useEffect(() => {
    setSelectedIndex(null);
    onColorSelect?.(null);
  }, [selectedMaterialId]);
  
  useEffect(() => {
    const initialIndex = findInitialIndex();
    setSelectedIndex(initialIndex);
  }, [initialSelected]);

  const handleSelect = (colorId, idx) => {
    if (selectedIndex === idx) {
      setSelectedIndex(null);
      onColorSelect?.(null);
    } else {
      setSelectedIndex(idx);
      onColorSelect?.(colorId);
    }
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
