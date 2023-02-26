import React, {ButtonHTMLAttributes, FC} from 'react';
import closeDisIcon from "../../assets/icons/cross-disabled.png";
import closeActIcon from "../../assets/icons/cross-active.png";
import ButtonHoverImg from "../ButtonsBase/ButtonHoverImg";

interface ButtonCrossIconProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  alt: string
  indent?: boolean
}

const ButtonCrossIcon: FC<ButtonCrossIconProps> = ({className, indent, alt, ...args}) => {
  return (
    <ButtonHoverImg
      imgDisabled={closeDisIcon}
      imgActive={closeActIcon}
      className={(indent ? 'indent-icon-btn indent-cross-icon-btn ' : ' ') + (className || '')}
      alt={alt}
      {...args}
    />
  );
};

export default ButtonCrossIcon;