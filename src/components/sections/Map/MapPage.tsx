"use client";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import styles from "./MapPage.module.css";

export default function MapPage() {
  return (
    <div className={styles.mapContainer}>
      <YMaps>
        <Map
          defaultState={{
            center: [43.238949, 76.889709], // Координаты Алматы
            zoom: 16,
          }}
          width="calc(100vw - 150px)"
          height={500}
        >
          <Placemark
            geometry={[43.238949, 76.889709]} // Примерные координаты ул. Биянху, 67
            properties={{
              balloonContent: "Алмата, ул. Биянху 67",
            }}
          />
        </Map>
      </YMaps>
    </div>
  );
}