"use client";

import { useState } from "react";
import styles from "./ModalPaymentFreedomPay.module.css";
import { ButtonOrange } from "@/components/ui/ButtonOrange/ButtonOrange";

interface ModalPaymentFreedomPayProps {
  amount: number;
  onClose: () => void;
}

export default function ModalPaymentFreedomPay({ amount, onClose }: ModalPaymentFreedomPayProps) {
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiry: "",
    cvc: "",
    fullName: "",
    email: "",
  });

  const isFormValid = Object.values(formData).every((v) => v.trim() !== "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles["payment-modal"]}>
      <div className={styles["payment-modal__inner"]}>
        {/* Левая колонка */}
        <div className={styles["payment-modal__form"]}>
          <input
            name="cardNumber"
            placeholder="Номер карты"
            value={formData.cardNumber}
            onChange={handleChange}
            className={styles["input"]}
          />

          <div className={styles["payment-modal__row"]}>
            <input
              name="expiry"
              placeholder="Срок действия"
              value={formData.expiry}
              onChange={handleChange}
              className={styles["input"]}
            />
            <input
              name="cvc"
              placeholder="CVV/CVC код"
              value={formData.cvc}
              onChange={handleChange}
              className={styles["input"]}
            />
          </div>

          <input
            name="fullName"
            placeholder="Имя и Фамилия"
            value={formData.fullName}
            onChange={handleChange}
            className={styles["input"]}
          />
          <p className={styles["hint"]}>Как на карте — латиницей</p>

          <input
            name="email"
            placeholder="Электронная почта"
            value={formData.email}
            onChange={handleChange}
            className={styles["input"]}
          />
          <p className={styles["hint"]}>Пришлем чек о покупке</p>

          <ButtonOrange
            className={!isFormValid ? styles["submit--disabled"] : ""}
            type="submit"
          >
            Оплатить {amount.toLocaleString()} ₸
          </ButtonOrange>
        </div>

        {/* Правая колонка */}
        <div className={styles["payment-modal__info"]}>
          <div>
            <div className={styles["info__label"]}>Оплата</div>
            <div className={styles["info__amount"]}>{amount.toLocaleString()} KZT</div>
          </div>

          <div className={styles["info__logos"]}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/d/d6/Visa_2021.svg"
              alt="Visa"
              width={48}
              height={24}
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
              alt="Mastercard"
              width={48}
              height={24}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
