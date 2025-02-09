import React from 'react';

const Button = ({ bgColor, textColor, children }) => {
  return (
    <button
      className={`${bgColor} ${textColor} px-3 py-1 text-sm  rounded-md transition duration-200 hover:opacity-80 focus:outline-none`}
    >
      {children}
    </button>
  );
};

export default Button;