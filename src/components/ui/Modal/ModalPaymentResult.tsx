"use client";

import styles from "./ModalPaymentResult.module.css";
import { ButtonOrange } from "@/components/ui/ButtonOrange/ButtonOrange";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ModalPaymentResultProps {
  type: "success" | "error";
  onClose: () => void;
}

export default function ModalPaymentResult({ type, onClose }: ModalPaymentResultProps) {
  const router = useRouter();

  const isSuccess = type === "success";

  return (
    <div className={styles.modal}>
      <Image
        src={isSuccess
          ? "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Yes_Check_Circle.svg/512px-Yes_Check_Circle.svg.png"
          : "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Close_icon_red.svg/768px-Close_icon_red.svg.png"}
        alt={isSuccess ? "Успех" : "Ошибка"}
        width={64}
        height={64}
      />

      <h2 className={styles.title}>
        {isSuccess ? "Спасибо за покупку!" : "Оплата не прошла"}
      </h2>

      <p className={styles.description}>
        {isSuccess
          ? "Детали заказа будут отправлены на указанную вам почту."
          : "Что-то пошло не так. Проверьте данные карты или попробуйте снова."}
      </p>

      <ButtonOrange
        onClick={() => {
          onClose();
          router.push(isSuccess ? "/" : "/cart");
        }}
      >
        {isSuccess ? "На главную" : "В корзину"}
      </ButtonOrange>
    </div>
  );
}
