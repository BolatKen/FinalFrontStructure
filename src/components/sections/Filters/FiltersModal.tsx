// components/sections/Filters/FiltersModal.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./FiltersModal.module.css";
import { ReactNode } from "react";
import ButtonFilter from '@/components/ui/ButtonFilter/ButtonFilter';
import ColorList from "@/components/ui/ColorList/ColorList";
import ButtonOrange from "@/components/ui/ButtonOrange/ButtonOrange";
import Toggle from '@/components/ui/Toggle/Toggle';
import { CategoryFilters } from "@/types/category";

type FiltersModalProps = {
  categoryFilters: CategoryFilters | null;
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
  children?: ReactNode;
};

export default function FiltersModal({
  categoryFilters,
  isOpen,
  onClose,
  onApply,
}: FiltersModalProps) {

  const tags = categoryFilters?.tags;
  const materials = categoryFilters?.materials;
  const colors = categoryFilters?.colors;

  const [tagToggles, setTagToggles] = useState<{ [tagId: number]: boolean }>({});
  const [selectedMaterialId, setSelectedMaterialId] = useState<number | null>(
    materials && materials.length > 0 ? materials[0].id : null);
  const [color, setColor] = useState<number | null>(null);
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);

  const CURRENCY_SIGN = ' ₸';

  const handleToggleChange = (tagId: number) => {
    setTagToggles(prev => ({
      ...prev,
      [tagId]: !prev[tagId],
    }));
  };

  const formatCurrency = (val: string) => {
    const num = parseInt(val.replace(/\D/g, ''), 10);
    if (isNaN(num)) return '';
    return new Intl.NumberFormat('ru-RU').format(num) + CURRENCY_SIGN;
  };

  const handleChangePriceFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyDigits = e.target.value.replace(/\D/g, '');

    if (onlyDigits === '') {
      setPriceFrom('');
      return;
    }

    const formatted = formatCurrency(onlyDigits);
    setPriceFrom(formatted);

    setTimeout(() => {
      if (!inputRef.current) return;
      const pos = formatted.length - CURRENCY_SIGN.length;
      inputRef.current.setSelectionRange(pos, pos);
    }, 0);
  };

  const handleChangePriceTo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyDigits = e.target.value.replace(/\D/g, '');

    if (onlyDigits === '') {
      setPriceTo('');
      return;
    }

    const formatted = formatCurrency(onlyDigits);
    setPriceTo(formatted);

    setTimeout(() => {
      if (!inputRef2.current) return;
      const pos = formatted.length - CURRENCY_SIGN.length;
      inputRef2.current.setSelectionRange(pos, pos);
    }, 0);
  };

  const handleApply = () => {
    const activeTagIds = Object.entries(tagToggles)
      .filter(([_, isActive]) => isActive)
      .map(([tagId]) => Number(tagId));

    onApply({
      activeTagIds,
      priceFrom,
      priceTo,
      selectedMaterialId,
      color,
    });
    onClose();
  };

  const modalRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
      isOpen = false;
    };
  }

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => document.body.classList.remove('modal-open');
  }, [isOpen]);

  if (!isOpen) return null;


  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.overlay__inner} ref={modalRef}>
        <div className={styles.header}>
          <div className={styles.header__text}>
            <h2>Фильтр</h2>
          </div>
          <div className={[styles.header__cross, '_img'].join(' ')} onClick={onClose}>
            <img src="/icons/cross.svg" alt="Крестик" />
          </div>
        </div>

        <div className={[styles.overlay__features].join(' ')}>
          <div className={styles.switch}>
            {tags?.map((item, key) => [
              <label key={key} className={styles.switch__item}>
                <Toggle
                  setter={tagToggles[item.id] || false}
                  method={() => handleToggleChange(item.id)} />
                <span>{item.name}</span>
              </label>
            ])}
          </div>

          <div className={styles.prices}>
            <div className={styles.prices__inner}>
              <div className={styles.prices__item}>
                <div className={styles.prices__text}>
                  Цена от
                </div>
                <input
                  ref={inputRef}
                  value={priceFrom}
                  onChange={handleChangePriceFrom} />
              </div>
              <div className={styles.prices__item}>
                <div className={styles.prices__text}>
                  Цена до
                </div>
                <input
                  ref={inputRef2}
                  value={priceTo}
                  onChange={handleChangePriceTo} />
              </div>
            </div>
          </div>

          <div className={styles.features}>
            <div className={styles.features__section}>
              <span>Материал</span>
              <div className={styles.section__choices}>
                {materials?.map((item, idx) => (
                  <ButtonFilter
                    key={idx}
                    iconImage={''}
                    iconAlt={item.name}
                    iconText={item.name}
                    isSelected={selectedMaterialId === item.id}
                    onClick={() => setSelectedMaterialId(item.id)}
                  />
                ))}
              </div>
            </div>

            <div className={styles.features__section}>
              <span>Цвет</span>
              <div className={styles.section__colors}>
                <ColorList colorData={selectedMaterialId
                  ? colors?.filter(color => color.material === selectedMaterialId)
                  : colors}
                  onColorSelect={setColor}
                  selectedMaterialId={selectedMaterialId === null ? undefined : selectedMaterialId} />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <div className={styles.actions__inner}>
            <ButtonOrange className={styles.actions__width} children={'Применить'} onClick={handleApply} />
            <div
              className={styles.actions__reset}
              onClick={() => {
                setTagToggles({});
                setSelectedMaterialId(
                  materials && materials.length > 0 ? materials[0].id : null
                );
                setColor(null);
                setPriceFrom('');
                setPriceTo('');
              }}
            >
              Сбросить
            </div>
          </div>
        </div>
      </div >
    </div >
  );
}
