import React, {FC, useState} from 'react';

interface CheckboxProps{
  initStatus: boolean
}

const Checkbox: FC<CheckboxProps> = ({initStatus}) => {
  const [status, setStatus] = useState(initStatus)

  return (
    <input
      type="checkbox"
      checked={status}
      onChange={e => setStatus(prev => !prev)}
    />
  );
};

export default Checkbox;