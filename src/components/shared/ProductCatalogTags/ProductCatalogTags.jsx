import styles from './ProductCatalogTags.module.css';
import ButtonPrimary from '../../ui/ButtonPrimary/ButtonPrimary';

export default function ProductCatalogTags({ tags, selectedTag, onTagClick }) {
    const handleClick = (id) => {
        onTagClick(prev => prev === id ? null : id);
    };

    return (
        <div className={styles.tags}>
            <ul className={styles.tags__inner}>
                {tags.map((item, _) => (
                    <ButtonPrimary
                        key={item.id}
                        children={item.name}
                        isSelected={selectedTag === item.id}
                        onClick={() => handleClick(item.id)}
                    />
                ))}
            </ul>
        </div>
    );
}

export { default as ProductCatalogTags } from './ProductCatalogTags';