import React, {FC, HTMLAttributes} from 'react';

interface LabelLightProps extends HTMLAttributes<HTMLDivElement>{
  children: string
  className?: string
}

const LabelLight: FC<LabelLightProps> = ({children, className, ...args}) => {
  return (
    <div className={"label-light " + (className || '')} {...args}>
      {children}
    </div>
  );
};

export default LabelLight;