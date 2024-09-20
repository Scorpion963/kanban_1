import React from "react";

export default function BoardButtonClient({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={() => onClick()}
      className="w-full rounded-r-full bg-primary px-6 py-4 text-left text-lg font-medium text-white transition-colors hover:bg-primary/90"
    >
      {children}
    </button>
  );
}
