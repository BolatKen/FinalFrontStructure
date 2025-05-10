import { getCategoryBySlug } from '@/services/category.service'
import { notFound } from 'next/navigation'

interface Props {
  params: {
    categoryName: string
  }
}

export default async function CategoryPage({ params }: Props) {
  const category = await getCategoryBySlug(params.categoryName)

  if (!category) return notFound()

  return (
    <div>
      <h1>Категория: {category.name}</h1>
      <p>Slug: {category.slug}</p>
      <p>ID: {category.id}</p>
    </div>
  )
}