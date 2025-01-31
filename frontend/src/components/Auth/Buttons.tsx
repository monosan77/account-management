import React from 'react';
import ButtonCustomSize from '../Frame/ButtonCustomSize';
import Link from 'next/link';
type Props = {
  btnText: string;
  linkText: string;
  linkPath: string;
};
const Buttons = ({ btnText, linkText, linkPath }: Props) => {
  return (
    <div className="mx-8 flex justify-between">
      <ButtonCustomSize
        text={btnText}
        type="submit"
        width="100px"
        bgColor="rgb(0, 179, 255)"
        textColor="white"
      />
      <Link
        href={linkPath}
        className="text-sm underline text-[#00B3FF] hover:text-red-400"
      >
        {linkText}
      </Link>
    </div>
  );
};

export default Buttons;
