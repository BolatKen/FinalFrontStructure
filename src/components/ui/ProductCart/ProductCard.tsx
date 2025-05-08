import React from 'react';
import './ProductCard.css';

interface ProductCardProps {
  imageSrc: string;
  title: string;
  oldPrice: string;
  newPrice: string;
  bonus: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  imageSrc,
  title,
  oldPrice,
  newPrice,
  bonus,
}) => {
  return (
    <div className="product-card">
      <div className="product-card__image">
        <img src={imageSrc} alt={title} />
      </div>
      <div className="product-card__inner">
        <div className="product-card__info">
          <div className="product-card__more">
            <h3 className="product-card__title">{title}</h3>
            <div className="product-card__bottom">
              <div className="product-card__prices">
                <span className="product-card__old-price">{oldPrice}</span>
                <span className="product-card__new-price">{newPrice}</span>
              </div>
              <div className="product-card__bonus">
                <span className="product-card__bonus-icon">б</span>
                <span className="product-card__bonus-text">+ {bonus} бонусов</span>
              </div>
            </div>
          </div>
          <div className="product-card__arrow">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M9 6L15 12L9 18" stroke="#1D1C1B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
