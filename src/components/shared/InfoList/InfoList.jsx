import styles from './InfoList.module.css';
import InfoCard from '../InfoCard/InfoCard';

export default function InfoList({ }) {
    const cards = [
        {
            'title': 'Доставка по всему Казахстану',
            'desc': 'Доставляем во все города Казахстана различными транспортными компаниями',
            'icon_url': '/icons/info/truck.svg',
            'alt': 'Грузовик'
        },
        {
            'title': 'Удобные способы оплаты',
            'desc': 'Предоставляем возможность оплаты онлайн и формирование счета на оплату',
            'icon_url': '/icons/info/bank-card.svg',
            'alt': 'Оплата'
        },
        {
            'title': 'Гарантия',
            'desc': 'Мы даем годовую гарантию на всю производимую мебель',
            'icon_url': '/icons/info/shield.svg',
            'alt': 'Защита и гарантия'
        },

    ]
    return (
        <div className={styles.list}>
            <div className={[styles.list__inner, '_container-bigger'].join(' ')}>
                {cards.map((item, key) => (
                    <InfoCard key={key}
                        title={item.title}
                        desc={item.desc}
                        url={item.icon_url}
                        alt={item.alt} />
                ))}
            </div>
        </div>
    )
}

export { default as InfoList } from './InfoList';