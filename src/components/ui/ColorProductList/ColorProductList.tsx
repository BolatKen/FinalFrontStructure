"use client";

import styles from './ColorProductList.module.css';
import ColorItem from '@/components/ui/ColorItem/ColorItem';
import { ColorItemType } from '@/types/color';


type ColorProductListProps = {
    colorData?: ColorItemType[];
    onColorSelect?: (item: ColorItemType) => void;
};

export default function ColorProductList({
    colorData = [],
    onColorSelect,
}: ColorProductListProps) {
    return (
        <ul className={`${styles.color__items} ${styles.color__margin}`}>
            {colorData.map((item, idx) => {
                if (idx < 3) {
                    return (
                        <ColorItem
                            key={idx}
                            color={item.name}
                            code={item.hex_code}
                            imageUrl={item.image}
                            altText={item.name}
                            isSelected={item.isSelected}
                            isSmall={true}
                            onSelect={() => onColorSelect?.(item)}
                        />
                    );
                }
            })}
            <li className={styles.color__text}>
                {colorData.length > 3 ? '+ Больше вариантов' : ''}
            </li>
        </ul>
    );
}
