import React, {ForwardedRef, ImgHTMLAttributes} from 'react';

interface ImgProps extends ImgHTMLAttributes<HTMLImageElement>{
  photoData?: string
}

const Img = React.forwardRef((
  {photoData, ...args}: ImgProps,
  ref: ForwardedRef<HTMLImageElement>
) => {
  return (
    <img
      onClick={e => photoData && console.log('image open: ' + photoData)}
      onDragStart={e => e.preventDefault()}
      {...args}
      ref={ref}
    />
  );
})

export default Img;