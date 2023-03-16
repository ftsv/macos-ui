import { useEffect } from 'react'
import styled from 'styled-components'

const ContextMenu = styled.ul`
  margin-top: 4px;
  left: -2px;
  position: absolute;
  padding: 6px 4px;
  width: 200px;
  border: 0.5px solid #636363;
  border-radius: 6px;
  font-weight: 400;
  overflow: hidden;

  :before {
    z-index: -1;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--header-context);
    border-radius: 6px;
    filter: blur(0.1rem);
  }
`
const ContentMenuItem = styled.li`
  padding: 2px 6px;
  width: 100%;
  border: none;
  border-radius: 4px;

  :hover {
    background-color: #007bff;
  }
`

export const HeaderContextMenu = () => {
  useEffect(() => {
    console.log('HeaderContextMenu render')
  }, [])
  return (
    <ContextMenu>
      <ContentMenuItem>Об этом Mac</ContentMenuItem>
      <ContentMenuItem>Пункт 2</ContentMenuItem>
      <ContentMenuItem>Пункт 3</ContentMenuItem>
      <ContentMenuItem>Пункт 4</ContentMenuItem>
      <ContentMenuItem>Пункт 5</ContentMenuItem>
    </ContextMenu>
  )
}