import React, {FC, HTMLAttributes} from 'react';
import Img from "../Img";

interface BlockWithIconProps extends HTMLAttributes<HTMLDivElement>{
  icon: string
}

const BlockWithIcon: FC<BlockWithIconProps> = ({children, icon, ...args}) => {
  return (
  <div className="modal__block-with-icon" {...args}>
    <Img src={icon} alt="invite" className="modal__block-icon"/>
    <div>
      {children}
    </div>
  </div>
  );
};

export default BlockWithIcon;