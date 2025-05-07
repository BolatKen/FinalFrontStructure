export default function Subscribe() {
  return (
    <div className="podpiska">
      <div className="podpiska__inner">
        <h2 className="podpiska__title">
          Подпишитесь на рассылку, чтобы узнавать о новинках первыми
        </h2>

        <p className="podpiska__desc">
          Нажимая кнопку подписаться, вы соглашаетесь на обработку персональных
          данных
        </p>

        <form className="podpiska__form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            className="podpiska__input"
            placeholder="Электронная почта"
          />
          <button type="submit" className="podpiska__btn">
            Подписаться
          </button>
        </form>
      </div>
    </div>
  );
}
