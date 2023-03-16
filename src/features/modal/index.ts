import { Dialog } from './layout/Dialog'
import { Finder } from './ui/Finder'
import { ModalEnum } from './modal.type'
export { ModalsProvider, useModals } from './Modal'

export const modals = {
  [ModalEnum.WINDOW]: Dialog,
  [ModalEnum.FINDER]: Finder,
}