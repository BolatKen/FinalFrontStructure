import { JSX } from 'react'
import { ProductShort } from './product';
import { Color } from './product';

export interface Category {
    // map(arg0: (product: any) => JSX.Element): import("react").ReactNode
    // length: number
    id: number;
    name: string;
    slug: string;
    parent: number;
    is_full_format: boolean;
    is_in_welcome: boolean;
}

export interface CategoryWelcome {
    id: number;
    name: string;
    subcategories: Category[];
    products: ProductShort[];
    material_colors: Color[];
    is_full_format: boolean;
}