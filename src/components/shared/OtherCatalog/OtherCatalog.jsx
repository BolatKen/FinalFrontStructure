import styles from './OtherCatalog.module.css';
import Arrow from '../../ui/Arrow/Arrow';
import { useState } from 'react';

export default function OtherCatalog({ }) {
    const otherProducts = [
        {
            'name': 'Стулья',
            'count': 4
        },
        {
            'name': 'Кушетки',
            'count': 4
        },
        {
            'name': 'Шкафы',
            'count': 4
        },
        {
            'name': 'Аксессуары',
            'count': 6
        },
        {
            'name': 'Оборудование',
            'count': 12
        },
        {
            'name': 'Зеркала',
            'count': 12
        }
    ]

    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <section className={styles.other}>
            <div className={[styles.other__inner, '_container-bigger'].join(' ')}>
                <div className={styles.other__title}>
                    Другая мебель
                </div>
                <div className={styles.other__content}>
                    <div className={styles.other__left}></div>
                    <div className={[
                        styles.other__right,
                        styles.list
                    ].join(' ')}>
                        <ul className={styles.list__inner}>
                            {otherProducts.map((item, key) => (
                                <li key={key} className={[
                                    styles.list__item,
                                    styles.item].join(' ')}
                                    onMouseEnter={() => setHoveredIndex(key)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                >
                                    <div className={styles.item__content}>
                                        <div className={styles.item__text}>
                                            {item.name}
                                        </div>
                                        <div className={[
                                            styles.item__text,
                                            styles.item__text_count
                                        ].join(' ')}>
                                            {item.count}
                                        </div>
                                    </div>
                                    <Arrow className={[
                                        styles.arrow,
                                        hoveredIndex === key ? styles.arrow_active : ''
                                    ].join(' ')} isWhite={true} direction='right' />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}

export { default as OtherCatalog } from './OtherCatalog';