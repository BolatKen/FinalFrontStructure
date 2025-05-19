// app/order-status/page.tsx

import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import { ButtonOrange } from "@/components/ui/ButtonOrange/ButtonOrange";
import styles from "./OrderStatus.module.css";
import BestOffers from "@/components/sections/BestOffers/BestOffers";

export default function OrderStatusPage() {
  return (
    <>
      <Header />

      <main className={styles.statusPage}>
        <h1 className={styles.title}>Статус Доставки</h1>

        <div className={styles.card}>
          <h2 className={styles.subtitle}>
            Введите номер заказа, чтобы узнать текущий статус доставки.
          </h2>
          <p className={styles.description}>
            Информация обновляется автоматически по мере движения груза.
            <br />
            Если возникают вопросы — наша поддержка всегда на связи.
          </p>

          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="WML - PDJ - BBTH"
              className={styles.input}
            />
            <ButtonOrange>Отследить</ButtonOrange>
          </div>
        </div>

        {/* <BestOffers/> */}
      </main>

      <Footer />
    </>
  );
}
