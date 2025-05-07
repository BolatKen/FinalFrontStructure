"use client";

type ColorOption = {
  color: string;
  active: boolean;
};

type ProductCardProps = {
  name: string;
  price: number;
  oldPrice?: number;
  bonuses: number;
  imageUrl: string;
  colorOptions: ColorOption[];
};

export default function ProductCard({
  name,
  price,
  oldPrice,
  bonuses,
  imageUrl,
  colorOptions,
}: ProductCardProps) {
  return (
    <div className="product-card">
      <div className="product-card__colors">
        {colorOptions.map(({ color, active }, i) => (
          <div
            key={i}
            className={`product-card__color ${active ? "product-card__color--active" : ""}`}
            style={{ backgroundColor: color }}
          />
        ))}
        <span className="product-card__color-label">+ Больше вариантов</span>
      </div>

      <div className="product-card__image">
        <img src={imageUrl} alt={name} />
      </div>

      <div className="product-card__info">
        <div className="product-card__name">{name}</div>
        <div className="product-card__prices">
          {oldPrice && <span className="product-card__old-price">{oldPrice.toLocaleString()} ТГ</span>}
          <span className="product-card__price">{price.toLocaleString()} ТГ</span>
        </div>
        <div className="product-card__bonus">
          <div className="product-card__bonus-icon">6</div>
          + {bonuses.toLocaleString()} бонусов
        </div>
      </div>
    </div>
  );
}
