import styles from './ColorConfigureEdit.module.css';
import ColorList from '../../ui/ColorList/ColorList';

export default function ColorConfigureEdit({
    className = '',
    colorData,
    configureTitle = '',
    configureVal = '',
    onColorSelect }) {
    return (
        <div className={[styles.configurator__option, styles.variant, className].join(" ")}>
            <div className={styles.variant__title}>
                {configureTitle !== '' ? (<div className={styles.variant__text}>{configureTitle}</div>) : ''}
                {configureVal !== '' ? (<div className={styles.variant__subtext}>{configureVal}</div>) : ''}
            </div>
            <div className={[styles.variant__inner].join(' ')}>
                <ColorList colorData={colorData} onColorSelect={onColorSelect} />
            </div>
        </div>
    );
};

export { default as ColorConfigureEdit } from './ColorConfigureEdit';