import React, {FC, HTMLAttributes, useState} from 'react';
import Img from "../Img";
import photoIcon from '../../assets/icons/photo-camera.png'
import EditImage from "../../components/EditImage";

interface ImageInputProps extends HTMLAttributes<HTMLLabelElement>{
  size?: 'large' | 'medium' | 'small'
  photoUrl: null | string
  setPhotoUrl: (value: null | string) => void
}

const ImageInput: FC<ImageInputProps> = ({size, photoUrl, setPhotoUrl, className, ...args}) => {
  const [img, setImg] = useState<undefined | null | File>(undefined)

  function photoHandle(e: React.ChangeEvent<HTMLInputElement>){
    if(e.target.files && e.target.files[0]){
      setImg(e.target.files[0])
    }
  }

  function cancel(){
    setPhotoUrl(null)
    setImg(null)
  }

  function photoDone(img: string){
    setPhotoUrl(img)
    setImg(null)
  }

  return (
    <>
      {img && <EditImage photo={img} photoDone={photoDone} cancel={cancel}/>}
      <label className={`image-input image-input--${size || 'small'} ` + (className || '')} {...args}>
        <input className={'image-input__input'} type="file" onChange={photoHandle}/>
        {photoUrl
          ? <Img src={photoUrl} className={'image-input__img-done'} alt={'photo'}/>
          : <Img src={photoIcon} className={'image-input__icon'} alt={'photo'}/>
        }
      </label>
    </>
  );
};

export default ImageInput;