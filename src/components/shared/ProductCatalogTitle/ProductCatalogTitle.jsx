import styles from './ProductCatalogTitle.module.css';
import Arrow from '../../ui/Arrow/Arrow';

export default function ProductCatalogTitle({ text }) {
    return (
        <div className={styles.text}>
            <div className={styles.text__inner}>
                <div className={styles.text__content}>
                    {text}
                </div>
                <div className={styles.text__arrows}>
                    <Arrow isWhite={true} onClick={null} />
                    <Arrow direction={'right'} isWhite={true} onClick={null} />
                </div>
            </div>
        </div>
    );
}

export { default as ProductCatalogTitle } from './ProductCatalogTitle';