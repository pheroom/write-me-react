import React, {FC, HTMLAttributes} from 'react';

interface ModalProps extends HTMLAttributes<HTMLDivElement>{
  closeModal: () => void
  widthFromContent?: boolean
  positionCenter?: boolean
}

const Modal: FC<ModalProps> = ({closeModal, children, positionCenter, widthFromContent, className, ...args}) => {

  return (
    <div className={'modal'} onMouseDown={closeModal}>
      <div
        className={
        "modal__inner " +
          (widthFromContent ? 'modal__inner--width-from-content ' : '') +
          (positionCenter ? 'modal__inner--position-center ' : '') +
          (className || '')}
        onMouseDown={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;

//<HeaderModal>
//           <TitleModal>{title}</TitleModal>
//           <ActionsHeaderModal>
//             <ButtonDotsIcon className={'modal__dots-btn'}
//                              alt={'more'}
//                              onClick={e => console.log('dots')}/>
//             <ButtonCrossIcon className={'modal__close-btn'}
//                              alt={'close'}
//                              onClick={closeModal}/>
//           </ActionsHeaderModal>
//         </HeaderModal>
//         <div className="modal__main">
//           <RoomPreviewBrief/>
//           <SeparateModal/>
//           <BlockWithIcon icon={infoIcon}>
//             <div className="modal__room-data-main">
//               <div className={'modal__invite'}>
//                 <ButtonCopy className="modal__invite-btn" copyText={window.location.href}>t.me/gpkdota21</ButtonCopy>
//                 <LabelLight>Link</LabelLight>
//               </div>
//               <div className="modal__description">
//                 <PUser className="modal__description-text">
//                   всем привет)Он бета-тестер и зная всё об этой игре, быстро завоевал популярность у игроков
//                 </PUser>
//                 <LabelLight>Description</LabelLight>
//               </div>
//             </div>
//           </BlockWithIcon>
//           <SeparateModal/>
//           <div className="modal__room-members">
//             <ButtonWideModal icon={groupLineIcon} text={'1 subscribers'}/>
//           </div>
//           <SeparateModal/>
//           <div className="modal__room-action">
//             <ButtonWideModal icon={exitIcon} text={'Leave channel'}/>
//           </div>
//         </div>