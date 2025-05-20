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
                        <ProductCard
                            key={key}
                            id={item.id}
                            images={item.images}
                            name={item.name}
                            variants={item.variants}
                            sub_categories={item.sub_categories}
                            material_colors={item.material_colors}
                            tags={item.tags} />
                    ))}
                </ul>
            </div>
        </div>
    )
}

export { default as ProductCatalogItems } from './ProductCatalogItems';