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
                            imageSrc={item.images[0].image}
                            oldPrice={item.old_price}
                            newPrice={item.new_price}
                            colorData={item.material_colors}
                        />
                    ))}
                </ul>
            </div>
        </div>
    )
}

export { default as ProductCatalogItems } from './ProductCatalogItems';