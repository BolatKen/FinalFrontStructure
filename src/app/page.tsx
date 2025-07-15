import MainWelcome from "@/components/sections/MainWelcome/MainWelcome";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leka Beauty - Главная страница",
  description:
    "Leka Beauty - косметика и товары для красоты. Популярные товары и новинки.",
  openGraph: {
    title: "Leka Beauty - Главная страница",
    description:
      "Leka Beauty - косметика и товары для красоты. Популярные товары и новинки.",
  },
};

// Включаем статическую генерацию для этой страницы
export const revalidate = 3600; // Ревалидация раз в час

export default async function Home() {
  // Получаем данные на этапе сборки
  const API_URL = process.env.NEXT_PUBLIC_API_DOMAIN;

  let products = [];
  let categories = [];

  try {
    // Получаем продукты для главной страницы
    const productsResponse = await fetch(`${API_URL}/catalog/home/`, {
      cache: "force-cache", // Кешируем на этапе сборки
    });
    if (productsResponse.ok) {
      const productsData = await productsResponse.json();
      if (Array.isArray(productsData) && productsData.length > 0) {
        products = productsData;
      }
    }

    // Получаем категории
    const categoriesResponse = await fetch(
      `${API_URL}/catalog/home/categories/`,
      {
        cache: "force-cache", // Кешируем на этапе сборки
      }
    );
    if (categoriesResponse.ok) {
      categories = await categoriesResponse.json();
    }
  } catch (error) {
    console.error("Ошибка загрузки данных:", error);
  }

  return (
    <>
      <MainWelcome products={products} categories={categories} />
    </>
  );
}
