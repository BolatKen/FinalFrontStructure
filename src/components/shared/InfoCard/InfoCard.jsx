import styles from './InfoCard.module.css';

export default function InfoCard({ title, desc, url, alt }) {
    return (
        <div className={styles.card}>
            <div className={styles.card__inner}>
                <div className={[styles.card__icon, '_img'].join(' ')}>
                    <div className={[styles.card__img, '_img'].join(' ')}>
                        <img src={url} alt={alt} />
                    </div>
                </div>
                <div className={[styles.card__desc, styles.desc].join(' ')}>
                    <div className={styles.desc__title}>
                        {title}
                    </div>
                    <div className={styles.desc__text}>
                        {desc}
                    </div>
                </div>
            </div>
        </div>

    );
}

export { default as InfoCard } from './InfoCard';