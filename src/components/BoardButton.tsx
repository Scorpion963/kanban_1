import Link from "next/link";
import React from "react";
export default async function BoardButton({
  text,
  link,
}: {
  text: string;
  link: string;
}) {
  return (
    <Link
      href={link}
      className="w-full rounded-r-full bg-primary px-6 py-4 text-left text-lg font-medium text-white transition-colors hover:bg-primary/90"
    >
      {text}
    </Link>
  );
}
