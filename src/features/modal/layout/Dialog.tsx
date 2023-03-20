import { FC, useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import { DialogProps, DialogWrapperProps } from '../modal.type'
import { modalStore } from '@/shared/store/modal-store';
import { resize } from '../lib/util/resize'
import { getPropsFromStyle } from '../lib/util/getPropsFromStyle';

const headerHeight = '30px'

const DialogWrapper = styled.div<DialogWrapperProps>`
  z-index: 1000;
  position: absolute;
  border: 1px solid black;
  border-radius: 6px;
  background-color: #f0ffff6d;
  padding-top: ${headerHeight};
  overflow: hidden;
  border-radius: 6px;
  transition: opacity 200ms ease-in-out 0ms, display 300ms ease 1s;

  &.collapse {
    opacity: 0;
  }
  &.collapsed {
    display: none;
  }
  `

const DialogHeader = styled.div`
  position: absolute;
  height: ${headerHeight};
  top: 0;
  left: 0;
  width: 100%;
  padding: 4px 8px;
  display: flex;
  align-items: center;
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
  const refDialog = useRef<HTMLDivElement>(null);
  const refHeader = useRef<HTMLDivElement>(null);
  const refTop = useRef<HTMLDivElement>(null);
  const refRight = useRef<HTMLDivElement>(null);
  const refBottom = useRef<HTMLDivElement>(null);
  const refLeft = useRef<HTMLDivElement>(null);
  
  const item = modalStore.getModalById(props.id);

  const onClose = () => {
    const styles = refDialog.current && window.getComputedStyle(refDialog.current);

    const coords = getPropsFromStyle(['zIndex', 'top', 'right', 'bottom', 'left', 'width', 'height'], styles);

    if (coords) {
      modalStore.updateModalPosition(props.id, 'normal', coords);
    }

    modalStore.closeModal(props.id);
  }

  const onCollapse = () => {
    const dialog = refDialog.current

    if (!dialog) return;

    modalStore.collapseModal(props.id);
  }

  const onClick = () => {
    const resizableElement = refDialog.current;

    if (!resizableElement) return;

    const styles = window.getComputedStyle(resizableElement);

    resizableElement.style.zIndex = '1001';

    console.log({ styles })
  }

  useEffect(() => {
    const resizableElement = refDialog.current;

    if (!resizableElement) return;

    if (item && item.currentPosition !== 'full' && typeof item.currentPosition === 'string') {
      const { zIndex, top, right, bottom, left, width, height} = item.position[item.currentPosition]
      resizableElement.style.zIndex = zIndex;
      resizableElement.style.top = top;
      resizableElement.style.right = right;
      resizableElement.style.bottom = bottom;
      resizableElement.style.left = left;
      resizableElement.style.width = width;
      resizableElement.style.height =height;
    }

    const {
      onMouseDownTopResize,
      onMouseDownRightResize,
      onMouseDownBottomResize,
      onMouseDownLeftResize,
      onMouseDown,
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

    const moveHeader = refHeader.current;
    moveHeader?.addEventListener("mousedown", onMouseDown);

    return () => {
      resizerTop?.removeEventListener("mousedown", onMouseDownTopResize);
      resizerRight?.removeEventListener("mousedown", onMouseDownRightResize);
      resizerBottom?.removeEventListener("mousedown", onMouseDownBottomResize);
      resizerLeft?.removeEventListener("mousedown", onMouseDownLeftResize);
      moveHeader?.removeEventListener("mousedown", onMouseDown);
    }
  }, [])

  useEffect(() => {
    modalStore.setDialogElement(props.id, refDialog.current);
  }, [props.id])

  return (
    <DialogWrapper ref={refDialog} {...props}  onClick={onClick}>
      <DialogHeader ref={refHeader}>
        <button onClick={onClose}> close</button>
        <button onClick={onCollapse}> collapse</button>
      </DialogHeader>
      {props.children}
      <ResizeTopElement ref={refTop} />
      <ResizeRightElement ref={refRight} />
      <ResizeBottomElement ref={refBottom}/>
      <ResizeLeftElement ref={refLeft}/>
    </DialogWrapper>
  )
}

export const Dialog = observer(DialogElement)