import { FunctionComponent } from "react";
import { makeAutoObservable } from "mobx";
import { enableStaticRendering } from "mobx-react";
import { Finder } from "@/features/modal/ui/Finder";

const isServer = typeof window === "undefined";
// eslint-disable-next-line react-hooks/rules-of-hooks
enableStaticRendering(isServer);

interface Modal {
  key: string;
  Component: FunctionComponent<any>;
  props: { [key: string]: any };
}

export interface WidowCoords {
  zIndex: string
  top: string
  right: string
  bottom: string
  left: string
  width: string
  height: string
  minWidth: string
  minHeight: string
}

interface WindowPosition {
  normal: WidowCoords
}

type WindowCurrentPosition = keyof WindowPosition | 'full' | 'tray'

interface Dialog {
  component: FunctionComponent<any>,
  status: 'close' | 'loading' | 'open' | 'failure'
  position: WindowPosition
  currentPosition: WindowCurrentPosition
  trayElement?: HTMLElement
  dialogElement?: HTMLElement
}

type ModalComponents = Map<string, Dialog>
export interface Modals {
  addModal(key: string, modal: FunctionComponent<any>): void;
  openModal(key: string, props?: { [key: string]: any }): void;
  closeModal(key?: string): void;
  updateModalPosition(key: string,type: keyof WindowPosition, position: Partial<WidowCoords>):void;
}

export class ModalStore {
  modal: Modal[] = []
  private modals: ModalComponents
  private modalKeys = new Set<string>()
  private timerCollapse?: ReturnType<typeof setTimeout> ;

  constructor(modals: ModalComponents) {
    makeAutoObservable(this);
    this.modals = modals;
  }

  openModal: Modals['openModal'] = (key, props = {}) => {
    if (this.modalKeys.has(key) ) {
      console.log('This window already open.', key)
      return;
    }
    if (!this.modals.has(key)) {
      console.log('This window does not exist.', key)
      return;
    }

    const currentModal = this.modals.get(key) as Dialog

    this.modals.set(key, {
      ...currentModal,
      status: 'loading',
    })

    
    try {
      this.modalKeys.add(key);

      setTimeout(() => {
        this.modal.push({
          key,
          Component: this.modals.get(key)!.component,
          props: {
            ...props,
            id: key,
          },
        });
  
        this.modals.set(key, {
          ...currentModal,
          status: 'open',
        })

      }, 1001)
    } catch (e) {
      this.modals.set(key, {
        ...currentModal,
        status: 'failure',
      })
    }
  }

  closeModal: Modals['closeModal'] = (key?: string) => {
    if (key === undefined) {
     return this.clearModals()
    }

    const currentModal = this.modals.get(key)

    try {
        this.modalKeys.delete(key);

        this.modal = this.modal.filter((item) => item.key !== key);


        if (!currentModal) return;

        this.modals.set(key, {
          ...currentModal,
          status: 'close',
          dialogElement: undefined,
        })
    } catch (e) {
      console.error({ e });
    }
  }

  collapseModal = (key: string) => {
    const element = this.getModalById(key);
 
    if (!element?.trayElement) return;

    if (!element.dialogElement) return this.openModal(key);

    if (element.dialogElement.classList.contains('collapse')) {
      element.currentPosition = 'normal';
      if (this.timerCollapse) {
        clearTimeout(this.timerCollapse);
      }
      element.dialogElement?.classList.remove('collapsed');
    } else {
      element.currentPosition = 'tray';
      this.timerCollapse = setTimeout(() => {
        element.dialogElement?.classList.add('collapsed');
      }, 200)
    }
    
    element.dialogElement.classList.toggle('collapse');
  }

  updateModalPosition: Modals['updateModalPosition'] = (key, type, position) => {
    const currentModal = this.modals.get(key)

    if (!currentModal || currentModal.trayElement) return ;

    this.modals.set(key, {
      ...currentModal,
      position: {
        ...currentModal.position,
       [type]: {
        ...currentModal.position[type],
        ...position,
       },
      },
    })
  }

  getModalById = (id: string) => {
    return this.modals.get(id) ?? null;
  }

  private clearModals = () => {
    this.modal = []

    this.modals.forEach((value) => {
      value.status = 'close'
    } )
  }
  
  setDialogElement = (key: string, dialogElement: HTMLElement | null) => {
    const currentModal = this.modals.get(key)

    if (!currentModal || dialogElement === null) return ;

    this.modals.set(key, {
      ...currentModal,
      dialogElement,
    })
  }
  
  setTrayElement = (key: string, trayElement: HTMLElement | null) => {
    const currentModal = this.modals.get(key)

    if (!currentModal || trayElement === null) return ;

    this.modals.set(key, {
      ...currentModal,
      trayElement,
    })
  }
}

const initialModals: ModalComponents = new Map([
  ['finder', {
    component: Finder,
    status: 'close',
    position: {
      normal: {
        top: '20%',
        right: '',
        bottom: '',
        left: '10%',
        width: '30%',
        height: '40%',
        zIndex: '1000',
        minWidth: '200',
        minHeight: '200',
      }
    },
    currentPosition: 'normal'
  }]
])

export const modalStore = new ModalStore(initialModals);