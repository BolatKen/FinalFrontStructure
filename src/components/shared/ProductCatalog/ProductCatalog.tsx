import ProductCatalogClient from './ProductCatalogClient';
import { Tag } from '@/types/tag';
import { ProductShort } from '@/types/product';

interface ProductCatalogProps {
    title: string;
    slug: string;
    tags: Tag[];
    products: ProductShort[];
}

export default function ProductCatalog({ title, slug, tags, products }: ProductCatalogProps) {
    return (
        <ProductCatalogClient 
            title={title}
            slug={slug}
            tags={tags}
            products={products}
        />
    );
}

export { default as ProductCatalog } from './ProductCatalog';