import styles from './GeneralInfoRightUpper.module.css';

export default function GeneralInfoRightUpper({ }) {
    return (
        <div className={styles.right}>
            <h2 className={styles.right__title}>Мы предоставляем полный спектр мебели для бьюти–бизнеса</h2>
            <p className={styles.right__text}>
                Мы предлагаем широкий ассортимент профессиональной мебели для барбершопов, салонов красоты, массажных и спа-центров, студий маникюра и педикюра, тату-салонов, косметологических кабинетов и других заведений сферы красоты и ухода. В нашем каталоге вы найдёте всё необходимое для создания стильного, комфортного и функционального пространства, которое подчеркнёт уровень вашего сервиса.
            </p>
        </div>
    );
}

export { default as GeneralInfoRightUpper } from './GeneralInfoRightUpper.jsx';