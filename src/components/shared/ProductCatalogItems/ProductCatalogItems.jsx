import styles from './ProductCatalogItems.module.css';
import ProductCard from '../../shared/ProductCard/ProductCard';

export default function ProductCatalogItems({ products, currentBatch, totalBatches }) {
    if (products.length === 0) {
        return <div className={styles.items__empty}>Нету подходящих товаров</div>;
    }
    return (
        <div className={styles.items}>
            <div className={styles.items__inner}>
                <div className={styles.items__count}>
                    <span className={styles.items__current}>{currentBatch}</span>/{totalBatches}
                </div>
                <ul className={styles.items__list}>
                    {products.map((item, key) => (
                        <ProductCard
                            key={key}
                            id={item.id}
                            images={item.images}
                            name={item.name}
                            slug={item.slug}
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