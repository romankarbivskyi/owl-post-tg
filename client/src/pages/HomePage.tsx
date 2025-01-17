import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import EmailMenubar from "@/components/EmailMenubar.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import Messages from "@/components/Messages.tsx";
import SheetCreateEmail from "@/components/SheetCreateEmail.tsx";
import { useCallback, useEffect, useState } from "react";
import { useEmails } from "@/hooks/useEmails.ts";
import { useMessages } from "@/hooks/useMessages.ts";
import { createEmail, deleteEmail } from "@/api/emails.ts";
import WebApp from "@twa-dev/sdk";
import { useNotifyContext } from "@/hooks/useNotifyContext.ts";

export default function HomePage(): JSX.Element | null {
  const [currentEmail, setCurrentEmail] = useState<string | null>(null);

  const emails = useEmails();

  const { notify } = useNotifyContext();

  useEffect(() => {
    if (emails.isLoading || emails.isError) return;

    if (Array.isArray(emails.data) && emails.data.length > 0) {
      if (
        !currentEmail ||
        !emails.data.some(({ email }) => email === currentEmail)
      ) {
        setCurrentEmail(emails.data[0].email ?? null);
      }
    } else {
      setCurrentEmail(null);
    }
  }, [emails.data, emails.isLoading, emails.isError, currentEmail]);

  const emailMessages = useMessages(currentEmail);

  const handleCreateEmail = useCallback(
    async (name: string | null, domain: string | null) => {
      const res = await createEmail(name, domain);

      if ("email" in res) {
        await emails.refetch();
        setCurrentEmail(res.email || null);
        notify({
          title: "Success",
          desc: "Email was successfully created",
          type: "default",
        });
      } else if ("error" in res) {
        notify({
          desc: res.error,
          type: "error",
        });
      }
    },
    [emails, notify],
  );

  const handleDeleteEmail = useCallback(async () => {
    if (currentEmail) {
      WebApp.showConfirm(
        `Are you sure you want to delete the email: ${currentEmail}?`,
        async () => {
          try {
            await deleteEmail(currentEmail);
            await emails.refetch();
            notify({
              title: "Success",
              desc: "Email deleted successfully.",
              type: "default",
            });
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (error) {
            notify({
              desc: "Failed to delete email. Please try again.",
              type: "error",
            });
          }
        },
      );
    }
  }, [currentEmail, emails, notify]);

  const handleCopyEmail = useCallback(async () => {
    if (typeof currentEmail === "string") {
      await navigator.clipboard.writeText(currentEmail);
      notify({
        type: "default",
        title: "Copied!",
        desc: "Email was successfully copied.",
      });
    }
    return;
  }, [currentEmail, notify]);

  if (emails.isError) {
    WebApp.showAlert(emails.error.toString());
    return <div>Error...</div>;
  }
  if (emailMessages.isError) {
    WebApp.showAlert(emailMessages.error.toString());
    return <div>Error...</div>;
  }

  return (
    <div>
      <div className="p-5">
        <div className="flex items-center gap-2">
          <Select
            value={currentEmail ?? ""}
            onValueChange={(value) => setCurrentEmail(value)}
          >
            <SelectTrigger className="w-full p-6 overflow-hidden">
              <SelectValue placeholder="Select an email" />
            </SelectTrigger>
            <SelectContent>
              {emails.isLoading ? (
                <div>Loading...</div>
              ) : Array.isArray(emails.data) ? (
                emails.data.map(({ email }) => (
                  <SelectItem key={email} value={email}>
                    {email}
                  </SelectItem>
                ))
              ) : (
                <div>No emails available</div>
              )}
            </SelectContent>
          </Select>
          <EmailMenubar onDelete={handleDeleteEmail} onCopy={handleCopyEmail} />
        </div>
        <Separator className="my-4" />
        <Messages messages={emailMessages.data || undefined} />
      </div>
      <SheetCreateEmail onClick={handleCreateEmail} />
    </div>
  );
}
