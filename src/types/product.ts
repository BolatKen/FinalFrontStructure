
export interface Color {
    id: number;
    name: string;
    hex_code: string;
    image: string;
    extra_price: string;
}

interface Part {
    id: number;
    name: string;
    is_configurable: boolean;
    colors?: Color[];
}

interface Material {
    id: number;
    name: string;
    parts: Part[];
}


interface VariantOption {
    id: number;
    part_option_display: {
        id: number;
        color?: Color | null;
        material?: Material | null;
        total_extra_price?: number;
        is_toggle: boolean;
    };
}

interface Variant {
    id: number;
    sku: string;
    base_price: string;
    final_price?: string | null;
    old_price?: string | null;
    currency: string;
    variant_options: VariantOption[];
    has_discount: boolean;
    discount_percent: string;
    is_default: boolean;
    is_active: boolean;
}

interface ProductImage {
    id: number;
    image: string;
    alt: string;
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


export interface ProductShort {
    name: string;
    old_price: string;
    new_price: string;
    bonus: string;
    images: ProductImage[];
    sub_categories: number[];
}