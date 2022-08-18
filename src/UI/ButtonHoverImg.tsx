import React, {ButtonHTMLAttributes, FC} from 'react';

interface ButtonHoverImgProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  imgDisabled: string
  imgActive: string
  alt?: string
  className?: string
}

const ButtonHoverImg: FC<ButtonHoverImgProps> = ({imgDisabled, imgActive, alt, className, ...args}) => {
  return (
    <button className={"btn-hover-img " + (className ? className : '')} {...args}>
      <img className={'btn-hover-img__img--disabled'} src={imgDisabled} alt={alt || ''}/>
      <img className={'btn-hover-img__img--active'} src={imgActive} alt={alt || ''}/>
    </button>
  );
};

export default ButtonHoverImg;