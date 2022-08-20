import React, {FC} from 'react';
import ButtonHoverImg from "../ButtonsBase/ButtonHoverImg";
import dotsDisIcon from "../../assets/icons/dots-disabled.png";
import dotsActIcon from "../../assets/icons/dots-active.png";
import closeDisIcon from "../../assets/icons/cross-disabled.png";
import closeActIcon from "../../assets/icons/cross-active.png";
import TitleModal from "./TitleModal";

interface HeaderModalProps{
  children: React.ReactNode
}

const HeaderModal: FC<HeaderModalProps> = ({children}) => {
  return (
    <div className="modal__header">
      {/*<TitleModal>{title}</TitleModal>
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
      </div>*/}
      {children}
    </div>
  );
};

export default HeaderModal;