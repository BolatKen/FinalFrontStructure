import styles from "./WelcomePrice.module.css";
import BonusValue from "@/components/ui/BonusValue/BonusValue";
import ButtonOrange from "@/components/ui/ButtonOrange/ButtonOrange";
import { Product } from "@/types/product";
import { useEffect, useState } from "react";
import { OptionGroup } from "@/types/product";

// interface Option {
//   name: string;
//   price: string;
//   type: "base_cost" | "surcharge";
//   comment?: string;
// }

// interface OptionGroup {
//   title: string;
//   options: Option[];
// }

interface WelcomePriceProps {
  product: Product;
  basePrice: string;
  currency?: string;
  bonusNumber?: string;
  optionGroups?: OptionGroup[];
  surcharges?: Array<{ name: string; price: number }>;
  onSurchargesChange?: (
    surcharges: Array<{ name: string; price: number }>
  ) => void;
}

export default function WelcomePrice({
  product,
  basePrice: initialBasePrice,
  currency = "KZT",
  bonusNumber = "0",
  optionGroups = [],
  surcharges = [],
  onSurchargesChange,
}: WelcomePriceProps) {
  const [expandedGroup, setExpandedGroup] = useState<number | null>(null);
  const [basePrice, setBasePrice] = useState<number>(Number(initialBasePrice));
  const [selectedOptions, setSelectedOptions] = useState<
    Record<number, number>
  >({});

  useEffect(() => {
    const stored = localStorage.getItem("selectedOptions");
    if (stored) {
      setSelectedOptions(JSON.parse(stored));
    }
  }, []);

  const handleOptionSelect = (groupIndex: number, optionIndex: number) => {
    const option = optionGroups[groupIndex].options[optionIndex];

    const newSelectedOptions = {
      ...selectedOptions,
      [groupIndex]: optionIndex,
    };
    setSelectedOptions(newSelectedOptions);

    // Сохраняем выбранные опции в localStorage
    localStorage.setItem("selectedOptions", JSON.stringify(newSelectedOptions));

    // setExpandedGroup(null);

    if (option.type === "base_cost") {
      setBasePrice(parseFloat(option.price));
    } else if (option.type === "surcharge" && onSurchargesChange) {
      if (!surcharges.some((item) => item.name === option.name)) {
        onSurchargesChange([
          ...surcharges,
          {
            name: option.name,
            price: parseFloat(option.price),
          },
        ]);
      }
    }
  };

  const totalPrice =
    basePrice + (surcharges?.reduce((sum, item) => sum + item.price, 0) || 0);

  const addToCart = () => {
    const storedCart = localStorage.getItem("cartItems");
    type CartItem = {
      base_sku: string;
      id: number | string;
      name: string;
      price: number;
      currency: string;
      quantity: number;
      image: string;
      config?: { group: string; value: string }[];
      additionalOptions?: Array<{ name: string; price: number }>;
    };

    const cartItems: CartItem[] = storedCart ? JSON.parse(storedCart) : [];

    const selectedConfig =
      (optionGroups
        ?.map((group, groupIdx) => {
          const optionIdx = selectedOptions[groupIdx];
          if (optionIdx !== undefined) {
            return {
              group: group.title,
              value: group.options[optionIdx]?.name,
            };
          }
          return null;
        })
        .filter(Boolean) as { group: string; value: string }[]) ?? [];

    const newItem: CartItem = {
      base_sku: product.base_sku,
      id: product.id,
      name: product.name,
      price: totalPrice,
      currency: currency,
      quantity: 1,
      image: product.images?.[0]?.image ?? "",
      config: selectedConfig,
      additionalOptions: surcharges,
    };

    const existingItemIndex = cartItems.findIndex(
      (item: CartItem) => item.id === newItem.id
    );

    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].quantity += 1;
    } else {
      cartItems.push(newItem);
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className={styles.priceContainer}>
      {/* Левый блок - выбор группы */}
      <div className={styles.leftSection}>
        <h2 className={[styles.configurator__title, "title"].join(" ")}>
          Конфигуратор
        </h2>
        {optionGroups.length > 0 && (
          <div className={styles.optionGroups}>
            {optionGroups.map((group, groupIndex) => (
              <div key={groupIndex} className={styles.optionGroup}>
                <button
                  className={styles.optionGroupButton}
                  onClick={() =>
                    setExpandedGroup(
                      expandedGroup === groupIndex ? null : groupIndex
                    )
                  }
                >
                  {group.title}
                </button>

                {expandedGroup === groupIndex && (
                  <div className={styles.optionsDropdown}>
                    {group.options.map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className={`${styles.optionItem} ${
                          selectedOptions[groupIndex] === optionIndex
                            ? styles.optionItemSelected
                            : ""
                        }`}
                        onClick={() => {
                          if (selectedOptions[groupIndex] === optionIndex) {
                            // Если уже выбрана — отменяем выбор
                            const newSelected = { ...selectedOptions };
                            delete newSelected[groupIndex];
                            setSelectedOptions(newSelected);

                            // Удаляем опцию из localStorage
                            localStorage.setItem(
                              "selectedOptions",
                              JSON.stringify(newSelected)
                            );

                            // Возвращаемся к базовой цене, если это была опция базовой стоимости
                            if (option.type === "base_cost") {
                              setBasePrice(Number(initialBasePrice));
                            } else if (
                              option.type === "surcharge" &&
                              onSurchargesChange
                            ) {
                              // Удаляем надбавку, если это была она
                              onSurchargesChange(
                                surcharges.filter(
                                  (item) => item.name !== option.name
                                )
                              );
                            }
                          } else {
                            handleOptionSelect(groupIndex, optionIndex);
                          }
                        }}
                      >
                        <span className={styles.optionName}>{option.name}</span>
                        <span className={styles.optionPrice}>
                          {option.price} {currency}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Правый блок - цена, доплаты и кнопка */}
      <div className={styles.rightSection}>
        <div className={styles.price__item}>
          <div className={styles.configure__title}>Цена</div>
          <div className={styles.price__text}>
            {new Intl.NumberFormat("ru-RU").format(totalPrice)} {currency}
          </div>
          {Number(bonusNumber) !== 0 && (
            <BonusValue
              bonusVal={new Intl.NumberFormat("ru-RU").format(
                Number(bonusNumber)
              )}
            />
          )}
        </div>

        {surcharges.length > 0 && (
          <div className={styles.surchargesList}>
            {surcharges.map((item, index) => (
              <div key={index} className={styles.surchargeItem}>
                <span>{item.name}</span>
                <span>
                  +{item.price.toLocaleString("ru-RU")} {currency}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className={styles.configure__btn}>
          <ButtonOrange onClick={addToCart} type="button">
            В корзину
          </ButtonOrange>
        </div>
      </div>
    </div>
  );
}
