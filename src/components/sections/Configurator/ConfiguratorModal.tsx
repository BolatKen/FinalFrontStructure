// components/ConfiguratorModal/ConfiguratorModal.tsx
import { useState } from "react";
import styles from "./ConfiguratorModal.module.css";
import { Color } from "@/types/color";
import { Material } from "@/types/product";
import { sendTelegramMessage } from "@/lib/telegram";


interface ConfiguratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedMaterials: Record<number, number>;
  selectedColors: Record<number, Color | null>;
  partsInfo: {
    partId: number;
    partName: string;
    materials: Material[];
  }[];
}

export default function ConfiguratorModal({
  isOpen,
  onClose,
  selectedMaterials,
  selectedColors,
  partsInfo,
}: ConfiguratorModalProps) {
  const [phone, setPhone] = useState("");
const [error, setError] = useState("");

const [successMessage, setSuccessMessage] = useState("");

function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
  setPhone(e.target.value);
  setError("");
}

async function handleSubmit() {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 10) {
    setError("Введите корректный номер телефона");
    return;
  }

  const messageLines = partsInfo.map(({ partId, partName, materials }) => {
    const selectedMaterialId = selectedMaterials[partId];
    const material = materials.find((m) => m.id === selectedMaterialId);
    const color = selectedColors[partId];
    return `🔹 <b>${partName}</b>: ${material?.name ?? "—"} / <i>${color?.name ?? "—"}</i>`;
  });

  const message = [
  `📥 <b>Новый заказ с сайта</b>`,
  ``,
  `📞 <b>Телефон:</b> ${phone}`,
  `🛠️ <b>Выбранные параметры:</b>`,
  ...messageLines,
  ``,
  `🕒 <i>Время: ${new Date().toLocaleString("ru-RU")}</i>`,
].join("\n");

  try {
    await sendTelegramMessage(message);
    setSuccessMessage("Ваш заказ успешно отправлен! Мы свяжемся с вами в ближайшее время.");
    setPhone("");
  } catch (err) {
    setError("Не удалось отправить сообщение. Попробуйте позже.");
  }
}









  if (!isOpen) return null;



  
  return (

    
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Ваш заказ</h2>


        {successMessage && (
  <div className={styles.successAnimated}>
    <div className={styles.checkIcon}>✔</div>
    <h3>{successMessage}</h3>
    <p className={styles.thankYou}>Мы свяжемся с вами в ближайшее время!</p>
  </div>
)}

        <ul className={styles.summary}>
          {partsInfo.map(({ partId, partName, materials }) => {
            const selectedMaterialId = selectedMaterials[partId];
            const material = materials.find((m) => m.id === selectedMaterialId);
            const color = selectedColors[partId];

            return (
              <li key={partId}>
                <strong>{partName}</strong>: {material?.name ?? "—"} / Цвет:{" "}
                <span
                  style={{
                    display: "inline-block",
                    width: "1em",
                    height: "1em",
                    backgroundColor: color?.hex_code,
                    borderRadius: "50%",
                    verticalAlign: "middle",
                    marginRight: "0.5em",
                  }}
                ></span>
                {color?.name ?? "—"}
              </li>
            );
          })}
        </ul>

        <div className={styles.inputBlock}>
  <label htmlFor="phone">Ваш номер телефона:</label>
  <input
    id="phone"
    type="tel"
    value={phone}
    onChange={handlePhoneChange}
    placeholder="+7 (___) ___-__-__"
    className={`${styles.input} ${error ? styles.inputError : ""}`}
  />
  {error && <div className={styles.error}>{error}</div>}
</div>


        <div className={styles.actions}>
          <button onClick={onClose}>Отмена</button>
          <button onClick={handleSubmit}>
  Отправить
</button>

        </div>
      </div>
    </div>
  );
}
