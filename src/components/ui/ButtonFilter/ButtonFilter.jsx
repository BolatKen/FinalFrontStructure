import styles from './ButtonFilter.module.css';

export default function ButtonFilter(
    {
        iconImage,
        iconAlt,
        iconText,
        isSelected
    }) {
    return (
        <div className={[styles['filter-btn'], 'btn'].join(" ")}>
            <button className={[
                styles['filter-btn__item'],
                isSelected ? styles['filter-btn__item_selected'] : ''].join(" ")
            }>
                <img src={iconImage} alt={iconAlt} />
                <span className={[styles['filter-btn__text'], iconImage ? styles['filter-btn__text_margin'] : ''].join(" ")}>{iconText}</span>
            </button>
        </div>
    );
}

export { default as ButtonFilter } from './ButtonFilter';