import { useContext } from "react";
import { ModalContext } from "@/contexts/ModalContext.tsx";

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModalContext is undefined");

  return context;
};
