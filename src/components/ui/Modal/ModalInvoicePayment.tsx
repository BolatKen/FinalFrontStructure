"use client";

import { useState, useEffect } from "react";
import styles from "./ModalInvoicePayment.module.css";
import { ButtonOrange } from "@/components/ui/ButtonOrange/ButtonOrange";

interface ModalInvoicePaymentProps {
  onClose: () => void;
  onResult: (status: "invoice_success" | "invoice_error") => void;
  firstName: string;
  lastName: string;
  cartItems: any[];
  finalTotalPrice: number;
}

export default function ModalInvoicePayment({
  onClose,
  onResult,
  firstName,
  lastName,
  cartItems,
  finalTotalPrice,
}: ModalInvoicePaymentProps) {
  const [formData, setFormData] = useState({
    iin: "",
    address: "",
    phone: "",
  });

  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    const parts = [
      "+7",
      digits.slice(1, 4),
      digits.slice(4, 7),
      digits.slice(7, 9),
      digits.slice(9, 11),
    ];
    if (digits.length <= 1) return "+7";
    if (digits.length <= 4) return `+7 (${parts[1]}`;
    if (digits.length <= 7) return `+7 (${parts[1]}) ${parts[2]}`;
    if (digits.length <= 9) return `+7 (${parts[1]}) ${parts[2]}-${parts[3]}`;
    return `+7 (${parts[1]}) ${parts[2]}-${parts[3]}-${parts[4]}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let val = value;

    if (name === "iin") {
      val = val.replace(/\D/g, "").slice(0, 12); // Только цифры, максимум 12 символов
    }

    if (name === "phone") {
      val = formatPhoneNumber(val);
    }

    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const isFormValid =
    /^\d{12}$/.test(formData.iin) &&
    formData.address.trim().length > 0 &&
    /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(formData.phone);

  const handleSubmit = async () => {
    if (!isFormValid) return;

    const payload = {
      firstName,
      lastName,
      address: formData.address,
      phone: formData.phone,
      iin: formData.iin,
      cartItems,
      total: finalTotalPrice,
    };

    const res = await fetch("/api/generate-invoice", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `invoice_${Date.now()}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();

    onClose();

    setTimeout(() => {
      onResult("invoice_success");
    }, 500);
  };

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
          placeholder="ИИН/БИН (12 цифр)"
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
          placeholder="Телефон: +7 (XXX) XXX-XX-XX"
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
