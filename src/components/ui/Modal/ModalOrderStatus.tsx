// components/ui/ModalOrderStatus/ModalOrderStatus.tsx
"use client";
import styles from "./ModalOrderStatus.module.css";

interface OrderItem {
  id: number;
  title: string;
  price: string;
  quantity: number;
  image: string;
}

interface Props {
  onClose: () => void;
  items: OrderItem[];
}

export default function ModalOrderStatus({ onClose, items }: Props) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.iconWrap}>
  <img src="/icons/delivery.svg" alt="delivery" />
</div>

<div className={styles.titleRow}>
  <h2 className={styles.title}>Статус заказа</h2>
  <span className={styles.status}>В ОБРАБОТКЕ</span>
</div>

        <div className={styles.list}>
          {items.map((item) => (
            <div key={item.id} className={styles.item}>
              <img src={item.image} alt={item.title} />
              <div className={styles.info}>
                <div className={styles.name}>{item.title}</div>
                <div className={styles.price}>{item.price}</div>
              </div>
              <div className={styles.quantity}>{item.quantity} шт.</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
