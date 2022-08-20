import React, {FC} from 'react';

interface ActionsHeaderModalProps{
  children: React.ReactNode
}

const ActionsHeaderModal: FC<ActionsHeaderModalProps> = ({children}) => {
  return (
    <div className="modal__header-btns">
      {children}
    </div>
  );
};

export default ActionsHeaderModal;