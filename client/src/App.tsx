import WebApp from "@twa-dev/sdk";
import { useLayoutEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage.tsx";
import MessagePage from "@/pages/MessagePage.tsx";
import Notifications from "@/components/Notifications.tsx";
import Modal from "@/components/Modal.tsx";

export default function App() {
  useLayoutEffect(() => {
    WebApp.expand();
    WebApp.setHeaderColor("#09090B");
    WebApp.setBottomBarColor("#09090B");
    WebApp.setBackgroundColor("#09090B");
  }, []);

  if (!WebApp.initData || WebApp.initData.length === 0) {
    return (
      <a
        href="https://t.me/owlpost_official_bot"
        className="text-blue-500 underline"
      >
        Open in Telegram
      </a>
    );
  }

  return (
    <div>
      <Notifications />
      <Modal />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/message/:id" element={<MessagePage />} />
      </Routes>
    </div>
  );
}
