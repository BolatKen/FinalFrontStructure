// import { applyFilters, getCategoryFilters, getCategoryListingBySlug } from '@/services/category.service';
// import CategoryPageClient from './CategoryPageClient';
// import parseFiltersFromUrl from '@/utils/parseFiltersFromUrl';

// interface CategoryPageProps {
//   params: { categorySlug: string };
//   searchParams: { page?: string; filtered?: string };
// }

// export default async function CategoryPage({
//   params,
//   searchParams,
// }: CategoryPageProps) {
//   const { categorySlug } = params;
//   const { filtered, page } = searchParams;
//   const currentPage = parseInt(page || '1', 10);

//   const categoryData = await getCategoryListingBySlug(categorySlug, currentPage);
//   if (!categoryData) {
//     return <div>Категория не найдена</div>;
//   }

//   const categoryFilters = await getCategoryFilters();
//   const parsedFilters = parseFiltersFromUrl(filtered);

//   const products = Object.keys(parsedFilters).length
//     ? await applyFilters(parsedFilters, categorySlug, currentPage)
//     : categoryData.products;

//   return (
//     <CategoryPageClient
//       category={categoryData}
//       products={products || []}
//       currentPage={currentPage}
//       categoryFilters={categoryFilters}
//       categorySlug={categoryData.slug}
//       initialFilters={parsedFilters}
//     />
//   );
// }

import { applyFilters, getCategoryFilters, getCategoryListingBySlug } from '@/services/category.service';
import CategoryPageClient from './CategoryPageClient';
import parseFiltersFromUrl from '@/utils/parseFiltersFromUrl';

export default async function CategoryPage({
  params,
  searchParams = {},
}: {
  params: { categorySlug: string };
  searchParams?: { page?: string; filtered?: string };
}) {
  const { categorySlug } = params;
  const { filtered, page } = searchParams;
  const currentPage = parseInt(page || '1', 10);

  const categoryData = await getCategoryListingBySlug(categorySlug, currentPage);
  if (!categoryData) {
    return <div>Категория не найдена</div>;
  }

  const categoryFilters = await getCategoryFilters();
  const parsedFilters = parseFiltersFromUrl(filtered);

  const products = Object.keys(parsedFilters).length
    ? await applyFilters(parsedFilters, categorySlug, currentPage)
    : categoryData.products;

  return (
    <CategoryPageClient
      category={categoryData}
      products={products || []}
      currentPage={currentPage}
      categoryFilters={categoryFilters}
      categorySlug={categoryData.slug}
      initialFilters={parsedFilters}
    />
  );
}

