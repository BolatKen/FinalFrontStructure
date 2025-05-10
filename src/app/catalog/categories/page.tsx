// src/app/catalog/categories/page.tsx
import { getCategories } from '@/services/category.service'
import Link from 'next/link'

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Категории товаров</h1>
      <ul className="space-y-4">
        {categories.map((category) => (
          <li key={category.id}>
            <Link
              href={`/catalog/category/${category.slug}`}
              className="text-blue-600 hover:underline"
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
