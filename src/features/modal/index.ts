import { Dialog } from './layout/Dialog'
import { Finder } from './ui/Finder'
import { ModalEnum } from './modal.type'
export { ModalsProvider, useModals } from './Modal'

export const modals = new Map([
  ['window',
  {
    component:Dialog,
    status: 'close',
  }],
  ['finder', 
  {
    component: Finder,
    status: 'close'
  }],
])