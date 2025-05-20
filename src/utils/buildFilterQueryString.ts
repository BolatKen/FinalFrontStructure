import { FilteredData } from "@/types/category";

function buildFilterQueryString(filters: FilteredData): string {
    const parts: string[] = [];

    for (const key in filters) {
        const value = filters[key as keyof FilteredData];

        if (Array.isArray(value)) {
            value.forEach((v) => {
                parts.push(`${key}:${v}`);
            });
        } else if (value !== undefined && value !== null && value !== '') {
            parts.push(`${key}:${value}`);
        }
    }

    return parts.join(',');
}

export default buildFilterQueryString;