import React, {FC} from 'react';

interface LoaderProps{
  fullStretch?: boolean
  fullWidth?: boolean
}

const Loader: FC<LoaderProps> = ({fullStretch, fullWidth}) => {
  const loader = <div className={'loader-regular'}>
    <div className="loader-regular__spinner"></div>
  </div>

  return (
    fullStretch || fullWidth
      ? <div className={fullStretch ? 'full-stretch ' : fullWidth ? 'full-width ' : ''}>
      {loader}
    </div>
      : loader
  );
};

export default Loader;