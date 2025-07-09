// components/ConfiguratorModal/ConfiguratorModal.tsx
import { useState } from "react";
import styles from "./ConfiguratorModal.module.css";
import { Color } from "@/types/color";
import { Material } from "@/types/product";



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

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Ваш заказ</h2>

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
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+7 (___) ___-__-__"
          />
        </div>

        <div className={styles.actions}>
          <button onClick={onClose}>Отмена</button>
          <button
            onClick={() => {
              console.log("Отправить данные:", { phone, selectedMaterials, selectedColors });
              // отправка данных, например, через API
              onClose();
            }}
          >
            Отправить
          </button>
        </div>
      </div>
    </div>
  );
}
