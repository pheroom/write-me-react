import React, {FC} from 'react';

interface HeaderModalProps{
  children: React.ReactNode
}

const HeaderModal: FC<HeaderModalProps> = ({children}) => {
  return (
    <div className="modal__header">
      {children}
    </div>
  );
};

export default HeaderModal;