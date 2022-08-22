import React, {createRef, FC, HTMLAttributes, useState} from 'react';
import Img from "../Img";
import photoIcon from '../../assets/icons/photo-camera.png'
import EditImage from "../../components/EditImage";

interface ImageInputProps extends HTMLAttributes<HTMLLabelElement>{
  size?: 'large' | 'medium' | 'small'
}

const ImageInput: FC<ImageInputProps> = ({size, className, ...args}) => {
  const [img, setImg] = useState<undefined | null | File>(undefined)
  const [imgDone, setImgDone] = useState<null | string>(null)

  function photoHandle(e: React.ChangeEvent<HTMLInputElement>){
    if(e.target.files && e.target.files[0]){
      setImg(e.target.files[0])
    }
  }

  function cancel(){
    setImgDone(null)
    setImg(null)
  }

  function photoDone(img: string){
    setImgDone(img)
    setImg(null)
  }

  return (
    <>
      {img && <EditImage photo={img} photoDone={photoDone} cancel={cancel}/>}
      <label className={`image-input image-input--${size || 'small'} ` + (className || '')} {...args}>
        <input className={'image-input__input'} type="file" onChange={photoHandle}/>
        {imgDone
          ? <Img src={imgDone} className={'image-input__img-done'} alt={'photo'}/>
          : <Img src={photoIcon} className={'image-input__icon'} alt={'photo'}/>
        }
      </label>
    </>
  );
};

export default ImageInput;