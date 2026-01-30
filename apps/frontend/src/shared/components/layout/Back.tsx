"use client";
import { ROUTES } from "@/shared/constants";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export const Back = ({ path = ROUTES.HOME, label }: { path: string; label: string }) => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center">
      <ChevronLeft size={15} />
      <Button variant="link" className="text-xs" onClick={() => router.push(path)}>
        {label}
      </Button>
    </div>
  );
};
