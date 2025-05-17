import styles from './Pagination.module.css';
import PageNumberItem from '@/components/ui/PageNumberItem/PageNumberItem';
import Link from 'next/link';

export default function Pagination({
    currentPage,
    totalPages,
    baseUrl,
    onPageClick
}) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className={[styles.pagination, '_container'].join(' ')}>
            <div className={styles.pagination__inner}>
                <div className={styles.pagination__arrow}>
                    <img src="/icons/left.svg" alt="Левая стрелка" />
                </div>
                <ul className={styles.pagination__items}>
                    {pages.map((_, idx) => (
                        <Link key={idx}
                            href={`${baseUrl}?page=${idx + 1}`}
                            scroll={false}
                            onClick={() => {
                                if (onPageClick) onPageClick();
                            }}
                        >
                            <PageNumberItem
                                key={idx}
                                pageNumber={idx + 1}
                                isSelected={idx + 1 === currentPage} />
                        </Link>
                    ))}
                </ul>
                <div className={styles.pagination__arrow}>
                    <img src="/icons/right.svg" alt="Правая стрелка" />
                </div>
            </div>
        </div>
    )
}

export { default as Pagination } from './Pagination';