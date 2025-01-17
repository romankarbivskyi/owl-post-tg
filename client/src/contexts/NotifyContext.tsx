import { createContext, ReactNode, useState } from "react";

export type NotificationType = "default" | "error";

export interface Notification {
  id: string;
  title?: string;
  desc: string;
  type: NotificationType;
  exiting?: boolean;
}
export interface NotifyContextProps {
  notifications: Notification[];
  notify: (notificationData: Omit<Notification, "id">) => void;
  deleteNotification: (id: string) => void;
}

export interface NotifyProviderProps {
  children: ReactNode;
}

// eslint-disable-next-line react-refresh/only-export-components
export const NotifyContext = createContext<NotifyContextProps | undefined>(
  undefined,
);

export function NotifyProvider({ children }: NotifyProviderProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const notify = ({ title, desc, type }: Omit<Notification, "id">) => {
    const id = crypto.randomUUID();
    const newNotification: Notification = { id, title, desc, type };

    setNotifications((state) => [...state, newNotification]);

    setTimeout(() => {
      setNotifications((state) => state.filter((n) => n.id !== id));
    }, 3000);
  };

  const deleteNotification = (id: string) => {
    setNotifications((state) => state.filter((n) => n.id !== id));
  };

  return (
    <NotifyContext.Provider
      value={{ notifications, notify, deleteNotification }}
    >
      {children}
    </NotifyContext.Provider>
  );
}
