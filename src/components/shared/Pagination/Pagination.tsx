'use client';

import styles from './Pagination.module.css';
import PageNumberItem from '@/components/ui/PageNumberItem/PageNumberItem';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

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
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page.toString());

        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div className={[styles.pagination, '_container'].join(' ')}>
            <div className={styles.pagination__inner}>
                <div className={styles.pagination__arrow}>
                    <img src="/icons/left.svg" alt="Левая стрелка" />
                </div>
                <ul className={styles.pagination__items}>
                    {pages.map((pageNumber) => (
                        <div key={pageNumber} onClick={() => handlePageClick(pageNumber)}>
                            <PageNumberItem
                                pageNumber={pageNumber}
                                isSelected={pageNumber === currentPage}
                            />
                        </div>
                    ))}
                </ul>
                <div className={styles.pagination__arrow}>
                    <img src="/icons/right.svg" alt="Правая стрелка" />
                </div>
            </div>
        </div>
    );
}
