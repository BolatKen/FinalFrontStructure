import styles from './InfoCard.module.css';
import Image from 'next/image';

export default function InfoCard({ title, desc, url, alt }) {
    return (
<div className={styles.card}>
  <div className={styles.card__inner}>
    <div className={styles.card__header}>
      <div className={[styles.card__icon, '_img'].join(' ')}>
        <div className={[styles.card__img, '_img'].join(' ')}>
          <Image src={url} alt={alt} width={32} height={32}/>
        </div>
      </div>
      <div className={styles.desc__title}>
        {title}
      </div>
    </div>
    <div className={styles.desc__text}>
      {desc}
    </div>
  </div>
</div>


    );
}

export { default as InfoCard } from './InfoCard';