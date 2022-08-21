import React, {createRef, useEffect, useState} from 'react';
import Img from "../UI/Img";
import img from "../UI/Img";

const EditImage = () => {
  const [photo, setPhoto] = useState<undefined | null | File>(undefined)
  const controllerRef = createRef<HTMLDivElement>()
  const controllerPhotoRef = createRef<HTMLDivElement>()
  const innerRef = createRef<HTMLDivElement>()

  function photoHandle(e: React.ChangeEvent<HTMLInputElement>){
    if(e.target.files && e.target.files[0]){
      setPhoto(e.target.files[0])
    }
  }

  useEffect(()=>{
    controllerRef.current?.addEventListener('mousedown', initResize)
  }, [controllerRef])

  useEffect(()=>{
    moveControllerHandle(0, 0)
  }, [photo])

  function moveControllerHandle(x: number, y: number, side?: number){
    if(photo && innerRef.current){
      crop(photo, innerRef.current, x, y, side).then((canvas: HTMLCanvasElement) => {
        if(controllerPhotoRef.current?.firstChild){
          controllerPhotoRef.current?.removeChild(controllerPhotoRef.current?.firstChild)
        }
        controllerPhotoRef.current?.appendChild(canvas)
      });
    }
  }

  // function getPhoto(){
  //   const el = document.getElementById('canvas') as HTMLCanvasElement
  //   if(controllerPhotoRef.current){
  //     controllerPhotoRef.current.innerHTML = `<img src=${el.toDataURL('image/png')} alt='img'/>`
  //   }
  // }

  function crop(img: File, container: HTMLDivElement, x: number, y: number, side?: number): Promise<HTMLCanvasElement> {

    return new Promise(resolve => {

      const inputImage = new Image();

      inputImage.onload = () => {
        const innerCoords = container.getBoundingClientRect()

        const initWidth = innerCoords.width;
        const initHeight = innerCoords.height;

        const outputImage = document.createElement('canvas');

        outputImage.dataset.resize = 'controller'
        outputImage.id = 'canvas'

        outputImage.width = side || initWidth;
        outputImage.height =  side || initHeight;

        const ctx = outputImage.getContext('2d');
        ctx?.drawImage(inputImage, x, y);
        resolve(outputImage);
      };

      inputImage.src = URL.createObjectURL(img)
    }
    );
  };

  function initResize(e: MouseEvent){
    if (!(e.target instanceof HTMLElement) || !e.target?.dataset.resize || !controllerRef.current) return

    if(e.target.dataset.resize === 'controller'){
      move(e)
    } else if(e.target.dataset.resize === 'groove-q'){
      resizeQ(e)
    }

  }

  function resizeQ(e: MouseEvent){
    function moveAt(pageX: number, pageY: number) {
      if(controllerRef.current && innerRef.current) {

        let elCoords = controllerRef.current.getBoundingClientRect()
        let innerCoords = innerRef.current.getBoundingClientRect()

        let newLeft = elCoords.left
        let newTop = elCoords.top
        let newSide = elCoords.width

        if(pageX < elCoords.left || pageY < elCoords.top){
          newSide = Math.max(elCoords.width + elCoords.left - pageX, elCoords.width + elCoords.top - pageY)
          if(newSide <= innerCoords.width || newSide <= innerCoords.height){
            newTop = pageY - innerCoords.top
            newLeft = pageX - innerCoords.left
          }else{
            return
          }
        } else {
          newSide = Math.min(elCoords.width + elCoords.left - pageX, elCoords.width + elCoords.top - pageY)
          if(newSide >= 30){
            newTop = pageY - innerCoords.top
            newLeft = pageX - innerCoords.left
          }else{
            return
          }
        }

        newSide = Math.min(Math.max(newSide, 30), innerCoords.height)
        newTop = Math.min(Math.max(newTop, 0), innerCoords.height - newSide)
        newLeft = Math.min(Math.max(newLeft, 0), innerCoords.width - newSide)

        controllerRef.current.style.width = newSide + 'px';
        controllerRef.current.style.height = newSide + 'px';
        controllerRef.current.style.left = newLeft + 'px';
        controllerRef.current.style.top = newTop + 'px';
        moveControllerHandle(-newLeft, -newTop, newSide)
      }
    }

    function onMouseMove(event: MouseEvent) {
      if(controllerRef.current) {
        moveAt(event.pageX, event.pageY);
      }
    }

    document.addEventListener('mousemove', onMouseMove);

    document.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      document.onmouseup = null
    };

  }

  function move(e: MouseEvent){
    if(!controllerRef.current) return

    let shiftX = e.clientX - controllerRef.current.getBoundingClientRect().left;
    let shiftY = e.clientY - controllerRef.current.getBoundingClientRect().top;

    moveAt(e.pageX, e.pageY);

    function moveAt(pageX: number, pageY: number) {
      if(controllerRef.current && innerRef.current) {

        let widthEl = controllerRef.current.getBoundingClientRect().width
        let heightEl = controllerRef.current.getBoundingClientRect().height

        let leftInner = innerRef.current.getBoundingClientRect().left
        let widthInner = innerRef.current.getBoundingClientRect().width
        let topInner = innerRef.current.getBoundingClientRect().top
        let heightInner = innerRef.current.getBoundingClientRect().height

        let newLeft = pageX - shiftX - leftInner
        let newTop = pageY - shiftY - topInner

        newLeft = newLeft < 0 ? 0 : ( newLeft + widthEl > widthInner ? widthInner - widthEl : newLeft )
        newTop = newTop < 0 ? 0 : ( newTop + heightEl > heightInner ? heightInner - heightEl : newTop )

        moveControllerHandle(-newLeft, -newTop, widthEl)

        controllerRef.current.style.left = newLeft + 'px';
        controllerRef.current.style.top = newTop + 'px';
      }
    }

    function onMouseMove(event: MouseEvent) {
      if(controllerRef.current) {
        moveAt(event.pageX, event.pageY);
      }
    }

    document.addEventListener('mousemove', onMouseMove);

    document.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      document.onmouseup = null
    };
  }

  return (
    <div className={'edit-photo'}>
      <input type="file" onChange={photoHandle}/>
      {photo && <div className="edit-photo__inner" ref={innerRef}>
        <Img className={'edit-photo__photo'} src={URL.createObjectURL(photo)}/>
        <div ref={controllerRef} className='edit-photo__controller' data-resize={'controller'}>
          <div ref={controllerPhotoRef} className="edit-photo__controller-photo" data-resize={'controller'}></div>
          <span className="edit-photo__groove edit-photo__groove-q" data-resize={'groove-q'}></span>
          <span className="edit-photo__groove edit-photo__groove-w" data-resize={'groove-w'}></span>
          <span className="edit-photo__groove edit-photo__groove-e" data-resize={'groove-e'}></span>
          <span className="edit-photo__groove edit-photo__groove-r" data-resize={'groove-r'}></span>
        </div>
      </div>}
    </div>
  );
};

export default EditImage;