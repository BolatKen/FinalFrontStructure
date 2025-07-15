import Link from "next/link";
import styles from "./HeaderItem.module.css";
import { Category } from "@/types/category";
import { useState, useCallback, memo } from "react";

type HeaderItemProps = {
  category: Category;
  childrenCategories: Category[];
};

function HeaderItem({ category, childrenCategories }: HeaderItemProps) {
  const [open, setOpen] = useState(false);

  const handleMouseEnter = useCallback(() => setOpen(true), []);
  const handleMouseLeave = useCallback(() => setOpen(false), []);

  return (
    <li
      className={styles.headerItem}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={`/catalog/categories/${category.slug}`} prefetch={true}>
        <span>{category.name}</span>
      </Link>
      {childrenCategories.length > 0 && open && (
        <ul className={styles.dropdown}>
          {childrenCategories.map((child) => (
            <li className={styles.dropdownItem} key={child.id}>
              <Link href={`/catalog/categories/${child.slug}`} prefetch={true}>
                {child.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

// Мемоизируем компонент для предотвращения лишних ререндеров
export default memo(HeaderItem);

export { default as HeaderItem } from "./HeaderItem";
