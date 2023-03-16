import styled from 'styled-components'
import { FooterAppItem } from './FooterAppItem'
import FooterSettings from '@/shared/config/footer.config'
import { useState } from 'react'


const FooterWrapper = styled.footer`
  z-index: 10000;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 4px;
  height: var(--footer-height);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  background: transparent;
`

const FooterMenu = styled.ul`
  position: relative;
  padding: 2px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: flex-end;
  height: var(--footer-icon);
  justify-self: center;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: azure;
    border-radius: 8px;
    opacity: 0.3;
    z-index: -1;
  }

  li:has(+ li:hover),
  li:hover + li {
    width: var(--footer-icon-large);
    height: var(--footer-icon-large);
    flex: 0 0 var(--footer-icon-large);
  }
`

export const Footer = () => {
  const [list, setList] = useState(FooterSettings)

  if(!list.length) {
    return null
  }

  return (
    <FooterWrapper>
      <FooterMenu>
        {list.map((item) => (<FooterAppItem key={item.id} {...item} />)
        )}
      </FooterMenu>
    </FooterWrapper>
  )
}