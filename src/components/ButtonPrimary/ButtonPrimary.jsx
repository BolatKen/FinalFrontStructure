import styles from './ButtonPrimary.module.css';

export default function ButtonPrimary({ children, onClick }) {
    return (
        <div className={styles.button} onClick={onClick}>
            <button className={styles.button__item} >{children}</button>
        </div>
    );
}

export { default as ButtonPrimary } from './ButtonPrimary';