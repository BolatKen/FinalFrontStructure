import styles from './ProductCatalogTitle.module.css';
import Link from 'next/link';
import Arrow from '../../ui/Arrow/Arrow';

export default function ProductCatalogTitle({ text, slug }) {
    return (
        <div className={styles.text}>
            <div className={styles.text__inner}>
                <Link href={'/catalog/categories/' + slug}>
                    <div className={styles.text__content} >
                        {text}
                    </div>
                </Link>
                <div className={styles.text__arrows}>
                    <Arrow isWhite={true} onClick={null} />
                    <Arrow direction={'right'} isWhite={true} onClick={null} />
                </div>
            </div>
        </div >
    );
}

export { default as ProductCatalogTitle } from './ProductCatalogTitle';