export type ColorItemType = {
    name: string;
    hex_code: string;
    image: string;
    isSelected: boolean;
    variant: number;
};


export interface Color {
    id: number;
    name: string;
    hex_code: string;
    image: string;
    extra_price: string;
    material: number;
}
