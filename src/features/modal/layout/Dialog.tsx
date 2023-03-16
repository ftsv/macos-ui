import { FC, useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import { DialogProps, DialogWrapperProps } from '../modal.type'
import { modalStore } from '@/shared/store/modal-store';
import { resize } from '../lib/util/resize'

const DialogWrapper = styled.div<DialogWrapperProps>`
  z-index: 1000;
  position: absolute;
  border: 1px solid black;
  border-radius: 6px;
  background-color: #f0ffff6d;
  `

const ResizeTopElement = styled.div`
  cursor: n-resize;
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 5px;
`

const ResizeRightElement = styled.div`
  cursor: w-resize;
  position: absolute;
  right: 0px;
  top: 0px;
  width: 5px;
  height: 100%;
`

const ResizeBottomElement = styled.div`
  cursor: n-resize;
  position: absolute;
  left: 0px;
  bottom: 0px;
  width: 100%;
  height: 5px;
`

const ResizeLeftElement = styled.div`
  cursor: w-resize;
  position: absolute;
  left: 0px;
  top: 0px;
  width: 5px;
  height: 100%;
`

const DialogElement: FC<DialogProps> = (props) => {
  console.log({props})

  const refDialog = useRef<HTMLDivElement>(null);

  const refTop = useRef<HTMLDivElement>(null);
  const refRight = useRef<HTMLDivElement>(null);
  const refBottom = useRef<HTMLDivElement>(null);
  const refLeft = useRef<HTMLDivElement>(null);

  const onClose = () => {
    modalStore.closeModal(props.id);
  }

  const onClick = () => {
    const resizableElement = refDialog.current;

    if (!resizableElement) return;

    const styles = window.getComputedStyle(resizableElement);

    console.log({ styles })
  }

  useEffect(() => {
    const resizableElement = refDialog.current;

    if (!resizableElement) return;

    resizableElement.style.top = "150px";
    resizableElement.style.left = "150px";
    resizableElement.style.width = "150px";
    resizableElement.style.height = "150px";

    const {
      onMouseDownTopResize,
      onMouseDownRightResize,
      onMouseDownBottomResize,
      onMouseDownLeftResize,
    } = resize(resizableElement);



    // Mouse Down event listener
    const resizerTop = refTop.current;
    resizerTop?.addEventListener("mousedown", onMouseDownTopResize);

    const resizerRight = refRight.current;
    refRight.current?.addEventListener("mousedown", onMouseDownRightResize);

    const resizerBottom = refBottom.current;
    resizerBottom?.addEventListener("mousedown", onMouseDownBottomResize);

    const resizerLeft = refLeft.current;
    resizerLeft?.addEventListener("mousedown", onMouseDownLeftResize);

    return () => {
      resizerTop?.removeEventListener("mousedown", onMouseDownTopResize);
      resizerRight?.removeEventListener("mousedown", onMouseDownRightResize);
      resizerBottom?.removeEventListener("mousedown", onMouseDownBottomResize);
      resizerLeft?.removeEventListener("mousedown", onMouseDownLeftResize);
    }
  }, [])

  return (
    <DialogWrapper ref={refDialog} open {...props}  onClick={onClick}>
      <button onClick={onClose}> close</button>
      {props.children}
      <ResizeTopElement ref={refTop} />
      <ResizeRightElement ref={refRight} />
      <ResizeBottomElement ref={refBottom}/>
      <ResizeLeftElement ref={refLeft}/>
    </DialogWrapper>
  )
}

export const Dialog = observer(DialogElement)