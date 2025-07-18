import styles from './ButtonPrimary.module.css';

export default function ButtonPrimary({
    className = '',
    children,
    onClick,
    isWhite = false,
    isSelected = false,
    isPadding = false,
    isNotification = false
}) {
    let notification = ''
    if (isNotification) {
        notification = <div className="icon__notification">
            <img src="/icons/check.png" alt="check-icon" />
        </div>
    }
    return (
        <div className={['btn', 'icon', className].join(" ")} onClick={onClick} >
            <button className={`${styles.btn__item} 
            ${isPadding ? styles.btn__item_padding : ''}
            ${isSelected ? styles.btn__item_selected_light : ''}
            ${(isSelected & isPadding) ? styles.btn__item_selected : ''}
            ${isWhite ? styles.btn__item_white : ''}
            `} >{children}</button>
            {notification}
        </div >
    );
}

export { default as ButtonPrimary } from './ButtonPrimary';