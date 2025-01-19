import { useNavigate, useParams } from "react-router-dom";
import { useMessage } from "@/hooks/useMessage.ts";
import { Separator } from "@/components/ui/separator.tsx";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Attachments from "@/components/Attachments.tsx";
import { Message } from "@/types";
import { useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";

export default function MessagePage() {
  const { id } = useParams<{ id: string }>();
  const { isLoading, isError, data } = useMessage(id);
  const navigate = useNavigate();

  const { subject, from, body_html, body_text, attachments, created_at } =
    (data || {}) as Message;

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    WebApp.BackButton.onClick(() => {
      navigate("/");
      WebApp.BackButton.hide();
    });
    WebApp.BackButton.show();
  }, [navigate]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isLoading) {
    return (
      <Card className="mx-auto m-3 max-w-2xl shadow-lg">
        <CardHeader>
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="mt-2 h-3 w-1/3" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-20 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <div className="flex h-screen items-center justify-center text-lg font-medium text-red-500">
        Failed to load the message. Please try again later.
      </div>
    );
  }

  return (
    <Card className="mx-auto m-3 shadow-lg">
      <CardHeader>
        <CardTitle className="flex flex-col items-start gap-2 justify-between">
          <span className="text-md font-bold">Message Details</span>
        </CardTitle>
        <CardDescription className="flex flex-col gap-2">
          <div>
            <span className="font-semibold dark:text-zinc-300">From:</span>
            <p>{from}</p>
          </div>
          <div className="text-sm text-zinc-500">
            <span className="font-medium">Received at:</span>{" "}
            {new Date(created_at).toLocaleString()}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 px-6 overflow-auto">
        <div>
          <span className="font-semibold">{subject}</span>
          {body_html.includes("<body") ? (
            <iframe
              srcDoc={body_html}
              height={windowSize.height}
              width={windowSize.width}
              className="break-words"
            ></iframe>
          ) : (
            <div className="text-pretty break-words">{body_text}</div>
          )}
        </div>
      </CardContent>
      {attachments.length > 0 ? (
        <>
          <Separator />
          <Attachments attachments={attachments} />
        </>
      ) : null}
    </Card>
  );
}
