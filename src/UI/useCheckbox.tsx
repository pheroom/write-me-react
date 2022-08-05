import React, {useState} from "react";

export function useCheckbox(initStatus: boolean){
  const [status, setStatus] = useState(initStatus)

  const checkboxInput = <input
    type="checkbox"
    checked={status}
    onChange={e => setStatus(prev => !prev)}
  />

  return {checkbox: {value: status}, checkboxInput}
}