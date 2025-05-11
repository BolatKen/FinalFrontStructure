import styles from './BonusValue.module.css';


export default function BonusValue({ bonusVal, isDark = false }) {
    return (
        <div className={styles.bonus}>
            <div className={[styles.bonus__icon,
            isDark ? styles.bonus__icon_dark : styles.bonus__icon_light
            ].join(" ")}>
                <p className={styles.bonus__text}>б</p>
            </div>
            <div className={[
                styles.bonus__value,
                isDark ? styles.bonus__value_dark : ''
            ].join(" ")}>+ {bonusVal} бонусов</div>
        </div >
    );
}

export { default as BonusValue } from './BonusValue';