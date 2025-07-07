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

  const [showAll, setShowAll] = useState(false);
  const visibleColors = Array.isArray(colorData) ? (showAll ? colorData : colorData.slice(0, 4)) : [];
  const hasMore = Array.isArray(colorData) && colorData.length > 4 && !showAll;

  return (
    <ul className={`${styles.color__items} ${styles.color__margin}`}>
      {visibleColors.map((item, idx) => (
        <ColorItem
          key={idx}
          color={item.name}
          code={item.hex_code}
          imageUrl={item.image}
          altText={item.name}
          isSelected={selectedIndex === idx}
          isSmall={false}
          onSelect={() => (handleSelect(item.id, idx))}
        />
      ))}
      {hasMore && (
        <li
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: '#eee',
            margin: '0 4px',
            cursor: 'pointer',
            border: '1px solid #ccc',
            position: 'relative',
          }}
          onClick={() => setShowAll(true)}
          aria-label="Показать ещё цвета"
        >
          <span style={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#888', display: 'inline-block' }} />
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#888', display: 'inline-block' }} />
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#888', display: 'inline-block' }} />
          </span>
        </li>
      )}
    </ul>
  );
}
