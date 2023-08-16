import React from 'react';
import {useNavigate} from "react-router-dom";

const ViewImg = ({data}: {data: string}) => {
  const navigate = useNavigate()

  return (
    <div className={'view-img'} onClick={() => navigate(-1)}>
      <div className="view-img__img-box">
        <img className={'view-img__img'} onClick={e => e.stopPropagation()} src={data} alt='photo'/>
      </div>
    </div>
  );
};

export default ViewImg;