"use client";
import Link from "next/link";
import styles from "./Footer.module.css";
import Arrow from "@/components/ui/Arrow/Arrow";
import { useEffect, useState } from "react";
import { Category } from "@/types/category";
import { getCategories } from "@/services/category.service";

export default function Footer() {
  const footerHeaderList = [
    "Кресло",
    "Мойки",
    "Диваны",
    "Столы",
    "Стулья",
    "Шкафы",
    "Другая мебель",
  ];

  const footerMenu = {
    "Контакты": "/info",
    "Гарантия": "/varranty",
    "Доставка и оплата": "/order-status",
    "О компании": "/info",
  };
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    // Получаем категории с бэкенда
    getCategories().then(setCategories);
  }, []);

  const parentCategories = categories.filter(
    (cat) => cat.parent === null && cat.is_in_welcome
  );

  return (
    <footer className={styles.footer}>
      <div className={[styles.footer__inner, "_container-bigger"].join(" ")}>
        <div className={["_container"].join(" ")}>
          <div className={styles.footer__upper}>
            {/* Горизонтальное меню */}
            <div className={styles.footer__header}>
              <ul
                className={[styles["footer__list"], styles["footer-list"]].join(
                  " "
                )}
              >
                {/* {footerHeaderList.map((item, idx) => (
                  <li className={styles["footer-list__item"]} key={idx}>
                    <a href="#" className={styles["footer-list__link"]}>
                      {item}
                    </a>
                  </li>
                ))} */}
                {parentCategories.map((parent) => (
                  <li className={styles["footer-list__item"]} key={parent.id}>
                    <a href={`catalog/categories/${parent.slug}`} className={styles["footer-list__link"]}>
                      {parent.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Контент футера */}
            <div className={styles.footer__content}>
              {/* Левая колонка */}
              <div className={styles.footer__column}>
                <div className={styles.footer__logo}>Leka Beauty</div>
                <div className={styles.footer__desc}>
                  Больше чем просто мебель для вашего бизнеса
                </div>

                <div
                  className={[styles.footer__contacts, styles.contacts].join(
                    " "
                  )}
                >
                  <div className={styles.contacts__item}>+7 (702) 270 000</div>
                  <div className={styles.contacts__item}>leka_solnce@bk.ru</div>
                </div>

                <div className={styles.footer__info}>
                  <div className={styles["footer__info-block"]}>
                    <div className={styles["footer__info-title"]}>
                      Офис продаж
                    </div>
                    <div className={styles["footer__info-text"]}>
                      Биянху 67, Алматы, Казахстан
                    </div>
                  </div>
                  <div className={styles["footer__info-block"]}>
                    <div className={styles["footer__info-title"]}>
                      Режим работы
                    </div>
                    <div className={styles["footer__info-text"]}>
                      Пн–пт с 10:00 до 19:00, Сб–вс с 9:00 до 17:00
                    </div>
                  </div>
                </div>
              </div>

              {/* Правая колонка */}
              <div className={styles.footer__column}>
                <ul className={[styles.footer__menu, styles.menu].join(" ")}>
                    {Object.entries(footerMenu).map(([label, href]: [string, string], idx: number) => (
                    <li className={styles.menu__item} key={idx}>
                      <Link href={href}>{label}</Link>
                    </li>
                    ))}
                </ul>

                <div
                  className={[styles.footer__whatsapp, styles.whatsapp].join(
                    " "
                  )}
                >
                  <div className={styles.whatsapp__inner}>
                    <div
                      className={[styles["whatsapp__icon"], "_img"].join(" ")}
                    >
                      <img src="/icons/whatsapp-line.png" alt="WhatsApp" />
                    </div>
                    <div className={styles["whatsapp__text"]}>
                      <div className={styles["whatsapp__title"]}>
                        Офис продаж
                      </div>
                      <a
                        href="https://wa.me/7702270000"
                        className={styles["whatsapp__link"]}
                      >
                        Написать в Whatsapp
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Arrow direction="up" isWhite={true} onClick={undefined} />
      </div>

      {/* Нижняя часть футера */}
      <div className={["_container-bigger"].join(" ")}>
        <div className={styles.footer__bottom}>
          <div className={styles.footer__copyright}>2025 © Leka Beauty</div>
          <ul className={[styles.footer__conf, styles.conf].join(" ")}>
            <li className={styles.conf__item}>
              <a href="#" className={styles.conf__link}>
                Публичная оферта
              </a>
            </li>
            <li className={styles.conf__item}>
              <a href="#" className={styles.conf__link}>
                Политика конфиденциальности
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
