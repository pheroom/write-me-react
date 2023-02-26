import React, {FC, HTMLAttributes, useEffect, useRef} from 'react';
import Error from "./Error";

interface TemporaryErrorProps extends HTMLAttributes<HTMLDivElement> {
  resetError: () => void
  time?: number
  children: string
}

const TemporaryError: FC<TemporaryErrorProps> = ({resetError, children, time, className, ...args}) => {

  const timer = useRef<null | ReturnType<typeof setTimeout>>(null)

  useEffect(() => {
    if (timer.current) {
      clearInterval(timer.current)
    }
    timer.current = setTimeout(() => {
      resetError()
    }, time || 1000)
    return () => {
      if (timer.current) {
        clearInterval(timer.current)
      }
    }
  }, [])

  return (
    <Error className={className} {...args}>
      {children}
    </Error>
  );
};

export default TemporaryError;