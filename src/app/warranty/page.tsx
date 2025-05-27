"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "@/components/layout/Header/Header";
import styles from "./page.module.css";

export default function WarrantyPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = [
    {
      q: "Как долго обрабатывается гарантийный запрос?",
      a: "В течение 1-2 рабочих дней. Мы оперативно свяжемся с вами и решим проблему.",
    },
    {
      q: "Нужны ли документы для обращения?",
      a: "Да, желательно предоставить чек или фото товара, чтобы мы могли быстрее обработать запрос.",
    },
    {
      q: "Можно ли вернуть товар по гарантии?",
      a: "Да, если проблема не устранима и подтверждён производственный дефект — мы оформим возврат или замену.",
    },
  ];

  return (
    <>
      <Header />
      <div className={styles.page}>
        <h1 className={styles.title}>Гарантия на продукцию LEKA Beauty</h1>
        <p className={styles.subtitle}>
          Мы уверены в качестве своей мебели и берём на себя ответственность перед каждым клиентом.
        </p>

        <section className={styles.block}>
          <h2 className={styles.blockTitle}>Срок гарантии</h2>
          <p className={styles.blockText}>
            Гарантийный срок на продукцию — <strong>12 месяцев</strong> с момента покупки.
          </p>
          <p className={styles.blockText}>
            Гарантия распространяется на конструктивные элементы мебели, каркасы, механизмы подъёма и вращения.
          </p>
        </section>

        <section className={styles.block}>
          <h2 className={styles.blockTitle}>Что входит в гарантию</h2>
          <ul className={styles.list}>
            <li>
              <Image src="/icons/accept.png" alt="tool" width={20} height={20} />
              Заводской брак
            </li>
            <li>
              <Image src="/icons/accept.png" alt="check" width={20} height={20} />
              Дефекты швов или фурнитуры
            </li>
            <li>
              <Image src="/icons/accept.png" alt="check" width={20} height={20} />
              Поломка механизма при нормальной эксплуатации
            </li>
            <li>
              <Image src="/icons/accept.png" alt="check" width={20} height={20} />
              Шаткость при правильной сборке
            </li>
          </ul>
        </section>

        <section className={styles.block}>
          <h2 className={styles.blockTitle}>Что не покрывается</h2>
          <ul className={styles.list}>
            <li>
              <Image src="/icons/error.png" alt="block" width={20} height={20} />
              Механические повреждения по вине клиента
            </li>
            <li>
              <Image src="/icons/error.png" alt="warning" width={20} height={20} />
              Следы от химии, влаги, жары
            </li>
            <li>
              <Image src="/icons/error.png" alt="block" width={20} height={20} />
              Неправильная сборка
            </li>
          </ul>
        </section>

        <section className={styles.block}>
          <h2 className={styles.blockTitle}>Гарантийный талон</h2>
          <p className={styles.blockText}>
            Ознакомьтесь с полными условиями гарантии в официальном документе:
          </p>
          <a
            href="/docs/warranty.pdf"
            download
            className={styles.pdfLink}
            target="_blank"
          >
            📄 Скачать гарантийный талон (PDF)
          </a>
        </section>

        <section className={styles.block}>
          <h2 className={styles.blockTitle}>Частые вопросы</h2>
          <div className={styles.faq}>
            {faqData.map((item, index) => (
              <div
                key={index}
                className={`${styles.faqItem} ${openIndex === index ? styles.open : ""}`}
                onClick={() => toggleFAQ(index)}
              >
                <div className={styles.faqQuestion}>{item.q}</div>
                {openIndex === index && (
                  <div className={styles.faqAnswer}>{item.a}</div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
