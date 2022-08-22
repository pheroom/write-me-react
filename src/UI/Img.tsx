import React, {ForwardedRef, ImgHTMLAttributes} from 'react';

interface ImgProps extends ImgHTMLAttributes<HTMLImageElement>{

}

const Img = React.forwardRef(({...args}: ImgProps, ref: ForwardedRef<HTMLImageElement>) => {
  return (
    <img
      onClick={e => console.log('image open')}
      onDragStart={e => e.preventDefault()}
      {...args}
      ref={ref}
    />
  );
})

export default Img;