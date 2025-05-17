import styles from './ProductCatalog.module.css';
import ProductCatalogTitle from '../ProductCatalogTitle/ProductCatalogTitle';
import ProductCatalogTags from '../ProductCatalogTags/ProductCatalogTags';
import ProductCatalogItems from '../ProductCatalogItems/ProductCatalogItems';

export default function ProductCatalog({ title, slug, tags, products }) {
    return (
        <section className={styles.catalog}>
            <div className={[styles.catalog__inner, '_container-bigger'].join(' ')}>
                <ProductCatalogTitle text={title} slug={slug} />
                <ProductCatalogTags tags={tags} />
                <ProductCatalogItems products={products} />
            </div>
        </section>
    );
}

export { default as ProductCatalog } from './ProductCatalog';