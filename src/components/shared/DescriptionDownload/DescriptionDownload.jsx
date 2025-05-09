import styles from './DescriptionDownload.module.css';
import { ButtonOrange } from '../../ui/ButtonOrange/ButtonOrange';

export default function DescriptionDownload({ title, device = '', weight, onClick = null }) {
    let deviceTitle = ''
    if (device) {
        deviceTitle = (<>
            <div className={styles.meta__title}>{device}</div>
            <div className={styles.meta__dot}>·</div>
        </>)

    }
    return (
        <div className={styles.downloads__item}>
            <div className={styles.downloads__info}>
                <div className={styles.downloads__name}>
                    {title}
                </div>
                <div className={[styles.downloads__meta, styles.meta].join(" ")}>
                    {deviceTitle}
                    <div className={styles.meta__weight}>{weight}</div>
                </div>
            </div>
            <ButtonOrange children={"Скачать"} onClick={null} type={"button"} />
        </div>
    )
}

export { default as DescriptionDownload } from './DescriptionDownload';