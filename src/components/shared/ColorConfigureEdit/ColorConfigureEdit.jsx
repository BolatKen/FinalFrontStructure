import styles from './ColorConfigureEdit.module.css';
import ColorList from '../../ui/ColorList/ColorList';
import { ButtonPrimary } from '../../ui/ButtonPrimary/ButtonPrimary';

export default function ColorConfigureEdit({ configureTitle, configureVal, colorData }) {
    return (
        <div className={[styles.configurator__option, styles.variant].join(" ")}>
            <div className={styles.variant__title}>
                <div className={styles.variant__text}>{configureTitle}</div>
                <div className={styles.variant__subtext}>{configureVal}</div>
            </div>
            <div className={styles.variant__inner}>
                <ColorList colorData={colorData} onColorSelect={undefined} />
                <ButtonPrimary children={"Под заказ"} onClick={null} />
            </div>
        </div>
    );
};

export { default as ColorConfigureEdit } from './ColorConfigureEdit';