"use client";

import { useState } from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./page.module.css";
import Header from "@/components/layout/Header/Header";
import Image from "next/image";

const branches = [
  {
    city: "Алматы",
    address: "ул. Биянху 67",
    coords: [43.238949, 76.889709],
    time: "Пн–Пт 10:00–19:00, Сб–Вс 9:00–17:00",
    whatsapp: "+77022700000",
    image: "/core/almaty-2.jpg",
  },
  {
    city: "Астана",
    address: "ул. Кордай 81",
    coords: [51.169392, 71.449074],
    time: "Пн–Пт 10:00–19:00, Сб–Вс 9:00–17:00",
    whatsapp: "+77068062525",
    image: "/core/astana.jpg",
  },
  {
    city: "Шымкент",
    address: "ул. Казиева 152/4",
    coords: [42.341684, 69.590099],
    time: "Пн–Пт 10:00–19:00, Сб–Вс 9:00–17:00",
    whatsapp: "+77077001234",
    image: "/core/shymkent.jpg",
  },
];

export default function AddressesPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = branches[activeIndex];

  return (
    <>
      <Header />
      <div className={styles.page}>
        <h1 className={styles.title}>Наши филиалы</h1>
        <p className={styles.subtitle}>
          LEKA Beauty рядом с вами. Три города, один стандарт качества. Ждём вас в наших филиалах.
        </p>
        <div className={styles.tabs}>
          {branches.map((branch, index) => (
            <button
              key={branch.city}
              className={`${styles.tab} ${index === activeIndex ? styles.active : ""}`}
              onClick={() => setActiveIndex(index)}
            >
              {branch.city}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.city}
            className={styles.branch}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.branchImage}>
              <Image src={active.image} alt={active.city} fill style={{ objectFit: "cover" }} />
            </div>
            <div className={styles.branchContent}>
              <h2 className={styles.city}>{active.city}</h2>
              <p className={styles.address}><strong>Адрес:</strong> {active.address}</p>
              <p className={styles.time}><strong>Режим работы:</strong> {active.time}</p>
              <div className={styles.whatsapp__inner}>
  <div className={[styles.whatsapp__icon, "_img"].join(" ")}>
    <img src="/icons/whatsapp-line.png" alt="WhatsApp" />
  </div>
  <div className={styles.whatsapp__text}>
    <div className={styles.whatsapp__title}>Офис продаж</div>
    <a
      href={`https://wa.me/${active.whatsapp}`}
      className={styles.whatsapp__link}
      target="_blank"
    >
      Написать в Whatsapp
    </a>
  </div>
</div>

              <YMaps>
                <Map
                  defaultState={{ center: active.coords, zoom: 15 }}
                  width="100%"
                  height={300}
                >
                  <Placemark geometry={active.coords} />
                </Map>
              </YMaps>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
