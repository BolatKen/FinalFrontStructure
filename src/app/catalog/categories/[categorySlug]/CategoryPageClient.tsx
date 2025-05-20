"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./CategoryPageClient.module.css";
import Header from "@/components/layout/Header/Header";
import BestOffers from "@/components/sections/BestOffers/BestOffers";
import { ListingCategories } from "@/components/sections/ListingCategories/ListingCategories";
import ButtonFilter from "@/components/ui/ButtonFilter/ButtonFilter";
import { CategoryFilters, CategoryListItem, FilteredData } from "@/types/category";
import Pagination from "@/components/shared/Pagination/Pagination";
import FiltersModal from "@/components/sections/Filters/FiltersModal";
import { ProductShort } from "@/types/product";
import { applyFilters } from "@/services/category.service";
import buildFilterQueryString from "@/utils/buildFilterQueryString";

export default function CategoryPageClient({
  category,
  products,
  currentPage,
  categoryFilters,
  categorySlug,
  initialFilters,
}: {
  category: CategoryListItem;
  products: ProductShort[];
  currentPage: number;
  categoryFilters: CategoryFilters | null;
  categorySlug: string;
  initialFilters: FilteredData;
}) {
  const allFilters = {
    icon: "/icons/filter/all.svg",
    alt: "Иконка для всех фильтров",
    name: "Все фильтры",
    is_selected: true,
  };
  const resetAll = {
    icon: "/icons/filter/circular.png",
    alt: "Сброс всех настроек",
    name: "Сбросить фильтры",
    is_selected: true,
  };

  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen((prev) => (prev = !prev));
  };
  const pagesNum = Math.ceil(products.length / 15);

  const listRef = useRef<HTMLDivElement>(null);

  const [selectedSubcategory, setSelectedSubcategory] = useState<number | null>(null);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductShort[]>(products || []);
  const [filters, setFilters] = useState<FilteredData>(initialFilters || {} as FilteredData);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      const filtered = await applyFilters(filters, categorySlug, currentPage);
      setFilteredProducts(filtered || []);
    };
    fetchFilteredProducts();
  }, [filters, categorySlug, currentPage]);

  const handleApplyFilters = (newFilters: FilteredData) => {
    const queryString = buildFilterQueryString(newFilters);
    const url = queryString
      ? `/catalog/categories/${categorySlug}?filtered=${queryString}&page=1`
      : `/catalog/categories/${categorySlug}?page=1`;

    router.push(url);

    setFilters(newFilters);
  };

  const handleSubcategoryClick = (subcategoryId: number) => {
    setSelectedSubcategory((prev) => (prev === subcategoryId ? null : subcategoryId));
  };

  const handleTagClick = (tagId: number) => {
    setSelectedTags((prev) =>
      prev.includes(tagId) ? prev.filter(id => id !== tagId) : [...prev, tagId]
    );
  }

  useEffect(() => {
    let filtered = products;

    if (selectedSubcategory !== null) {
      filtered = filtered.filter(product =>
        product.sub_categories.includes(selectedSubcategory)
      );
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter(product =>
        selectedTags.every(tagId => product.tags.includes(tagId))
      );
    }

    setFilteredProducts(filtered);
  }, [selectedSubcategory, selectedTags, products]);

  const resetFilters = () => {
    setSelectedSubcategory(null);
    setSelectedTags([]);
    setFilteredProducts(products);
    const url = `/catalog/categories/${categorySlug}?page=1`;
    router.push(url);
  };

  return (
    <>
      <Header />
      <div className={[styles.header, "_container-bigger"].join(" ")}>
        <div className={[styles.header__content, "_container"].join(" ")}>
          <div className={styles.header__title}>{category.name}</div>
          <div className={styles.header__content}>
            <ul className={styles.header__filters}>
              <ButtonFilter
                iconImage={allFilters.icon}
                iconAlt={allFilters.name}
                iconText={allFilters.name}
                isSelected={allFilters.is_selected}
                onClick={toggleModal}
              />
              {category?.filters.map((item, idx) => (
                <ButtonFilter
                  key={idx}
                  iconImage={item.icon}
                  iconAlt={item.name}
                  iconText={item.name}
                  isSelected={selectedTags.includes(item.id)}
                  isToggle={item.is_toggle}
                  onClick={() => handleTagClick(item.id)}
                />
              ))}
              <ButtonFilter
                iconImage={resetAll.icon}
                iconAlt={resetAll.name}
                iconText={resetAll.name}
                isSelected={resetAll.is_selected}
                onClick={resetFilters}
              />
              <span className={[styles.header__found].join(" ")}>
                Найдено {category?.product_count}
              </span>
            </ul>


            <FiltersModal
              categoryFilters={categoryFilters}
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onApply={handleApplyFilters} />
            <ul
              className={[styles.header__searches, styles.searches].join(" ")}
            >
              <span className={styles.searches__title}>
                Популярные подкатегорий:
              </span>
              {category?.popular_subcategories.map((item, idx) => (
                <li key={idx} className={styles.searches__item}>
                  <a className={[
                    styles.searches__link,
                    (selectedSubcategory == item.id ? styles.searches__link_selected : '')
                  ].join(' ')}
                    onClick={() => handleSubcategoryClick(item.id)}>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div >
      <BestOffers products={category.best_offers} isListing={true} />
      <div ref={listRef} className={styles["scroll-target"]}>
        <ListingCategories products={filteredProducts} />
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={pagesNum}
      />
    </>
  );
}
