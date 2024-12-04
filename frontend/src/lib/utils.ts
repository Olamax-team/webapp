import React from "react"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export default function documentTitle(title:string) {

  React.useEffect(() => {
    document.title = `Olamax | ${title}`;
  }, [title]);
}