// src/app/catalog/categories/page.tsx
import { getCategories } from '@/services/category.service'
import styles from './page.module.css';
import BestOffers from '@/components/sections/BestOffers/BestOffers';
import ListingCategories from '@/components/sections/ListingCategories/ListingCategories';
import Arrow from '@/components/ui/Arrow/Arrow';
import ButtonFilter from '@/components/ui/ButtonFilter/ButtonFilter';
import Header from '@/components/layout/Header/Header';

export default async function CategoriesPage() {
  // const categories = await getCategories()

  const filtersItems = [
    {
      iconImage: '/icons/filter/all.svg',
      iconAlt: 'Иконка для всех фильтров',
      iconText: 'Все фильтры',
      isSelected: true
    },
    {
      iconImage: '/icons/filter/toggle.svg',
      iconAlt: 'Иконка переключателя',
      iconText: 'В наличии',
      isSelected: false
    },
    {
      iconImage: '/icons/filter/discount.svg',
      iconAlt: 'Иконка для скидок',
      iconText: 'Распродажа',
      isSelected: false
    },
    {
      iconText: 'С подлакотником',
      isSelected: false
    },
    {
      iconText: 'Размеры',
      isSelected: false
    },
    {
      iconText: 'Подъемный механизм',
      isSelected: false
    },
  ]

  const searchQueries = [
    'Интернет-магазин',
    'Интернет-магазин',
    'Интернет-магазин',
    'Интернет-магазин',
    'Интернет-магазин',
    'Интернет-магазин',
  ]

  return (
    <>
      <Header />
      <div className={[styles.header, '_container-bigger'].join(" ")}>
        <Arrow onClick={undefined} />
        <div className={[styles.header__content, '_container'].join(" ")}>
          <div className={styles.header__title}>
            short title
          </div>
          <div className={styles.header__content}>
            <ul className={styles.header__filters}>
              {filtersItems.map((item, idx) => (
                <ButtonFilter
                  key={idx}
                  iconImage={item.iconImage}
                  iconAlt={item.iconAlt}
                  iconText={item.iconText}
                  isSelected={item.isSelected} />
              ))}
              <span className={[styles.header__found].join(" ")}>Найдено 468</span>
            </ul>
            <ul className={[styles.header__searches, styles.searches].join(" ")}>
              <span className={styles.searches__title}>Популярные запросы:</span>
              {searchQueries.map((item, idx) => (
                <li key={idx} className={styles.searches__item}>
                  <a className={styles.searches__link} href="#">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Arrow direction='right' onClick={undefined} />
      </div>
      <BestOffers isListing={true} />
      <ListingCategories />
    </>
  )
}
