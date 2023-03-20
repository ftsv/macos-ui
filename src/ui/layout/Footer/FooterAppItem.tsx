import { FC, useEffect, useRef } from 'react'
import { observer } from 'mobx-react'
import { FooterAppWrapper, FooterAppElement, AppIcon } from './FooterAppItem.style'
import { FooterIconProps } from './footer.interface'
import { modalStore } from '@/shared/store/modal-store';

const plug = '/assets/icons/apps/apple.png'

const FooterAppItemComponent: FC<FooterIconProps> = (props) => {
    const item = modalStore.getModalById(props.id)

  const itemRef = useRef<HTMLLIElement>(null)

  const onOpenApp = () => {
    modalStore.collapseModal(props.id)
  }

  useEffect(() => {
    if (!itemRef.current) return;
    modalStore.setTrayElement(props.id, itemRef.current);
  }, [props.id])

  return (
  <FooterAppWrapper ref={itemRef} className={`${item?.status === 'open' || item?.status === 'tray' ? 'open' : ''}`} onClick={onOpenApp}>
    <FooterAppElement className={`${item?.status === 'loading' ? 'loading' : ''}`}>
      <AppIcon src={props.icon ?? plug} alt='' />
    </FooterAppElement>
  </FooterAppWrapper>)
}

export const FooterAppItem = observer(FooterAppItemComponent)