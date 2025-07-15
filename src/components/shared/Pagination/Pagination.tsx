"use client";

import styles from "./Pagination.module.css";
import PageNumberItem from "@/components/ui/PageNumberItem/PageNumberItem";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handlePageClick = (page: number) => {
    if (page < 1 || page > totalPages) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());

    // Используем replace для более быстрой навигации
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className={[styles.pagination, "_container"].join(" ")}>
      <div className={styles.pagination__inner}>
        <div
          className={`${styles.pagination__arrow} ${
            currentPage === 1 ? styles.pagination__arrow_disabled : ""
          }`}
          onClick={() => handlePageClick(currentPage - 1)}
        >
          <img src="/icons/left.svg" alt="Левая стрелка" />
        </div>
        <ul className={styles.pagination__items}>
          {pages.map((pageNumber) => (
            <li key={pageNumber} onClick={() => handlePageClick(pageNumber)}>
              <PageNumberItem
                pageNumber={pageNumber}
                isSelected={pageNumber === currentPage}
              />
            </li>
          ))}
        </ul>
        <div
          className={`${styles.pagination__arrow} ${
            currentPage === totalPages ? styles.pagination__arrow_disabled : ""
          }`}
          onClick={() => handlePageClick(currentPage + 1)}
        >
          <img src="/icons/right.svg" alt="Правая стрелка" />
        </div>
      </div>
    </div>
  );
}
