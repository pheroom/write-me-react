import React, {ForwardedRef, ImgHTMLAttributes} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {RouteNames} from "../router";

interface ImgProps extends ImgHTMLAttributes<HTMLImageElement>{
  photoData?: string | null
}

const Img = React.forwardRef((
  {photoData, onClick, ...args}: ImgProps,
  ref: ForwardedRef<HTMLImageElement>
) => {
  const navigate = useNavigate()
  const location = useLocation()
  return (
    <img
      onClick={e => {
        photoData && navigate(RouteNames.IMG, {state: {background: location, photoData}})
        onClick && onClick(e)
      }}
      onDragStart={e => e.preventDefault()}
      {...args}
      ref={ref}
    />
  );
})

export default Img;