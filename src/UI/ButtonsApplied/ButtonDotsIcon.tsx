import React, {ButtonHTMLAttributes, FC} from 'react';
import ButtonHoverImg from "../ButtonsBase/ButtonHoverImg";
import dotsDisIcon from "../../assets/icons/dots-disabled.png";
import dotsActIcon from "../../assets/icons/dots-active.png";

interface ButtonDotsIconProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  alt: string
  indent?: boolean
}

const ButtonDotsIcon: FC<ButtonDotsIconProps> = ({className, indent, alt, ...args}) => {
  return (
    <ButtonHoverImg
      imgDisabled={dotsDisIcon}
      imgActive={dotsActIcon}
      className={(indent ? 'indent-icon-btn indent-dots-icon-btn ' : ' ') + (className || '')}
      alt={alt}
      {...args}
    />
  );
};

export default ButtonDotsIcon;