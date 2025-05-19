import styles from './ListingCategories.module.css';
import ProductCart from '../../shared/ProductCard/ProductCard';
import { ProductShort } from '@/types/product';

export default function ListingCategories({ products }: { products: ProductShort[] }) {

    return (
        <section className={[styles.listing, '_container'].join(" ")}>
            <div className={styles.listing__inner}>
                <h2 className={[styles.listing__title, 'title'].join(" ")}>Каталог товаров</h2>
                <ul className={styles.listing__items}>
                    {(Array.isArray(products) ? products : []).map((item, idx) => (
                        <ProductCart
                            key={idx}
                            images={item.images}
                            name={item.name}
                            variants={item.variants}
                            sub_categories={item.sub_categories}
                            material_colors={item.material_colors}
                        />
                    ))}
                </ul>
            </div>
        </section>
    );
}

export { default as ListingCategories } from './ListingCategories';

