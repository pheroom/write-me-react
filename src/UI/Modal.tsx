import React, {FC} from 'react';
import closeDisIcon from '../assets/icons/cross-disabled.png'
import closeActIcon from '../assets/icons/cross-active.png'
import dotsDisIcon from '../assets/icons/dots-disabled.png'
import dotsActIcon from '../assets/icons/dots-active.png'
import infoIcon from '../assets/icons/info.png'
import exitIcon from '../assets/icons/exit.png'
import groupLineIcon from '../assets/icons/group-line.png'
import ButtonHoverImg from "./ButtonHoverImg";

interface ModalProps{
  title: string
  closeModal: () => void
}

const Modal: FC<ModalProps> = ({title, closeModal}) => {

  function copyInviteLink() {
    navigator.clipboard.writeText(window.location.href)
  }

  return (
    <div className={'modal'} onClick={closeModal}>
      <div className="modal__inner" onClick={e => e.stopPropagation()}>
        <div className="modal__header">
          <h4 className="modal__title">{title}</h4>
          <div className="modal__header-btns">
            <ButtonHoverImg
              imgDisabled={dotsDisIcon}
              imgActive={dotsActIcon}
              className={'modal__dots-btn'}
              alt={'more'}
            />
            <ButtonHoverImg
              imgDisabled={closeDisIcon}
              imgActive={closeActIcon}
              className={'modal__close-btn'}
              alt={'close'}
              onClick={closeModal}
            />
          </div>
        </div>
        <div className="modal__main">
          <div className="modal__room-preview">
            <div className="modal__room-img-box">
              <img className="modal__room-img" src="https://cdn.ananasposter.ru/image/cache/catalog/poster/mult/95/2266-1000x830.jpg" alt="ava"/>
            </div>
            <div className="modal__room-info">
              <h5 className="modal__room-title">
                gpkdota
              </h5>
              <p className="modal__room-count-sub">11 330 subscribers</p>
            </div>
          </div>
          <div className={'modal__separate'}/>
          <div className="modal__room-data">
            <img src={infoIcon} alt="invite" className="modal__room-data-icon"/>
            <div className="modal__room-data-main">
              <div className="modal__invite">
                <button className="modal__invite-btn" onClick={copyInviteLink}>t.me/gpkdota21</button>
                <div className="modal__invite-label">Link</div>
              </div>
              <div className="modal__description">
                <p className="modal__description-text">
                  всем привет)Он бета-тестер и зная всё об этой игре, быстро завоевал популярность у игроков
                </p>
                <div className="modal__description-label">Description</div>
              </div>
            </div>
          </div>
          <div className={'modal__separate'}/>
          <div className="modal__room-members">
            <button className="modal__room-members-btn">
              <img src={groupLineIcon} alt="members" className="modal__room-members-icon"/>
              <span className="modal__room-members-text">
                1 subscribers
            </span>
            </button>
          </div>
          <div className={'modal__separate'}/>
          <div className="modal__room-action">
            <button className="modal__leave-btn">
              <img src={exitIcon} alt="leave" className="modal__leave-icon"/>
              <span className="modal__leave-text">
                Leave channel
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;