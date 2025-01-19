import { Message } from "@/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { NavLink } from "react-router-dom";
import { Separator } from "@/components/ui/separator.tsx";

export interface MessagesProps {
  messages?: Message[];
}

export default function Messages({ messages }: MessagesProps) {
  if (!messages || !messages.length)
    return (
      <div className="text-center text-sm">
        <p className="text-sm text-zinc-400">No messages</p>
        <img
          src="/images/logo.jpg"
          alt="Logo"
          className="dark:mix-blend-lighten grayscale select-none fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
          draggable={false}
        />
      </div>
    );

  return (
    <div className="flex flex-col gap-3 pb-16">
      {messages.map((message) => (
        <MessageCard message={message} />
      ))}
    </div>
  );
}

interface MessageCardProps {
  message: Message;
}

function MessageCard({ message }: MessageCardProps) {
  return (
    <NavLink to={`/message/${message.id}`}>
      <Card className="active:bg-zinc-900">
        <CardHeader className="flex justify-between p-3">
          <CardTitle className="flex flex-col gap-1">
            <h1 className="text-sm">{message.from}</h1>
            <p className="text-xs text-zinc-400">
              {new Date(message.created_at).toLocaleString()}
            </p>
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="p-3 pt-0">
          <h1 className="dark:text-white text-sm font-medium">
            {message.subject}
          </h1>
          <p className="text-xs dark:text-zinc-400 text-pretty">
            {message.body_text.slice(0, 120)}
          </p>
        </CardContent>
      </Card>
    </NavLink>
  );
}
