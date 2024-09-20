import Link from "next/link";
import React from "react";

export default async function BoardButton ({text, link}: {text: string, link: string}) {
    return <Link href={link} className="px-6 w-full py-4 bg-primary rounded-r-full hover:bg-primary/90 transition-colors text-left font-medium text-white text-lg">
        {text}
    </Link>
}