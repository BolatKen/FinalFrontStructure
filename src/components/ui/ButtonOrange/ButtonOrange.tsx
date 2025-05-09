import React from 'react';
import './ButtonOrange.module.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const ButtonOrange: React.FC<ButtonProps> = ({ children, onClick, type = 'button' }) => {
  return (
    <button className="button" type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default ButtonOrange;
