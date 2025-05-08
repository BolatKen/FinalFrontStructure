import React from "react";
// import "./ColorOption.css"; // подключаем стили отдельно

interface ColorOptionProps {
  imageUrl: string;
  alt: string;
  selected?: boolean;
  onClick?: () => void;
}

const ColorSelector = ({
  imageUrl,
  alt,
  selected = false,
  onClick,
}: ColorOptionProps) => {
  return (
    <div
      className={`color__item ${selected ? "color__item_selected" : ""}`}
      onClick={onClick}
    >
      <img src={imageUrl} alt={alt} />
    </div>
  );
};

export default ColorSelector;
