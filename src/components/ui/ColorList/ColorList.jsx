import styles from './ColorList.module.css';
import { ColorItem } from '../ColorItem/ColorItem';

export default function ColorList({ colorData }) {
    return (
        <ul className={`${styles.color__items} ${styles.color__margin}`}>
  {Array.isArray(colorData) && colorData.map((item, idx) => (
    <ColorItem
      key={idx}
      imageUrl={item.imageUrl}
      altText={item.altText}
    />
  ))}
</ul>
    );
}

export { default as ColorList } from './ColorList';