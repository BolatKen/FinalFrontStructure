import styles from './ListingCategories.module.css';
import ProductCart from '../../shared/ProductCard/ProductCard';

export default function ListingCategories({ products }) {
    return (
        <section className={[styles.listing, '_container'].join(" ")}>
            <div className={styles.listing__inner}>
                <h2 className={[styles.listing__title, 'title'].join(" ")}>Каталог товаров</h2>
                <ul className={styles.listing__items}>
                    {(Array.isArray(products) ? products : []).map((item, idx) => (
                        <ProductCart
                            key={idx}
                            imageSrc={item.images[0]?.image || "/products/chair1.png"}
                            title={item.name}
                            oldPrice={item.old_price}
                            newPrice={item.new_price}
                            colorData={item.material_colors}
                        />
                    ))}
                </ul>
            </div>
        </section>
    );
}

export { default as ListingCategories } from './ListingCategories';

