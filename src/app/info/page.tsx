"use client";
import Header from "@/components/layout/Header/Header";
import styles from "./page.module.css";
import MapPage from "@/components/sections/Map/MapPage";
import { Main } from "next/document";
import GeneralInfo from "@/components/shared/GeneralInfo/GeneralInfo";
import GeneralInfoRightUpper from "@/components/shared/GeneralInfoRightUpper/GeneralInfoRightUpper";
import GeneralInfoRightDown from "@/components/shared/GeneralInfoRightDown/GeneralInfoRightDown";
import GeneralInfoLeftDown from "@/components/shared/GeneralInfoLeftDown/GeneralInfoLeftDown";
import FAQ from "@/components/sections/FAQ/FAQ";


export default function Home() {
  const rightContentDown = <GeneralInfoRightDown />;
  const leftContentDown = <GeneralInfoLeftDown />;
  const rightContent = <GeneralInfoRightUpper />;

  return (
    <>
      <Header />
      <div className="main__title">Leka Beauty</div>
      <GeneralInfo
        contentLeft={leftContentDown}
        contentRight={rightContentDown}
        isLight={true}
        className={undefined}
      />
      <GeneralInfo
        contentRight={rightContent}
        className={undefined}
        contentLeft={undefined}
      />
      <div className={styles.contactBlock}>
        <div className={styles.contactItem}>
          <div className={styles.contactLabel}>Адрес</div>
          <div className={styles.contactValue}>
            Биянху 67, Алматы,
            <br />
            Казахстан
          </div>
        </div>
        <div className={styles.contactItem}>
          <div className={styles.contactLabel}>Контактный номер</div>
          <div className={styles.contactValue}>+7 (702) 270 000</div>
        </div>
        <div className={styles.contactItem}>
          <div className={styles.contactLabel}>Почта</div>
          <div className={styles.contactValue}>leka_solnce@bk.ru</div>
        </div>
      </div>
      <MapPage />
      <FAQ />
    </>
  );
}
