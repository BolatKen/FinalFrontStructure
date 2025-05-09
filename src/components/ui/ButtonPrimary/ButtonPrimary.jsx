import styles from './ButtonPrimary.module.css';

export default function ButtonPrimary({ children, onClick }) {
    return (
        <div className='btn' onClick={onClick}>
            <button className={styles.btn__item} >{children}</button>
        </div>
    );
}

export { default as ButtonPrimary } from './ButtonPrimary';