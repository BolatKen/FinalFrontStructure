'use client';
import styles from './OtherCatalog.module.css';
import Arrow from '../../ui/Arrow/Arrow';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function OtherCatalog() {
  const [categories, setCategories] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/catalog/categories/with-count/`)
      .then(res => res.json())
      .then(data => {
        // console.log('🔥 categories from backend:', data);
        setCategories(data);
      })
      .catch(console.error);
  }, []);

  return (
    <section className={styles.other}>
      <div className={[styles.other__inner, '_container-bigger'].join(' ')}>
        <div className={styles.other__title}>Другая мебель</div>
        <div className={styles.other__content}>
          <div className={styles.other__left}></div>
          <div className={[styles.other__right, styles.list].join(' ')}>
            <ul className={styles.list__inner}>
              {categories.map((item, key) => (
                <li
                  key={key}
                  className={[styles.list__item, styles.item].join(' ')}
                  onMouseEnter={() => setHoveredIndex(key)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => router.push(`/catalog/categories/${item.slug}`)}
                >
                  <div className={styles.item__content}>
                    <div className={styles.item__text}>{item.name}</div>
                    <div className={[styles.item__text, styles.item__text_count].join(' ')}>
                      {item.count}
                    </div>
                  </div>
                  <Arrow
                    className={[styles.arrow, hoveredIndex === key ? styles.arrow_active : ''].join(' ')}
                    isWhite={true}
                    direction='right'
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
