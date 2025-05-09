import styles from './ButtonOrange.module.css';

export default function ButtonOrange({ className='', children, onClick, type }) {
  return (
    <div className='btn'>
      <button className={[styles.btn__action, className].join(" ")} type={type} onClick={onClick}>
        {children}
      </button>
    </div>
  );
};

export { default as ButtonOrange } from './ButtonOrange';
