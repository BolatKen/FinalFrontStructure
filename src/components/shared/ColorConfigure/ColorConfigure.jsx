import styles from './ColorConfigure.module.css';
import ColorList from '../../ui/ColorList/ColorList';

export default function ColorConfigure({
    configureTitle,
    colorData,
    initialSelected,
    onColorSelect
}) {
    return (
        <div className={`${styles.configure__color} ${styles.color}`}>
            <div className={styles.configure__title}>{configureTitle}</div>
            <ColorList
                colorData={colorData}
                onColorSelect={onColorSelect}
                initialSelected={initialSelected} />
        </div>
    );
};

export { default as ColorConfigure } from './ColorConfigure';