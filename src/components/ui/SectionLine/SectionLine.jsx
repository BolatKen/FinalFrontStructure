import styles from './SectionLine.module.css';

export default function SectionLine({ className, innerText = 'О нас', isLight = true }) {
    return (
        <div className={[styles.line,
        !isLight ? styles.line_dark : ''
        ].join(' ')}>
            {innerText}
        </div>
    );
}
export { default as SectionLine } from './SectionLine.jsx';