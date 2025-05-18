"use client";

import { useState, useRef } from "react";
import styles from "./CategoryPageClient.module.css";
import Header from "@/components/layout/Header/Header";
import BestOffers from "@/components/sections/BestOffers/BestOffers";
import ListingCategories from "@/components/sections/ListingCategories/ListingCategories";
import ButtonFilter from "@/components/ui/ButtonFilter/ButtonFilter";
import { CategoryListItem } from "@/types/category";
import { Pagination } from "@/components/shared/Pagination/Pagination";
import FiltersModal from "@/components/sections/Filters/FiltersModal";

export default function CategoryPageClient({
  category,
  currentPage,
}: {
  category: CategoryListItem;
  currentPage: number;
}) {
  const allFilters = {
    icon: "/icons/filter/all.svg",
    alt: "Иконка для всех фильтров",
    name: "Все фильтры",
    is_selected: true,
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };
  const pagesNum = Math.ceil(category.product_count / 15);

  const listRef = useRef<HTMLDivElement>(null);
  const scrollToListing = () => {
    listRef.current?.scrollIntoView({ behavior: "smooth" });
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
                  isSelected={idx === 0}
                  onClick={console.log("smth")}
                />
              ))}
              <span className={[styles.header__found].join(" ")}>
                Найдено {category?.product_count}
              </span>
            </ul>

            <FiltersModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onApply={(filters) => {
                // TODO: handle filter application
                console.log("Applied filters:", filters);
              }}
            >
              {/* Здесь размести контент фильтров, например: */}
              <h2>Фильтры</h2>
              {/* список фильтров, чекбоксы и т.п. */}
            </FiltersModal>
            <ul
              className={[styles.header__searches, styles.searches].join(" ")}
            >
              <span className={styles.searches__title}>
                Популярные подкатегорий:
              </span>
              {category?.popular_subcategories.map((item, idx) => (
                <li key={idx} className={styles.searches__item}>
                  <a className={styles.searches__link} href="#">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <BestOffers products={category.best_offers} isListing={true} />
      <div ref={listRef} className={styles["scroll-target"]}>
        <ListingCategories products={category.products} />
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
