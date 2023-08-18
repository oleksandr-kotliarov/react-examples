import classNames from 'classnames';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import styles from './Modal.module.scss';

export interface modalContextTypes {
  openModal: (modalContent: ReactNode) => void;
  closeModal: () => void;
  changeContent: (newContent: ReactNode) => void;
}

export const ModalContext = createContext<modalContextTypes>(
  {} as modalContextTypes
);

export const useModal = () => {
  return useContext(ModalContext);
};

interface Props {
  children: ReactNode;
}

function ModalContextProvider({ children }: Props) {
  const [content, setContent] = useState<ReactNode>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }, [isOpen]);

  const openModal = (modalContent: ReactNode) => {
    setContent(modalContent);
    setIsOpen(true);
  };

  const closeModal = () => {
    setContent(null);
    setIsOpen(false);
  };

  const changeContent = (newContent: ReactNode) => {
    setContent(newContent);
  }

  return (
    <ModalContext.Provider value={{ closeModal, openModal, changeContent }}>
      <div
        className={classNames(styles.mainContainer, {
          [styles.active]: isOpen,
        })}
        onClick={() => {
          closeModal();
        }}
      >
        <div
          className={styles.modalContainer}
          onClick={(event) => event.stopPropagation()}
        >
          {content}
        </div>
      </div>
      {children}
    </ModalContext.Provider>
  );
}

export default ModalContextProvider;
