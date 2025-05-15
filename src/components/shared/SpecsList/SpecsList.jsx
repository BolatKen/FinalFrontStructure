import styles from './SpecsList.module.css';

export default function SpecsList({ specsData }) {
    return (
        <ul className={styles.list}>
            {specsData.map((item, idx) => (
                <div key={idx} className={styles.list__row}>
                    <div className={[styles.list__inner].join(' ')}>
                        <div className={styles.list__name}>{item.name}</div>
                        <div className={styles.list__line}></div>
                    </div>
                    <div className={styles.list__values}>{item.values}</div>
                </div>
            ))}
        </ul>
    )
}

export { default as SpecsList } from './SpecsList';