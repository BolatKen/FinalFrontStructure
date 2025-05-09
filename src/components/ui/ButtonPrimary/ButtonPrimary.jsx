import styles from './ButtonPrimary.module.css';

export default function ButtonPrimary({
    children,
    onClick,
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
        <div className='btn icon' onClick={onClick}>
            <button className={`${styles.btn__item} 
            ${styles.btn__item_padding ? isPadding : ''}
            ${styles.btn__item_selected ? isSelected : ''}
            `} >{children}</button>
            {notification}
        </div>
    );
}

export { default as ButtonPrimary } from './ButtonPrimary';