import React, {FC} from 'react';
import burgerDisIcon from '../../assets/icons/burger-disabled.png'
import burgerActIcon from '../../assets/icons/burger-active.png'

interface BurgerMenuProps{
  status: boolean
  change: () => void
  className: string
}

const BurgerMenu: FC<BurgerMenuProps> = ({status, change, className}) => {
  return (
      <div className={'burger-menu ' + (className ? className : '')} onClick={change}>
        <img className={'burger-menu__img--disabled'} src={burgerDisIcon} alt="menu"/>
        <img className={'burger-menu__img--active'} src={burgerActIcon} alt="menu"/>
      </div>
  );
};

export default BurgerMenu;