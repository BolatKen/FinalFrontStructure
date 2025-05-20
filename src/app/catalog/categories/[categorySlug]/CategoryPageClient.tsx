"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./CategoryPageClient.module.css";
import Header from "@/components/layout/Header/Header";
import BestOffers from "@/components/sections/BestOffers/BestOffers";
import { ListingCategories } from "@/components/sections/ListingCategories/ListingCategories";
import ButtonFilter from "@/components/ui/ButtonFilter/ButtonFilter";
import { CategoryFilters, CategoryListItem } from "@/types/category";
import { Pagination } from "@/components/shared/Pagination/Pagination";
import FiltersModal from "@/components/sections/Filters/FiltersModal";
import { ProductShort } from "@/types/product";

export default function CategoryPageClient({
  category,
  currentPage,
  categoryFilters,
}: {
  category: CategoryListItem;
  currentPage: number;
  categoryFilters: CategoryFilters | null;
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen((prev) => (prev = !prev));
  };
  const pagesNum = Math.ceil(category.product_count / 15);

  const listRef = useRef<HTMLDivElement>(null);
  const scrollToListing = () => {
    listRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const [selectedSubcategory, setSelectedSubcategory] = useState<number | null>(null);
  const [selectedTag, setSelectedTag] = useState<number | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<ProductShort[]>(category?.products || []);

  const handleSubcategoryClick = (subcategoryId: number) => {
    setSelectedSubcategory(subcategoryId);
    listRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleTagClick = (tagId: number) => {
    setSelectedTag(tagId);
  }

  useEffect(() => {
    let filtered = category?.products || [];

    if (selectedSubcategory !== null) {
      filtered = filtered.filter((product) =>
        product.sub_categories.includes(selectedSubcategory)
      );
    }
    if (selectedTag !== null) {
      filtered = filtered.filter((product) =>
        product.tags.includes(selectedTag)
      );
    }

    setFilteredProducts(filtered);
  }, [selectedSubcategory, selectedTag, category?.products]);

  const resetFilters = () => {
    setSelectedSubcategory(null);
    setSelectedTag(null);
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
                  isSelected={selectedTag === item.id}
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
              onApply={(filters) => {
                console.log("Applied filters:", filters);
              }} />
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
        baseUrl={`/catalog/categories/${category.slug}`}
        onPageClick={scrollToListing}
      />
    </>
  );
}
