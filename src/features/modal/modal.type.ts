export enum ModalEnum {
  FINDER = 'finder',
  WINDOW = 'window',
}

export interface DialogWrapperProps {
  height?: number
  left?: number
  top?: number
  width?: number
}

export interface DialogProps extends DialogWrapperProps {
  children: JSX.Element | JSX.Element[];
  id: string
}

