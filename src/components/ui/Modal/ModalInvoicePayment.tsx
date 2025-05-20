"use client";

import { useState, useEffect } from "react";
import styles from "./ModalInvoicePayment.module.css";
import { ButtonOrange } from "@/components/ui/ButtonOrange/ButtonOrange";

interface ModalInvoicePaymentProps {
  onClose: () => void;
  onResult: (status: "invoice_success" | "invoice_error") => void;
}

export default function ModalInvoicePayment({ onClose, onResult }: ModalInvoicePaymentProps) {
  const [formData, setFormData] = useState({
    iin: "",
    address: "",
    phone: "",
  });

  const isFormValid = Object.values(formData).every((val) => val.trim() !== "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!isFormValid) return;

    onClose(); // Закрываем модалку

    setTimeout(() => {
      const success = Math.random() > 0.5;
      onResult(success ? "invoice_success" : "invoice_error");
    }, 500);
  };

  // Закрытие по Escape
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <input
          name="iin"
          placeholder="ИИН/БИН"
          value={formData.iin}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          name="address"
          placeholder="Юр. Адрес"
          value={formData.address}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          name="phone"
          placeholder="Номер телефона"
          value={formData.phone}
          onChange={handleChange}
          className={styles.input}
        />

        <ButtonOrange
          type="button"
          className={!isFormValid ? styles["submit--disabled"] : ""}
          onClick={handleSubmit}
        >
          Скачать счёт на оплату
        </ButtonOrange>
      </div>
    </div>
  );
}
