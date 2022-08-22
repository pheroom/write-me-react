import React, {FC, HTMLAttributes} from 'react';

interface button{

}

interface ButtonBarProps extends HTMLAttributes<HTMLDivElement>{
  buttons: [

  ]
}

const ButtonBar: FC<ButtonBarProps> = ({children, className, ...args}) => {
  return (
    <div className={'button-bar ' + (className || '')} {...args}>
      {children}
    </div>
  );
};

export default ButtonBar;