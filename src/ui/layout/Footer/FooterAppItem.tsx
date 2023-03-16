import { FC, useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { FooterAppWrapper, FooterAppElement, AppIcon } from './FooterAppItem.style'
import { FooterIconProps } from './footer.interface'
import { modalStore } from '@/shared/store/modal-store';

const plug = '/assets/icons/apps/apple.png'

const FooterAppItemComponent: FC<FooterIconProps> = (props) => {
    const item = modalStore.getModalById(props.id)

    console.log({ item })

  const onOpenApp = () => {
    modalStore.openModal(props.id)
  }

  return (
  <FooterAppWrapper className={`${item?.status === 'open' ? 'open' : ''}`} onClick={onOpenApp}>
    <FooterAppElement className={`${item?.status === 'loading' ? 'loading' : ''}`}>
      <AppIcon src={props.icon ?? plug} alt='' />
    </FooterAppElement>
  </FooterAppWrapper>)
}

export const FooterAppItem = observer(FooterAppItemComponent)