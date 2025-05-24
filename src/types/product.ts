import { Color } from './color';

export interface Part {
    id: number;
    name: string;
    is_configurable: boolean;
    model_part_selector: string;
    colors?: Color[];
    dimensions?: DimensionPart[];
    extra_price: string;
}

interface Material {
    id: number;
    name: string;
    parts?: Part[];
    colors?: Color[];
    extra_price?: string;
}


export interface VariantOption {
    id: number;
    part: Part;
    color: Color;
    material: Material;
    total_extra_price: number;
    is_toggle: boolean;
}

export interface Variant {
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

interface VariantOptionValue {
    part: Part;
    colors: Color[];
}

export interface ConfigurableParts {
    part: Part;
    materials: Material[];
    distinct_colors: Color[];
}

export interface Product {
    length: number;
    id: number;
    base_sku: string;
    slug: string;
    category: string;
    best_offers: ProductShort[];
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
    configurable_parts: ConfigurableParts[];
    with_without?: [];
    characteristics?: Characteristics[];
    dimension_parts?: DimensionPart[];
    model_url: string;
    build_instractions_url: string;
    variants: Variant[];
    default_variant_id: number;
    similar_products: [number];
    variant_options_values: VariantOptionValue[];
}

interface MaterialColor {
    variant: number;
    color: Color;
}


export interface ProductShort {
    id: number;
    name: string;
    slug: string;
    variants: Variant[];
    images: ProductImage[];
    tags: number[];
    sub_categories: number[];
    material_colors: MaterialColor[];
}