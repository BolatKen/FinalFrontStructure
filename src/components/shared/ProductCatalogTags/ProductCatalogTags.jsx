import styles from './ProductCatalogTags.module.css';
import ButtonPrimary from '../../ui/ButtonPrimary/ButtonPrimary';

export default function ProductCatalogTags({ tags }) {
    return (
        <div className={styles.tags}>
            <ul className={styles.tags__inner}>
                {tags.map((item, idx) => (
                    (idx === 0 ? (<ButtonPrimary
                        key={idx}
                        children={item}
                        onClick={null} 
                        isSelected={true}/>) : (<ButtonPrimary
                            key={idx}
                            children={item}
                            onClick={null} />))
                ))}
            </ul>
        </div>
    )
}

export { default as ProductCatalogTags } from './ProductCatalogTags';