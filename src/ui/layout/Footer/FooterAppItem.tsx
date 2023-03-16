import { FC, useEffect, useState } from 'react'
import { FooterAppWrapper, FooterAppElement, AppIcon } from './FooterAppItem.style'
import { FooterIconProps } from './footer.interface'

const plug = '/assets/icons/apps/apple.png'

export const FooterAppItem: FC<FooterIconProps> = (props) => {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [classNamesWrapper, setClassNamesWrapper] = useState('')


  const onOpenApp = () => {
    if (loading) return;
    
    if (!open) {
      setLoading(() => true)
  
      setOpen(() => true)
  
      setInterval(()=> {
        setLoading(() => false)
      }, 3000)
    }
  }

  return (
  <FooterAppWrapper className={`${open ? 'open' : ''}`} onClick={onOpenApp}>
    <FooterAppElement className={`${loading ? 'loading' : ''}`}>
      <AppIcon src={props.icon ?? plug} alt='' />
    </FooterAppElement>
  </FooterAppWrapper>)
}