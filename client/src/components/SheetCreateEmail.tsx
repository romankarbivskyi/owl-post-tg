import { Button } from "@/components/ui/button.tsx";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet.tsx";
import { useDomains } from "@/hooks/useDomains.ts";
import { Label } from "@/components/ui/label.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { useState } from "react";
import { Input } from "@/components/ui/input.tsx";

export interface SheetCreateEmailProps {
  onClick: (name: string | null, domain: string | null) => Promise<void>;
}

export default function SheetCreateEmail({ onClick }: SheetCreateEmailProps) {
  const [name, setName] = useState<string | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const domains = useDomains();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="fixed bottom-5 left-5 right-5 p-6">Create</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create email</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col items-start gap-4 my-4 w-full">
          <div className="flex flex-col items-start gap-2 w-full">
            <Label htmlFor="name" className="text-right">
              Name (Optional)
            </Label>
            <Input
              id="name"
              placeholder="jacksparrow"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-start gap-2 w-full">
            <Label htmlFor="domain" className="text-right">
              Domain (Optional)
            </Label>
            {domains.isLoading ? (
              <div>Loading...</div>
            ) : (
              <Select onValueChange={(value) => setSelectedDomain(value)}>
                <SelectTrigger className="w-full p-5">
                  <SelectValue placeholder="Select a domain" />
                </SelectTrigger>
                <SelectContent>
                  {domains.data && Array.isArray(domains.data) ? (
                    domains.data.map(({ name }) => (
                      <SelectItem key={name} value={name}>
                        {name}
                      </SelectItem>
                    ))
                  ) : (
                    <div>No domains available</div>
                  )}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>

        <SheetFooter>
          <SheetClose asChild>
            <Button
              onClick={async () => {
                await onClick(name, selectedDomain);
                setName(null);
              }}
              className="p-5"
            >
              Create
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
