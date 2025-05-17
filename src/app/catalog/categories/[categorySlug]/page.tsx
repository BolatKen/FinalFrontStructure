import { getCategoryListingBySlug } from '@/services/category.service'
import CategoryPageClient from './CategoryPageClient';


type Props = {
  params: {
    categorySlug: string;
  };
  searchParams: { page?: string };
};

export default async function CategoryPage({ params, searchParams }: Props) {
  const { categorySlug } = await params;
  const { page } = await searchParams;
  const currentPage = parseInt(page || '1', 10);
  const categoryData = await getCategoryListingBySlug(categorySlug, currentPage);

  if (!categoryData) {
    return <div>Категория не найдена</div>;
  }

  return <CategoryPageClient category={categoryData} currentPage={currentPage} />;
}