"use client";

import { useEffect } from "react";
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
    icon: "/icons/accept.png",
    title: "Спасибо за покупку!",
    text: "Детали заказа будут отправлены на указанную вам почту.",
    buttonText: "На главную",
    redirect: "/",
  },
  freedom_error: {
    icon: "/icons/error.png",
    title: "Оплата не прошла",
    text: "Что-то пошло не так. Проверьте данные карты или попробуйте снова.",
    buttonText: "В корзину",
    redirect: "/cart",
  },
  invoice_success: {
    icon: "/icons/accept.png",
    title: "Счёт на оплату сформирован",
    text: "В ближайшее время с вами свяжется оператор по указанному номеру.",
    buttonText: "На главную",
    redirect: "/",
  },
  invoice_error: {
    icon: "/icons/error.png",
    title: "Оплата не прошла",
    text: "Что-то пошло не так. Проверьте данные карты или попробуйте снова.",
    buttonText: "В корзину",
    redirect: "/cart",
  },
};

export default function ModalUnifiedResult({ type, onClose }: ModalUnifiedResultProps) {
  const router = useRouter();
  const config = modalConfig[type];

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
        <Image src={config.icon} alt="icon" width={100} height={100} />
        <h2 className={styles.title}>{config.title}</h2>
        <p className={styles.description}>{config.text}</p>
        <ButtonOrange
          onClick={() => {
            onClose();
            router.push(config.redirect);
          }}
        >
          {config.buttonText}
        </ButtonOrange>
      </div>
    </div>
  );
}
