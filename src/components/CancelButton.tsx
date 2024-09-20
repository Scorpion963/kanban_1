"use client"
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function CancelButton() {
  const router = useRouter();
  return (
    <Button type="button" onClick={() => router.back()} className="w-1/2 rounded-full">
      Cancel
    </Button>
  );
}
