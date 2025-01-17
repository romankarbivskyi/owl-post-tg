import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { useModalContext } from "@/hooks/useModalContext.ts";

export default function Modal() {
  const { isOpen, content, title, close } = useModalContext();

  if (!isOpen) return;

  return (
    <div>
      <div className="fixed inset-0 bg-black/80 z-40" onClick={close}></div>
      <div className="fixed left-5 right-5 top-5 z-50">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{title}</CardTitle>
            <CardDescription onClick={close} className="active:opacity-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                viewBox="0 -960 960 960"
                width="20px"
                className="dark:fill-white cursor-pointer"
              >
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            </CardDescription>
          </CardHeader>
          <CardContent>{content}</CardContent>
        </Card>
      </div>
    </div>
  );
}
