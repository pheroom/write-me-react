import React, {FC, ImgHTMLAttributes} from 'react';

interface ImgProps extends ImgHTMLAttributes<HTMLImageElement>{

}

const Img: FC<ImgProps> = ({...args}) => {
  return (
    <img
      onClick={e => alert('image open')}
      onDragStart={e => e.preventDefault()}
      {...args}
    />
  );
};

export default Img;