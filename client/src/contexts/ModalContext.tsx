import { createContext, ReactNode, useState } from "react";

export interface ModalContextProps {
  isOpen: boolean;
  content: ReactNode;
  title: string | null;
  open: (title: string, content: ReactNode) => void;
  close: () => void;
}

export interface ModalProviderProps {
  children: ReactNode;
}

// eslint-disable-next-line react-refresh/only-export-components
export const ModalContext = createContext<ModalContextProps | undefined>(
  undefined,
);

export function ModalProvider({ children }: ModalProviderProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [content, setContent] = useState<ReactNode | null>(null);
  const [title, setTitle] = useState<string | null>(null);

  const open = (title: string, content: ReactNode) => {
    setContent(content);
    setTitle(title);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider value={{ isOpen, open, close, content, title }}>
      {children}
    </ModalContext.Provider>
  );
}
