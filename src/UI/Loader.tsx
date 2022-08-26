import React, {FC} from 'react';

interface LoaderProps{
  filled?: boolean
}

const Loader: FC<LoaderProps> = ({filled}) => {
  return (
    <div className={'loader-large ' + (filled ? 'loader-large--filled' : '')}>
      <div className={'loader-large__inner'}>
        <div className="loader-large__spinner"></div>
      </div>
    </div>
  );
};

export default Loader;