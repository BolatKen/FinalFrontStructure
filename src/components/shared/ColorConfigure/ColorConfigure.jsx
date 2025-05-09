import styles from './ColorConfigure.module.css';
import { ColorList } from '../../ui/ColorList/ColorList';

export default function ColorConfigure({ configureTitle, colorData }) {
    return (
        <div className={`${styles.configure__color} ${styles.color}`}>
            <div className={styles.configure__title}>{configureTitle}</div>
            <ColorList colorData={colorData} />
        </div>
    );
};

export { default as ColorConfigure } from './ColorConfigure';