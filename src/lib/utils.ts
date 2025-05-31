import { subjectsColors } from "@/constants/subjects"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getSubjectColor = (subject : string) =>(
  subjectsColors[subject as keyof typeof subjectsColors ]
)