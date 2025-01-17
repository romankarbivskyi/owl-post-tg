import { useContext } from "react";
import {
  NotifyContext,
  NotifyContextProps,
} from "@/contexts/NotifyContext.tsx";

export const useNotifyContext = (): NotifyContextProps => {
  const context = useContext(NotifyContext);
  if (!context) throw new Error("NotifyContext is undefined");

  return context;
};
