import { getCategoryListingBySlug } from '@/services/category.service'
import CategoryPageClient from './CategoryPageClient';


type Props = {
  params: {
    categorySlug: string;
  };
};

export default async function CategoryPage({ params }: Props) {
  const { categorySlug } = await params;
  const categoryData = await getCategoryListingBySlug(categorySlug);

  return <CategoryPageClient category={categoryData} />;
}