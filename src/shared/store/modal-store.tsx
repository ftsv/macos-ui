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

type WindowCurrentPosition = keyof WindowPosition | 'full'

interface Dialog {
  component: FunctionComponent<any>,
  status: 'close' | 'loading' | 'open' | 'failure'
  position: WindowPosition
  currentPosition: WindowCurrentPosition
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
        })
    } catch (e) {
      if (!currentModal) return;

        this.modals.set(key, {
          ...currentModal,
          status: 'close',
        })
    }
  };

  updateModalPosition: Modals['updateModalPosition'] = (key, type, position) => {
    const currentModal = this.modals.get(key)

    if (!currentModal) return ;

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