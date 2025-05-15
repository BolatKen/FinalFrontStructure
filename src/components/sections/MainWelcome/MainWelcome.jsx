import styles from './MainWelcome.module.css';
import ButtonPrimary from '../../ui/ButtonPrimary/ButtonPrimary.jsx'
import BonusValue from '../../ui/BonusValue/BonusValue.jsx';
import Header from '@/components/layout/Header/Header';
import GeneralInfo from '../../shared/GeneralInfo/GeneralInfo.jsx';
import GeneralInfoRightUpper from '../../shared/GeneralInfoRightUpper/GeneralInfoRightUpper.jsx';
import GeneralInfoRightDown from '../../shared/GeneralInfoRightDown/GeneralInfoRightDown.jsx';
import GeneralInfoLeftDown from '../../shared/GeneralInfoLeftDown/GeneralInfoLeftDown.jsx';
import InfoList from '../../shared/InfoList/InfoList';

export default function MainWelcome() {
    const rightContent = (<GeneralInfoRightUpper />)
    const rightContentDown = (<GeneralInfoRightDown />)
    const leftContentDown = (<GeneralInfoLeftDown />)
    return (
        <>
            <section className={[styles.welcome].join(' ')}>
                <div className={[styles.welcome__img, '_img'].join(' ')}>
                    <img src="/core/welcome.png" alt="Главная фотография блока приветствия" />
                </div>
                <Header isBlur={true} />
                <div className={styles.welcome__inner}>
                    <div className={[styles.welcome__description, styles.desc].join(' ')}>
                        <div className={["_container-bigger", styles.desc__inner].join(' ')}>
                            <div className={styles.desc__content}>
                                <div className={styles.desc__ticket}>
                                    <div className={styles['desc__ticket-text']}>Новинка</div>
                                </div>
                                <h1 className={styles.desc__title}>Short title</h1>
                                <p className={styles.desc__text}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                <div className={[styles.desc__price].join(' ')}>
                                    <div className={styles.price__value}>240.000 KZT</div>
                                    <BonusValue bonusVal={"12 000"} />
                                </div>
                                <ButtonPrimary isWhite={true} children={'Купить'} onClick={() => { }} />
                            </div>
                            <div className={styles['welcome__items-wrapper']}>
                                <ul className={[styles.welcome__items, styles.items].join(' ')}>
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <li className={
                                            [styles.items__elem,
                                            i === 0 ? styles.items__elem_selected : '',
                                            ].join(' ')
                                        } key={i}></li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <GeneralInfo contentRight={rightContent} />
            <InfoList />
            <GeneralInfo
                contentLeft={leftContentDown}
                contentRight={rightContentDown}
                isLight={true} />
        </>
    );
}

export { default as MainWelcome } from './MainWelcome.jsx';