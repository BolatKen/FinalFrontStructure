import styles from './ButtonOrange.module.css';

interface ButtonOrangeProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export default function ButtonOrange({ className = '', children, onClick, type = "button" }: ButtonOrangeProps) {
  return (
    <div className="btn">
      <button className={[styles.btn__action, className].join(" ")} type={type} onClick={onClick}>
        {children}
      </button>
    </div>
  );
};

export { default as ButtonOrange } from './ButtonOrange';
