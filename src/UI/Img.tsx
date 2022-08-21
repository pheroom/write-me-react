import React, {FC, ImgHTMLAttributes} from 'react';

interface ImgProps extends ImgHTMLAttributes<HTMLImageElement>{

}

const Img: FC<ImgProps> = ({...args}) => {
  return (
    <img
      onClick={e => console.log('image open')}
      onDragStart={e => e.preventDefault()}
      {...args}
    />
  );
};

export default Img;