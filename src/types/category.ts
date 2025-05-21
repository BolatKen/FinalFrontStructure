import { Material } from 'three';
import { ProductShort } from './product';
import { Color } from './color';
import { Tag } from './tag';

export interface Category {
    id: number;
    name: string;
    slug: string;
    parent: number;
    is_full_format: boolean;
    is_in_welcome: boolean;
}

export interface SubCatergory {
    id: number;
    name: string;
    product_sales: number;
}

export interface CategoryWelcome {
    id: number;
    name: string;
    subcategories: Category[];
    products: ProductShort[];
    material_colors: Color[];
    is_full_format: boolean;
}

export interface CategoryListItem {
    id: number;
    name: string;
    slug: string;
    filters: Tag[];
    popular_subcategories: SubCatergory[];
    best_offers: ProductShort[];
    product_count: number;
    products: ProductShort[];
}

export interface CategoryFilters {
    tags: Tag[];
    materials: Material[];
    colors: Color[];
}

export type FilteredData = {
    activeTagIds: number[];
    priceFrom: string;
    priceTo: string;
    selectedMaterialId: number | null;
    color?: number | null;
};