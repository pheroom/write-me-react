import React, {ButtonHTMLAttributes, FC} from 'react';
import backDisIcon from '../../assets/icons/arrow-left-disabled.png'
import backActIcon from '../../assets/icons/arrow-left-active.png'
import ButtonHoverImg from "../ButtonsBase/ButtonHoverImg";

interface ButtonBackIconProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  alt: string
  indent?: boolean
}

const ButtonBackIcon: FC<ButtonBackIconProps> = ({className, alt, indent, ...args}) => {
  return (
    <ButtonHoverImg
      imgDisabled={backDisIcon}
      imgActive={backActIcon}
      className={(indent ? 'indent-icon-btn indent-back-icon-btn ' : ' ') + (className || '')}
      alt={alt}
      {...args}
    />
  );
};

export default ButtonBackIcon;