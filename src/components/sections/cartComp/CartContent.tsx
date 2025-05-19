"use client";

import { useEffect, useState } from "react";

export default function CartContent() {
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const clearCart = () => {
    localStorage.removeItem("cartItems");
    setCartItems([]);
  };

  return (
    <div style={{ padding: "20px", color: "#222" }}>
      {cartItems.length === 0 ? (
        <div style={{ fontSize: "22px" }}>Корзина пуста</div>
      ) : (
        <>
          <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>Корзина</h1>

          <ul style={{ listStyle: "none", padding: 0 }}>
            {cartItems.map((item) => (
              <li
                key={item.id}
                style={{
                  marginBottom: "20px",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  fontSize: "18px",
                }}
              >
                <strong>{item.name}</strong><br />
                Цена: {item.price} {item.currency}<br />
                Количество: {item.quantity}
              </li>
            ))}
          </ul>

          <div style={{ fontSize: "24px", marginTop: "30px", fontWeight: "bold" }}>
            Итого: {totalPrice.toFixed(2)} {cartItems[0]?.currency}
          </div>

          <button
            onClick={clearCart}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "#FF7244",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "18px",
            }}
          >
            Очистить корзину
          </button>
        </>
      )}
    </div>
  );
}
