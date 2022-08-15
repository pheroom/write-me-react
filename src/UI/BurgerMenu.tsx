import React, {FC} from 'react';
import burgerIcon from '../assets/icons/burger.png'

interface BurgerMenuProps{
  status: boolean
  change: () => void
}

const BurgerMenu: FC<BurgerMenuProps> = ({status, change}) => { 
  return (
      <img className={'burger-menu__img'} onClick={change} src={burgerIcon} alt="menu"/>
  );
};

export default BurgerMenu;