export interface IPopupButton {
  text?: string,
  onClick?: (data: any) => void ,
  needShowProfile?: boolean,
  confirmText?: string
  dontFadeAfter?: boolean
}