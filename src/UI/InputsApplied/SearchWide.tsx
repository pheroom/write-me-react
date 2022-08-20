import React, {FC, InputHTMLAttributes} from 'react';
import Img from "../Img";
import magnifierIcon from "../../assets/icons/magnifier.png";
import Input from "../InputsBase/Input";
import ButtonCrossIcon from "../ButtonsApplied/ButtonCrossIcon";

interface SearchWideProps extends InputHTMLAttributes<HTMLInputElement>{
  resetValue?: () => void
}

const SearchWide: FC<SearchWideProps> = ({value, resetValue, ...args}) => {

  return (
    <div className="search">
      <Img src={magnifierIcon} className={'search__icon'}/>
      <Input
        type="text"
        className={'search__input '}
        placeholder={'Search'}
        value={value}
        autoFocus
        {...args}
      />
      <ButtonCrossIcon alt={'clear'} className={'search__clear ' + (value ? '' : 'search__clear--disabled')} onClick={resetValue}/>
    </div>
  );
};

export default SearchWide;