'use client';

import styles from './CategoryPageClient.module.css';
import Header from '@/components/layout/Header/Header';
import ButtonFilter from '@/components/ui/ButtonFilter/ButtonFilter';
import { CategoryListItem } from '@/types/category';

export default function CategoryPageClient({ category }: { category: CategoryListItem }) {
    const allFilters = {
        icon: '/icons/filter/all.svg',
        alt: 'Иконка для всех фильтров',
        name: 'Все фильтры',
        is_selected: true
    };

    return (
        <>
            <Header />
            <div className={[styles.header, '_container-bigger'].join(" ")}>
                <div className={[styles.header__content, '_container'].join(" ")}>
                    <div className={styles.header__title}>
                        {category.name}
                    </div>
                    <div className={styles.header__content}>
                        <ul className={styles.header__filters}>
                            <ButtonFilter
                                iconImage={allFilters.icon}
                                iconAlt={allFilters.name}
                                iconText={allFilters.name}
                                isSelected={allFilters.is_selected} />
                            {category?.filters.map((item, idx) => (
                                <ButtonFilter
                                    key={idx}
                                    iconImage={item.icon}
                                    iconAlt={item.name}
                                    iconText={item.name}
                                    isSelected={idx === 0} />
                            ))}
                            <span className={[styles.header__found].join(" ")}>Найдено {category?.product_count}</span>
                        </ul>
                        <ul className={[styles.header__searches, styles.searches].join(" ")}>
                            <span className={styles.searches__title}>Популярные подкатегорий:</span>
                            {category?.popular_subcategories.map((item, idx) => (
                                <li key={idx} className={styles.searches__item}>
                                    <a className={styles.searches__link} href="#">{item.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            {/* <BestOffers isListing={true} /> */}
            {/* <ListingCategories /> */}
        </>
    );
}
