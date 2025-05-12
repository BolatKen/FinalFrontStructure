import styles from './ListingCategories.module.css';
import ProductCart from '../../shared/ProductCard/ProductCard';

export default function ListingCategories() {

    const products = [
        {
            'model_url': '',
            'name': 'Aurora',
            'variants': [
                {
                    'old_price': '121000',
                    'price': '104000'
                }
            ]
        },
        {
            'model_url': '',
            'name': 'Aurora',
            'variants': [
                {
                    'old_price': '121000',
                    'price': '104000'
                }
            ]
        },
        {
            'model_url': '',
            'name': 'Aurora',
            'variants': [
                {
                    'old_price': '',
                    'price': '104000'
                }
            ]
        },
        {
            'model_url': '',
            'name': 'Aurora',
            'variants': [
                {
                    'old_price': '121000',
                    'price': '104000'
                }
            ]
        },
        {
            'model_url': '',
            'name': 'Aurora',
            'variants': [
                {
                    'old_price': '121000',
                    'price': '104000'
                }
            ]
        },
        {
            'model_url': '',
            'name': 'Aurora',
            'variants': [
                {
                    'old_price': '',
                    'price': '104000'
                }
            ]
        },
        {
            'model_url': '',
            'name': 'Aurora',
            'variants': [
                {
                    'old_price': '',
                    'price': '104000'
                }
            ]
        },
        {
            'model_url': '',
            'name': 'Aurora',
            'variants': [
                {
                    'old_price': '',
                    'price': '104000'
                }
            ]
        },
        {
            'model_url': '',
            'name': 'Aurora',
            'variants': [
                {
                    'old_price': '',
                    'price': '104000'
                }
            ]
        },
        {
            'model_url': '',
            'name': 'Aurora',
            'variants': [
                {
                    'old_price': '',
                    'price': '104000'
                }
            ]
        },
        {
            'model_url': '',
            'name': 'Aurora',
            'variants': [
                {
                    'old_price': '',
                    'price': '104000'
                }
            ]
        },
        {
            'model_url': '',
            'name': 'Aurora',
            'variants': [
                {
                    'old_price': '',
                    'price': '104000'
                }
            ]
        },
        {
            'model_url': '',
            'name': 'Aurora',
            'variants': [
                {
                    'old_price': '',
                    'price': '104000'
                }
            ]
        },
        {
            'model_url': '',
            'name': 'Aurora',
            'variants': [
                {
                    'old_price': '',
                    'price': '104000'
                }
            ]
        },
    ]

    return (
        <section className={[styles.listing, '_container'].join(" ")}>
            <div className={styles.listing__inner}>
                <h2 className={[styles.listing__title, 'title'].join(" ")}>Каталог товаров</h2>
                <ul className={styles.listing__items}>
                    {products.map((item, idx) => (
                        <ProductCart
                            key={idx}
                            imageSrc={item.model_url || "/products/chair1.png"}
                            title={item.name}
                            oldPrice={item.variants[0].old_price}
                            newPrice={item.variants[0].price}
                        />
                    ))}
                </ul>
            </div>
        </section>
    );
}

export { default as ListingCategories } from './ListingCategories';

