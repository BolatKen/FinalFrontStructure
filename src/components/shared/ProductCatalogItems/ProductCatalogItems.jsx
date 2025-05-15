import styles from './ProductCatalogItems.module.css';
import ProductCard from '../../shared/ProductCard/ProductCard';

export default function ProductCatalogItems({ products }) {
    return (
        <div className={styles.items}>
            <div className={styles.items__inner}>
                <div className={styles.items__count}>
                    <span className={styles.items__current}>1</span>/{products.length}
                </div>
                <ul className={styles.items__list}>
                    {products.map((item, key) => (
                        <ProductCard key={key}
                            title={item.name}
                            imageSrc={item.model_url}
                            oldPrice={item.variants[0].old_price}
                            newPrice={item.variants[0].price}
                        />
                    ))}
                </ul>
            </div>
        </div>
    )
}

export { default as ProductCatalogItems } from './ProductCatalogItems';