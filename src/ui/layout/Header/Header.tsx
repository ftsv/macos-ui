import { useRef } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faApple }         from '@fortawesome/free-brands-svg-icons'
import { useOutsideClick } from '@/shared/lib/hook/click-outside'
import { getNode }         from '@/shared/lib/util/get-node'
import { HeaderContextMenu } from './HeaderContextMenu'

const HeaderWrapper = styled.header`
  z-index: 10000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-width: var(--width-ipad);
  height: var(--header-height);
  padding: 8px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  column-gap: var(--app-gap);

  &:before {
    z-index: -1;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--header-color);
  }
`

const AppList = styled.ul`
  width: fit-content;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  font-size: small;

  &.active > li:hover {
    background-color: #4b4b4b15;
  }

  :not(.active) > li > ul,
  &.active > li:not(:hover) > ul {
    display: none;
  }
`

const ListItem = styled.li<{isActive?: boolean}>`
position: relative;
display: inline-block;
cursor: default;
padding: 4px 8px;
border-radius: 4px;

${(props) => props.isActive ? 'font-weight: 600;': ''}
`



export const Header = () => {
  const toolbarRaf = useRef<HTMLUListElement>(null)

  useOutsideClick(toolbarRaf, () => {
    toolbarRaf.current?.classList.remove('active')
  })

  const toggleParentActiveClass = (e: any) => {
    const parent = getNode(e.target.parentNode, 'UL')

    if(parent) {
      parent.classList.toggle('active')
    }
  }
  return (
    <HeaderWrapper>
    
    <AppList ref={toolbarRaf}>
      <ListItem onClick={toggleParentActiveClass} className="toolbar">
        <FontAwesomeIcon icon={faApple} />
        <HeaderContextMenu />
      </ListItem>
      <ListItem isActive onClick={toggleParentActiveClass}>
        <span>Active App</span>
        <HeaderContextMenu />
      </ListItem>
      <ListItem onClick={toggleParentActiveClass}>
        <span>File</span>
        <HeaderContextMenu />
      </ListItem>
      <ListItem onClick={toggleParentActiveClass}>Edit</ListItem>
      <ListItem onClick={toggleParentActiveClass}>View</ListItem>
      <ListItem onClick={toggleParentActiveClass}>Go</ListItem>
    </AppList>
  </HeaderWrapper>
  )
}