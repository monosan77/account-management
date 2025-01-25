import React from "react";
type Prop = {
  text: string;
  type: "button" | "submit";
  width: string;
  bgColor: string;
  textColor: string;
  handleClick?: () => void;
};
const ButtonCustomSize = ({
  text,
  type,
  width,
  bgColor,
  textColor,
  handleClick,
}: Prop) => {
  return (
    <button
      type={type}
      style={{ width: width }}
      onClick={handleClick}
      className={`p-1 bg-${bgColor} border border-${textColor} text-${textColor} text-sm rounded-sm  hover:opacity-80 hover:scale-[1.04] transition-all duration-200`}
    >
      {text}
    </button>
  );
};

export default ButtonCustomSize;
