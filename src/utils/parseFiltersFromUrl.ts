import { FilteredData } from "@/types/category";

export function parseFiltersFromUrl(filtered?: string): FilteredData {
    if (!filtered) return {
        activeTagIds: [],
        color: 0,
        priceFrom: "",
        priceTo: "",
        selectedMaterialId: 0
    };
    const result: FilteredData = {
        activeTagIds: [],
        color: 0,
        priceFrom: "",
        priceTo: "",
        selectedMaterialId: 0
    };

    filtered.split(',').forEach((pair) => {
        const [key, value] = pair.split(':');
        if (key && value) {
            switch (key) {
                case "activeTagIds":
                    if (!Array.isArray(result.activeTagIds)) result.activeTagIds = [];
                    result.activeTagIds.push(Number(value));
                    break;
                case "color":
                    result.color = Number(value);
                    break;
                case "priceFrom":
                    result.priceFrom = value;
                    break;
                case "priceTo":
                    result.priceTo = value;
                    break;
                case "selectedMaterialId":
                    result.selectedMaterialId = Number(value);
                    break;
                default:
                    break;
            }
        }
    });

    return result;
}

export default parseFiltersFromUrl;
