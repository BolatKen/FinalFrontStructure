import styles from './PageNumberItem.module.css';

export default function PageNumberItem({ pageNumber, isSelected }) {
    return (
        <li className={styles.item}>
            <div className={[
                styles.item__content,
                isSelected ? styles.item__content_selected : ''
            ].join(' ')}>{pageNumber}</div>
        </li>
    );
}

export { default as PageNumberItem } from './PageNumberItem';