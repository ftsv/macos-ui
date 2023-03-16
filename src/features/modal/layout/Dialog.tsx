import { FC, useRef, useState } from 'react'
import styled from 'styled-components'
import { useModals } from '../Modal'
import { DialogProps, DialogWrapperProps } from '../modal.type'

const DialogWrapper = styled.dialog<DialogWrapperProps>`
  z-index: 1000;
  position: absolute;
  width: ${(props) => props.width ? props.width + 'px' : '300px' };
  height: ${({height}) => height ? height + 'px' : '300px' };
  top: ${({top}) => top ? top + 'px' : '100px' };;
  left: ${({left}) => left ? left + 'px' : '100px' };;
  border: 1px solid black;
  border-radius: 6px;
`

export const Dialog: FC<DialogProps> = (props) => {
  const { closeModal } = useModals()

  console.log({props})

  const modalRef= useRef<HTMLDialogElement>(null)

  const onClose = () => {
    closeModal(props.id)
  }

  return (
    <DialogWrapper ref={modalRef} open onClick={onClose} {...props} >
      {props.children}
    </DialogWrapper>
  )
}