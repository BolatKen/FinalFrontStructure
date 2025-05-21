"use client";

import { useState } from "react";
import Header from "@/components/layout/Header/Header";
// import Footer from "@/components/layout/Footer/Footer";
import { ButtonOrange } from "@/components/ui/ButtonOrange/ButtonOrange";
import styles from "./OrderStatus.module.css";
import ModalOrderStatus from "@/components/ui/Modal/ModalOrderStatus";

export default function OrderStatusPage() {
  const [showModal, setShowModal] = useState(false);
  const [trackCode, setTrackCode] = useState("");

  const demoItems = [
    {
      id: 1,
      title: "Product name title",
      price: "240.000 KZT",
      quantity: 120,
      image: "/core/1.png",
    },
    {
      id: 2,
      title: "Product name title",
      price: "240.000 KZT",
      quantity: 120,
      image: "/core/2.png",
    },
  ];

  return (
    <>
      <Header />
      <main className={styles.status}>
        <h1 className={styles.title}>Статус Доставки</h1>
        <div className={styles.underline}></div>

        <div className={styles.block}>
          <h2 className={styles.blockTitle}>
            Введите номер заказа, чтобы узнать текущий статус доставки.
          </h2>
          <p className={styles.blockText}>
            Информация обновляется автоматически по мере движения груза. <br />
            Если возникают вопросы — наша поддержка всегда на связи.
          </p>

          <div className={styles.inputRow}>
            <input
              type="text"
              className={styles.input}
              placeholder="Введите трек-код"
              value={trackCode}
              onChange={(e) => setTrackCode(e.target.value)}
            />
            <ButtonOrange onClick={() => setShowModal(true)}>
              Отследить
            </ButtonOrange>
          </div>
        </div>

        {showModal && (
          <ModalOrderStatus onClose={() => setShowModal(false)} items={demoItems} />
        )}
      </main>
    </>
  );
}
