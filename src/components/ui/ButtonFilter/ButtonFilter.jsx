import styles from './ButtonFilter.module.css';
import Toggle from '@/components/ui/Toggle/Toggle';

export default function ButtonFilter({
    iconImage,
    iconAlt,
    iconText,
    isSelected,
    isToggle = false,
    onClick
}) {
    return (
        <div className={[styles['filter-btn'], 'btn'].join(" ")}>
            <button
                onClick={onClick}
                className={[
                    styles['filter-btn__item'],
                    isSelected ? styles['filter-btn__item_selected'] : ''
                ].join(" ")}
            >
                {(iconImage !== null && iconImage !== '')  ? (<img className={styles['filter-btn__img']} src={iconImage} alt={iconAlt} />) : ''}
                {isToggle ? (<Toggle />) : ''}
                <span className={[
                    styles['filter-btn__text'],
                    (iconImage || isToggle) ? styles['filter-btn__text_margin'] : ''
                ].join(" ")}>
                    {iconText}
                </span>
            </button>
        </div>
    );
}
