import React, {createRef, useEffect, useLayoutEffect} from 'react';
import Img from "../UI/Img";

const EditImage = ({photo, photoDone, cancel}: {photo: File, photoDone: (img: string) => void, cancel: () => void}) => {
  const controllerRef = createRef<HTMLDivElement>()
  const controllerPhotoRef = createRef<HTMLDivElement>()
  const innerRef = createRef<HTMLDivElement>()

  useEffect(()=>{
    controllerRef.current?.addEventListener('mousedown', initResize)
  }, [controllerRef])

  useLayoutEffect(()=>{
    // moveControllerHandle(0, 0)
  }, [photo])

  function moveControllerHandle(x: number, y: number, side: number){
    if(innerRef.current){
      crop(photo, innerRef.current, x, y, side).then((canvas: HTMLCanvasElement) => {
        if(controllerPhotoRef.current?.firstChild){
          controllerPhotoRef.current?.removeChild(controllerPhotoRef.current?.firstChild)
        }
        controllerPhotoRef.current?.appendChild(canvas)
      });
    }
  }

  function getPhoto(){
    if(innerRef.current && controllerRef.current){
      const innerCoords = innerRef.current.getBoundingClientRect()
      const controllerCoords = controllerRef.current.getBoundingClientRect()

      let x = controllerCoords.left-innerCoords.left
      let y = controllerCoords.top-innerCoords.top

      crop(photo, innerRef.current, x, y, controllerCoords.height)
        .then((el: HTMLCanvasElement) => {
            const imgSrc = el.toDataURL('image/png')
            photoDone(imgSrc)
        })
    }
  }

  function crop(img: File, container: HTMLDivElement, x: number, y: number, side: number): Promise<HTMLCanvasElement> {

    return new Promise(resolve => {

      const inputImage = new Image();

      inputImage.onload = () => {
        const innerCoords = container.getBoundingClientRect()
        const ratio = inputImage.naturalHeight/innerCoords.height
        const outputImage = document.createElement('canvas');
        x*=ratio
        y*=ratio
        outputImage.width = side;
        outputImage.height =  side;
        const ctx = outputImage.getContext('2d');
        ctx?.drawImage(inputImage, x, y, side*ratio, side*ratio, 0, 0, side, side);
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

        newSide = Math.min(Math.max(newSide, 30), Math.min(innerCoords.height, innerCoords.width))
        newTop = Math.min(Math.max(newTop, 0), innerCoords.height - newSide)
        newLeft = Math.min(Math.max(newLeft, 0), innerCoords.width - newSide)

        controllerRef.current.style.width = newSide + 'px';
        controllerRef.current.style.height = newSide + 'px';
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
      <div className="edit-photo__inner" ref={innerRef}>
        <Img className={'edit-photo__photo'} src={URL.createObjectURL(photo)}/>
          <div ref={controllerRef} className='edit-photo__controller' data-resize={'controller'}>
            <span className="edit-photo__groove edit-photo__groove-q" data-resize={'groove-q'}></span>
            <span className="edit-photo__groove edit-photo__groove-w" data-resize={'groove-w'}></span>
            <span className="edit-photo__groove edit-photo__groove-e" data-resize={'groove-e'}></span>
            <span className="edit-photo__groove edit-photo__groove-r" data-resize={'groove-r'}></span>
          </div>
      </div>
      <div className={'button-bar'}>
        <button className={'button-bar__button'} onClick={cancel}>Cancel</button>
        <button className={'button-bar__button button-bar__button--active'} onClick={getPhoto}>Done</button>
      </div>
    </div>
  );
};

export default EditImage;