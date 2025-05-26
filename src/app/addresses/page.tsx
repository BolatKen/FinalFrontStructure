"use client";

import Header from "@/components/layout/Header/Header";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import styles from "./page.module.css";
import Image from "next/image";

const branches = [
  {
    city: "Алматы",
    address: "ул. Биянху 67",
    coords: [43.238949, 76.889709],
    time: "Пн–Пт 10:00–19:00, Сб–Вс 9:00–17:00",
    phone: "+77022700000",
    image: "/core/almaty-2.jpg",
  },
  {
    city: "Астана",
    address: "ул. Кордай 81",
    coords: [51.169392, 71.449074],
    time: "Пн–Пт 10:00–19:00, Сб–Вс 9:00–17:00",
    phone: "+77068062525",
    image: "/core/astana.jpg",
  },
  {
    city: "Шымкент",
    address: "ул. Казиева 152/4",
    coords: [42.341684, 69.590099],
    time: "Пн–Пт 10:00–19:00, Сб–Вс 9:00–17:00",
    phone: "+77077001234",
    image: "/core/shymkent.jpg",
  },
];

export default function AddressesPage() {
  return (
    <>
    <Header />
    <div className={styles.page}>
      <h1 className={styles.title}>Наши филиалы</h1>
      <p className={styles.subtitle}>Мы рядом в каждом крупном городе Казахстана. Приезжайте в шоурум, протестируйте мебель, получите консультацию.</p>

      <YMaps>
        {branches.map((branch) => (
          <div className={styles.branch} key={branch.city}>
            <div className={styles.branchImage}>
              <Image src={branch.image} alt={branch.city} fill style={{ objectFit: "cover" }} />
            </div>
            <div className={styles.branchContent}>
              <h2 className={styles.city}>{branch.city}</h2>
              <p className={styles.address}><strong>Адрес:</strong> {branch.address}</p>
              <p className={styles.time}><strong>Режим работы:</strong> {branch.time}</p>
              <a className={styles.whatsapp} href={`https://wa.me/${branch.phone.slice(1)}`} target="_blank">
                Написать в WhatsApp
              </a>
              <Map
                defaultState={{ center: branch.coords, zoom: 15 }}
                width="100%"
                height={300}
              >
                <Placemark geometry={branch.coords} />
              </Map>
            </div>
          </div>
        ))}
      </YMaps>
    </div>
    </>
  );
}
