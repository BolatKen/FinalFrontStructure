import { applyFilters, getCategoryFilters, getCategoryListingBySlug } from '@/services/category.service'
import CategoryPageClient from './CategoryPageClient';
import parseFiltersFromUrl from '@/utils/parseFiltersFromUrl';


type PageProps = {
  params: {
    categorySlug: string;
  };
  searchParams: {
    page?: string;
    filtered?: string;
  };
};

export default async function CategoryPage({ params, searchParams }: PageProps
  ) {
  const { categorySlug } = await params;
  const searchParamsResolved = await searchParams;
  const { filtered, page } = searchParamsResolved;
  const currentPage = parseInt(page || '1', 10);

  const categoryData = await getCategoryListingBySlug(categorySlug, currentPage);
  if (!categoryData) {
    return <div>Категория не найдена</div>;
  }
  const categoryFilters = await getCategoryFilters();

  const parsedFilters = parseFiltersFromUrl(filtered);

 const filteredResult = Object.keys(parsedFilters).length
  ? await applyFilters(parsedFilters, categorySlug, currentPage)
  : { products: categoryData.products, products_length: categoryData.products.length };

 const products = filteredResult?.products || [];
 const products_length = filteredResult?.products_length ?? products.length;


  return <CategoryPageClient
    category={categoryData}
    products={products || []}
    currentPage={currentPage}
    categoryFilters={categoryFilters}
    categorySlug={categoryData.slug}
    initialFilters={parsedFilters} 
    products_length={products_length}/>;
}