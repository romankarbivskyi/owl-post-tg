import { Attachment as IAttachment } from "@/types";
import { Separator } from "@/components/ui/separator.tsx";
import { Link } from "react-router-dom";
import { useModalContext } from "@/hooks/useModalContext.ts";

export interface AttachmentsProps {
  attachments: IAttachment[];
}

export interface AttachmentProps {
  attachment: IAttachment;
}

export default function Attachments({ attachments }: AttachmentsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 p-2">
      {attachments.map((attachment) => (
        <Attachment attachment={attachment} />
      ))}
    </div>
  );
}

export function Attachment({
  attachment: { has_preview, name, id },
}: AttachmentProps) {
  const { open } = useModalContext();

  const handleOpenPreview = () => {
    open(
      name,
      <img
        src={`https://api.internal.temp-mail.io/api/v3/attachment/${id}?preview=1`}
        alt="Preview"
      />,
    );
  };

  return (
    <div className="border border-secondary rounded-xl p-2 flex flex-col gap-1 items-center">
      {name}
      <Separator />
      <div className="flex items-center gap-3">
        <Link
          to={`https://api.internal.temp-mail.io/api/v3/attachment/${id}?download=1`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            className="dark:fill-white"
          >
            <path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
          </svg>
        </Link>
        {has_preview ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            className="dark:fill-white cursor-pointer"
            onClick={handleOpenPreview}
          >
            <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
          </svg>
        ) : null}
      </div>
    </div>
  );
}
