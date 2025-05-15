import styles from './GeneralInfo.module.css';
import SectionLine from '../../ui/SectionLine/SectionLine.jsx';

export default function GeneralInfo({
    className,
    contentLeft,
    contentRight,
    isLight = false,
}) {
    return (
        <section className={[styles.general,
        isLight ? styles.general_light : ''
        ].join(' ')}>
            <div className={[styles.general__inner, '_container-bigger'].join(' ')}>
                <SectionLine isLight={!isLight} />

                <div className={[styles.general__content, styles.content].join(' ')}>
                    <div className={[styles.content__left].join(' ')}>
                        {contentLeft}
                    </div>
                    <div className={[styles.content__right].join(' ')}>
                        {contentRight}
                    </div>
                </div>
            </div>
        </section>
    );
}

export { default as GeneralInfo } from './GeneralInfo.jsx';
