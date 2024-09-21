"use client";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import BoardButtonClient from "./BoardButtonClient";
import { Eye, EyeOff } from "lucide-react";

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {isOpen && (
        <div className="z-10 flex h-screen w-1/6 flex-col justify-between space-y-3 bg-secondary/90 pb-6">
          {children}
          <div className="flex w-full flex-col items-center gap-12 pr-4">
            <ThemeToggle />
            <BoardButtonClient onClick={handleClick}>
              <EyeOff />
            </BoardButtonClient>
          </div>
        </div>
      )}

      <button
        onClick={() => handleClick()}
        className="absolute bottom-6 rounded-r-full bg-primary px-6 py-4 text-left text-lg font-medium text-white transition-colors hover:bg-primary/90"
      >
        <Eye />
      </button>
    </>
  );
}
