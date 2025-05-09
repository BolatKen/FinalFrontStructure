import styles from './ColorList.module.css';
import { ColorItem } from '../ColorItem/ColorItem';

export default function ColorList({ colorData }) {
    return (
        <ul className={`${styles.color__items} ${styles.color__margin}`}>
            {colorData.map((item, idx) => (
                <ColorItem key={idx}
                    imageUrl={item.imageUrl}
                    altText={item.altText}
                    isSelected={item.isSelected} />
            ))}
        </ul>
    );
}

export { default as ColorList } from './ColorList';