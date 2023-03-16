import React, { useState, useContext, FunctionComponent, FC } from 'react';
import { ModalEnum } from './modal.type';

export interface Modals {
  addModal(key: string, modal: FunctionComponent<any>): void;
  openModal(key: string, props?: { [key: string]: any }): void;
  closeModal(key?: string): void;
}

const initialState: Modals = {
  closeModal: () => {
      throw new Error('Not implemented');
  },
  openModal: () => {
      throw new Error('Not implemented');
  },
  addModal: () => {
      throw new Error('Not implemented');
  },
};

export const ModalsContext = React.createContext(initialState);
export const useModals = () => useContext(ModalsContext);

interface ModalProps {
  children: JSX.Element | JSX.Element[];
  initialModals?: { [key: string]: FunctionComponent<any> };
}

const modalKeys = new Set<string>();

export const ModalsProvider: FC<ModalProps> = ({ children, initialModals = {} }: ModalProps) => {
  const [modals, setModals] = useState<{ [key: string]: FunctionComponent<any> }>(initialModals);

  const [modal, setModal] = useState<{
    key: string;
    Component: FunctionComponent<any>;
    props: { [key: string]: any };
  }[]>([]);


  const addModal: Modals['addModal'] = (key, ModalComponent) => {
    setModals((state) => ({ ...state, [key]: ModalComponent }));
  };

  const openModal: Modals['openModal'] = (key, props = {}) => {
    if (modalKeys.has(key)) return;
    
    modalKeys.add(key);

    console.log(modalKeys, modalKeys.has(key))

    setModal((state) => [...state, {
      key,
      Component: modals[key],
      props: {
        ...props,
        id: key,
      },
    }]);
  };

  const closeModal: Modals['closeModal'] = (key?: string) => {
    console.log('closeModal', key)
    if (key === undefined) {
      setModal([]);
    } else {
      modalKeys.delete(key);
      setModal((state) => state.filter((item) => item.key !== key));
    }
  };

  return (
    <ModalsContext.Provider
      value={{
        addModal,
        openModal,
        closeModal,
      }}
    >
      {modal.map((item) => (
        <item.Component {...item.props} open key={item.key} />
      ))}
      {children}
    </ModalsContext.Provider>
  );
};