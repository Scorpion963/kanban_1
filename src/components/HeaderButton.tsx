"use client";
import { useSearchParams } from "next/navigation";
import Modal from "./Modal";
import { Button } from "./ui/button";

export default function HeaderButton({
  id,
  text,
  onClick,
  children,
}: {
  id: string;
  text: string;
  onClick: (id: string) => void;
  children?: React.ReactNode;
}) {
  return (
    <>
      <Button
        onClick={() => onClick(id)}
        className="justify-start rounded-none rounded-t-lg"
      >
        {text}
      </Button>
      {children}
    </>
  );
}
