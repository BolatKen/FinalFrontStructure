import Link from "next/link";
import styles from "./HeaderItem.module.css";
import { Category } from "@/types/category";

import { useState } from "react";

type HeaderItemProps = {
  category: Category;
  childrenCategories: Category[];
};

export default function HeaderItem({
  category,
  childrenCategories,
}: HeaderItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <li
      className={styles.headerItem}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link href={`/catalog/categories/${category.slug}`}><span>{category.name}</span></Link>
      {childrenCategories.length > 0 && open && (
        <ul className={styles.dropdown}>
          {childrenCategories.map((child) => (
            <li className={styles.dropdownItem} key={child.id}>
              <Link href={`/catalog/categories/${child.slug}`}>
                {child.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export { default as HeaderItem } from "./HeaderItem";
