import { Color } from './color';

interface Part {
    id: number;
    name: string;
    is_configurable: boolean;
    colors?: Color[];
    extra_price: string;
}

interface Material {
    id: number;
    name: string;
    parts: Part[];
    extra_price: string;
}


interface VariantOption {
    id: number;
    part: Part;
    color: Color;
    material: Material;
    total_extra_price: number;
    is_toggle: boolean;
}

interface Variant {
    id: number;
    sku: string;
    final_price?: string | null;
    has_bonus: boolean;
    bonus_number: string;
    currency: string;
    options: VariantOption[];
    has_discount: boolean;
    discount_number: string;
    is_default: boolean;
    is_active: boolean;
}

interface ProductImage {
    id: number;
    image: string;
    alt: string;
    type: string;
    type_display: string;
    material: number;
    color: number;
}

interface Characteristics {
    id: number;
    option_type_display: string;
    value: string;
}

interface DimensionPart {
    part: string;
    dimension: string;
    value: string;
    unit: string;
}

export interface ProductCardProps {
    imageSrc: string;
    title: string;
    oldPrice: string;
    newPrice: string;
    colorData?: Color[];
}

export interface Product {
    id: number;
    base_sku: string;
    slug: string;
    category: string;
    name: string;
    base_price: string;
    description: string;
    warranty_period: number;
    is_active: boolean;
    meta_title: string;
    meta_description: string;
    meta_keywords: [string];
    sold_count: number;
    images?: ProductImage[];
    configurable_parts: [string];
    with_without?: [];
    materials?: Material[];
    selection_parts?: Part[];
    characteristics?: Characteristics[];
    dimension_parts?: DimensionPart[];
    model_url: string;
    build_instractions_url: string;
    variants: Variant[];
    default_variant_id: number;
    similar_products: [number];
}

interface MaterialColor {
    variant: number;
    color: Color;
}


export interface ProductShort {
    name: string;
    variants: Variant[];
    images: ProductImage[];
    tags: number[];
    sub_categories: number[];
    material_colors: MaterialColor[];
}