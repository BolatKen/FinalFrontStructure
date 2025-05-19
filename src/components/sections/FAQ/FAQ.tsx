import React, { useState } from "react";
import styles from "./FAQ.module.css";
import Arrow from "@/components/ui/Arrow/Arrow";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Какие комиссии взимает магазин с продавцов?",
    answer:
      "Магазин взимает комиссию в зависимости от категории товаров и условий партнёрства.",
  },
  {
    question: "Как зарегистрировать счёт?",
    answer:
      "Оплата производится Покупателем путём оплаты банковской картой через платёжную систему...",
  },
  {
    question: "Какие документы нужны для открытия счёта?",
    answer:
      "Для открытия счёта необходимы паспорт, ИИН и справка о месте жительства.",
  },
  {
    question: "Как настроить личный кабинет?",
    answer:
      "После регистрации вы можете войти в личный кабинет и настроить профиль, загрузить логотип и т.д.",
  },
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className={styles.faq}>
      <div className={styles.line}></div>
      <h2 className={styles.title}>Вопрос-ответ</h2>
      <div className={styles.container}>
        <div className={styles.left}>
          <p className={styles.subtitle}>Мы ответили на популярные вопросы</p>
        </div>
        <div className={styles.right}>
          <div className={styles.list}>
            {faqData.map((item, index) => (
              <div className={styles.item} key={index}>
                <button
                  className={styles.question}
                  onClick={() => toggle(index)}
                  type="button"
                >
                  {item.question}
                  <span
                    className={`${styles.arrow} ${
                      openIndex === index ? styles.open : ""
                    }`}
                  >
                    <Arrow
                      className={styles.arrowIcon}
                      direction={openIndex === index ? "down" : "right"}
                      onClick={() => console.log("Arrow clicked")}
                    />
                  </span>
                </button>

                {openIndex === index && (
                  <div className={styles.answer}>{item.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
