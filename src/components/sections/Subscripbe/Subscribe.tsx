// import styles from "./Subscribe.module.css";

// export default function Subscribe() {
//   return (
//     <div className={styles.podpiska}>
//       <div className={styles.podpiska__inner}>
//         <h2 className={styles.podpiska__title}>
//           Подпишитесь на рассылку, чтобы узнавать о новинках первыми
//         </h2>

//         <p className={styles.podpiska__desc}>
//           Нажимая кнопку подписаться, вы соглашаетесь на обработку персональных
//           данных
//         </p>

//         <form className={styles.podpiska__form}>
//           <input
//             type="email"
//             className={styles.podpiska__input}
//             placeholder="Электронная почта"
//           />
//           <button type="submit" className={styles.podpiska__btn}>
//             Подписаться
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

"use client"
import { useState } from "react";
import styles from "./Subscribe.module.css";

export default function Subscribe() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const telegramToken = '7045960985:AAHKiMt_9lHo2HuJxtmomhX4UDXS6IzxFnY'; 
  const chatId = '914762159';       

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");

    const message = `Новая подписка на сайте:\nEmail: ${email.trim()}`;
    const url = `https://api.telegram.org/bot${telegramToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

    try {
      const response = await fetch(url);
      if (response.ok) {
        setStatus("success");
        setEmail(""); // очищаем поле
        setTimeout(() => setStatus("idle"), 4000); // через 4 сек скрываем сообщение
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch (error) {
      console.error("Ошибка отправки в Telegram:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <div className={styles.podpiska}>
      <div className={styles.podpiska__inner}>
        <h2 className={styles.podpiska__title}>
          Подпишитесь на рассылку, чтобы узнавать о новинках первыми
        </h2>

        <p className={styles.podpiska__desc}>
          Нажимая кнопку подписаться, вы соглашаетесь на обработку персональных данных
        </p>

        <form className={styles.podpiska__form} onSubmit={handleSubmit}>
          <input
            type="email"
            className={styles.podpiska__input}
            placeholder="Электронная почта"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={status === "loading"}
          />
          <button
            type="submit"
            className={styles.podpiska__btn}
            disabled={status === "loading"}
          >
            {status === "loading" ? "Отправляем..." : "Подписаться"}
          </button>
        </form>

        {/* Анимация статуса */}
        {status === "success" && (
          <div className={styles.successMessage}>
            🎉 Спасибо за подписку!
          </div>
        )}
        {status === "error" && (
          <div className={styles.errorMessage}>
            ❌ Ошибка отправки. Попробуйте снова.
          </div>
        )}
      </div>
    </div>
  );
}
