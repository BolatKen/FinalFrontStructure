"use client";

import styles from "./ModalUnifiedResult.module.css";
import { ButtonOrange } from "@/components/ui/ButtonOrange/ButtonOrange";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ModalUnifiedResultProps {
  type: "freedom_success" | "freedom_error" | "invoice_success" | "invoice_error";
  onClose: () => void;
}

const modalConfig = {
  freedom_success: {
    icon: "https://upload.wikimedia.org/wikipedia/commons/5/50/Yes_Check_Circle.svg",
    title: "Спасибо за покупку!",
    text: "Детали заказа будут отправлены на указанную вам почту.",
    buttonText: "На главную",
    redirect: "/",
  },
  freedom_error: {
    icon: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Close_icon_red.svg",
    title: "Оплата не прошла",
    text: "Проверьте данные карты или попробуйте снова.",
    buttonText: "В корзину",
    redirect: "/cart",
  },
  invoice_success: {
    icon: "https://upload.wikimedia.org/wikipedia/commons/5/50/Yes_Check_Circle.svg",
    title: "Счёт на оплату сформирован",
    text: "В ближайшее время с вами свяжется оператор по указанному номеру.",
    buttonText: "На главную",
    redirect: "/",
  },
  invoice_error: {
    icon: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Close_icon_red.svg",
    title: "Ошибка при генерации счёта",
    text: "Попробуйте ещё раз или свяжитесь с менеджером.",
    buttonText: "В корзину",
    redirect: "/cart",
  },
};

export default function ModalUnifiedResult({ type, onClose }: ModalUnifiedResultProps) {
  const router = useRouter();
  const config = modalConfig[type];

  return (
    <div className={styles.modal}>
      <Image src={config.icon} alt="icon" width={64} height={64} />
      <h2 className={styles.title}>{config.title}</h2>
      <p className={styles.description}>{config.text}</p>
      <ButtonOrange onClick={() => {
        onClose();
        router.push(config.redirect);
      }}>
        {config.buttonText}
      </ButtonOrange>
    </div>
  );
}
