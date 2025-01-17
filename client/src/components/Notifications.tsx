import { useState, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert.tsx";
import { AlertCircle, Terminal } from "lucide-react";
import { Notification } from "../contexts/NotifyContext.tsx";
import { useNotifyContext } from "@/hooks/useNotifyContext.ts";

export default function Notifications() {
  const { notifications, deleteNotification } = useNotifyContext();
  const [visibleNotifications, setVisibleNotifications] =
    useState<Notification[]>(notifications);

  useEffect(() => {
    setVisibleNotifications(notifications);
  }, [notifications]);

  const handleRemove = (id: string) => {
    setVisibleNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, exiting: true } : notif,
      ),
    );

    setTimeout(() => deleteNotification(id), 300);
  };

  return (
    <div className="fixed flex flex-col gap-2 w-full p-3 z-50">
      {visibleNotifications.map(({ id, title, desc, type, exiting }) => (
        <Alert
          key={id}
          variant={type == "default" ? "default" : "destructive"}
          className={`bg-background ${exiting ? "notification-exit" : "notification-enter"}`}
          onClick={() => handleRemove(id)}
        >
          {type === "default" ? (
            <Terminal className="h-4 w-4" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          <AlertTitle>{title || "Notification"}</AlertTitle>
          <AlertDescription>{desc}</AlertDescription>
        </Alert>
      ))}
    </div>
  );
}
