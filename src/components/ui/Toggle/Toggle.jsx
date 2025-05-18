import styles from './Toggle.module.css';

export default function Toggle({ setter = false, method }) {
    return (
        <label className={styles.switch}>
            <input
                type="checkbox"
                checked={setter}
                onChange={(e) => method(e.target.checked)}
            />
            <span className={styles.slider}></span>
        </label>
    );
}

export { default as Toggle } from './Toggle';