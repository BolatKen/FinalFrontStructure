import Link from "next/link";
import styles from './HeaderItem.module.css';

export default function HeaderItem({ children, onClick }) {
    return (
        <li className={styles.header__item}>
            <Link href="/catalog"
                className={styles.header__link}
                onClick={onClick}>
                {children}
            </Link>
        </li>
    );
}

export { default as HeaderItem } from './HeaderItem';