import styles from "./Subscribe.module.css";

export default function Subscribe() {
  return (
    <div className={styles.podpiska}>
      <div className={styles.podpiska__inner}>
        <h2 className={styles.podpiska__title}>
          Подпишитесь на рассылку, чтобы узнавать о новинках первыми
        </h2>

        <p className={styles.podpiska__desc}>
          Нажимая кнопку подписаться, вы соглашаетесь на обработку персональных
          данных
        </p>

        <form className={styles.podpiska__form}>
          <input
            type="email"
            className={styles.podpiska__input}
            placeholder="Электронная почта"
          />
          <button type="submit" className={styles.podpiska__btn}>
            Подписаться
          </button>
        </form>
      </div>
    </div>
  );
}
