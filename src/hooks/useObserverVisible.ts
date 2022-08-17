import React, {useEffect, useRef} from "react";

export const useObserverVisible = (ref: React.RefObject<HTMLDivElement | undefined>, callback: (status: boolean) => void) => {
  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    if(ref.current){
      if(observer.current) observer.current.disconnect();

      let cb = function(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
        if (entries[0].isIntersecting) {
          callback(false)
        } else{
          callback(true)
        }
      };
      observer.current = new IntersectionObserver(cb);
      observer.current.observe(ref.current)
    }
  }, [])
}