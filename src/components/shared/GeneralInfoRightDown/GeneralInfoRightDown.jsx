import styles from './GeneralInfoRightDown.module.css';

export default function GeneralInfoRightDown({ }) {
    const images = [
        {
            url: '/core/info/1.png',
            alt: 'Материал рамка'
        },
        {
            url: '/core/info/2.png',
            alt: 'Экокожа'
        },
        {
            url: '/core/info/3.png',
            alt: 'Велюр'
        }
    ]

    return (
        <div className={styles.block}>
            <div className={styles.block__text}>
                Leka Beauty — эксперт в профессиональной мебели и оборудовании для бьюти-индустрии
            </div>
            <div className={styles.block__text}>
                Мы более 15 лет на рынке, и за это время стали выбором тех, кто ценит стиль, надёжность и комфорт в каждом элементе интерьера
            </div>
            <div className={[styles.block__images, styles.images].join(' ')}>
                {images.map((item, key) => (
                    <div key={key} className={[styles.image, '_img'].join(' ')}>
                        <img src={item.url} alt={item.alt} />
                    </div>
                ))}
            </div>
            <p className={styles.block__desc}>Мы используем только проверенные и качественные материалы — прочные металлы, износостойкие обивки, натуральное дерево и современные композиты. Это гарантирует надёжность, комфорт и долгий срок службы нашей мебели даже при интенсивной ежедневной эксплуатации в профессиональных салонах.</p>
            <div className={[styles.block__action, styles.action].join(' ')}>
                <div className={styles.action__title}>Скачать каталог материалов</div>
                <div className={styles.action__round}>
                    <div className={[styles.action__img, '_img'].join(' ')}>
                        <img src="/icons/download.png" alt="Иконка загрузки" />
                    </div>
                </div>
            </div>

        </div>
    );
}

export { default as GeneralInfoRightDown } from './GeneralInfoRightDown';