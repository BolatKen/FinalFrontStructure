import styles from './Arrow.module.css';

export default function Arrow({
  direction = 'left',
  isWhite = false,
  onClick,
  disabled = false
}) {
  let directionStyle = '';
  let altText = 'arrow-left';

  if (direction === 'right') {
    directionStyle = styles.arrow__item_right;
    altText = 'arrow-right';
  } else if (direction === 'up') {
    directionStyle = styles.arrow__item_up;
    altText = 'arrow-up';
  }

  return (
    <div
      className={styles.arrow}
      onClick={!disabled ? onClick : undefined}
      style={{
        opacity: disabled ? 0.4 : 1,
        pointerEvents: disabled ? "none" : "auto",
      }}
    >

      {isWhite ? (<img
        className={`${styles.arrow__item} ${directionStyle} ${isWhite ? styles.arrow_white : styles.arrow_dark}`}
        src="/icons/arrow-white.svg"
        alt={altText}
      />) : (<img
        className={`${styles.arrow__item} ${directionStyle} ${isWhite ? styles.arrow_white : styles.arrow_dark}`}
        src="/icons/arrow.svg"
        alt={altText}
      />)}
    </div>
  );
}
