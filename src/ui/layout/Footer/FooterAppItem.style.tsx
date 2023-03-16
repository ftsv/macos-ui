import styled, { keyframes } from 'styled-components'

const bounceAnimation = keyframes`
  0% { transform: translateY(0px); }
  80% { transform: translateY(var(--footer-app-bounce)); }
  100% { transform: translateY(0px); }
`

export const FooterAppWrapper = styled.li`
  position: relative;
  transition: all 0.3s ease-in-out;
  width: var(--footer-icon);
  height: var(--footer-icon);
  flex: 0 0 var(--footer-icon);

  &:hover {
    width: var(--footer-icon-xl);
    height: var(--footer-icon-xl);
    flex: 0 0 var(--footer-icon-xl);
  }

  &.open:before {
    content: '•';
    position: absolute;
    bottom: 6px;
    left: 45%;
    width: 100%;
    height: 4px;
    color: white
  }
  `
export const FooterAppElement = styled.div`
  position:relative;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 6px;

  &.loading {
    animation: ${bounceAnimation} 0.5s linear infinite;
  }
`

export const AppIcon = styled.img`
  padding: 1px;
  height: 100%;
  width: 100%;
`