import { useState, useMemo } from 'react';
import styles from './ProductCatalog.module.css';
import ProductCatalogTitle from '../ProductCatalogTitle/ProductCatalogTitle';
import ProductCatalogTags from '../ProductCatalogTags/ProductCatalogTags';
import ProductCatalogItems from '../ProductCatalogItems/ProductCatalogItems';
import { Tag } from '@/types/tag';
import { ProductShort } from '@/types/product';

const ITEMS_PER_BATCH = 3;

export default function ProductCatalog(
    { title, slug, tags, products }: { title: string; slug: string; tags: Tag[]; products: ProductShort[] }
) {
    const [selectedTag, setSelectedTag] = useState<number | null>(null);
    const [currentBatch, setCurrentBatch] = useState(0);

    const filteredProducts = useMemo(() => {
        const filtered = selectedTag === null
            ? products
            : products.filter((product) =>
                product.sub_categories.includes(selectedTag)
            );
        setCurrentBatch(0);
        return filtered;
    }, [selectedTag, products]);

    const totalBatches = Math.ceil(filteredProducts.length / ITEMS_PER_BATCH);
    // const currentProducts = useMemo(() => {
    //     const start = currentBatch * ITEMS_PER_BATCH;
    //     return filteredProducts.slice(start, start + ITEMS_PER_BATCH);
    // }, [filteredProducts, currentBatch]);

    const handlePrev = () => setCurrentBatch((prev) => Math.max(prev - 1, 0));
    const handleNext = () => setCurrentBatch((prev) => Math.min(prev + 1, totalBatches - 1));

    return (
        <section className={styles.catalog}>
            <div className={[styles.catalog__inner, '_container-bigger'].join(' ')}>
                <ProductCatalogTitle
                    text={title}
                    slug={slug}
                    onPrev={handlePrev}
                    onNext={handleNext}
                    disablePrev={currentBatch === 0}
                    disableNext={currentBatch >= totalBatches - 1} />
                <ProductCatalogTags
                    tags={tags}
                    selectedTag={selectedTag}
                    onTagClick={setSelectedTag} />
                <ProductCatalogItems
                    products={filteredProducts}
                    currentBatch={currentBatch + 1}
                    totalBatches={totalBatches} />
            </div>
        </section>
    );
}

export { default as ProductCatalog } from './ProductCatalog';