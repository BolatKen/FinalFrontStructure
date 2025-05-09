import styles from './ButtonOrange.module.css';

export default function ButtonOrange({ children, onClick, type }) {
  return (
    <div className='btn'>
      <button className={styles.btn__action} type={type} onClick={onClick}>
        {children}
      </button>
    </div>
  );
};

export { default as ButtonOrange } from './ButtonOrange';
