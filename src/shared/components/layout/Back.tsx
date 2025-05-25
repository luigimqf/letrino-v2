"use client"
import { ROUTES } from "@/shared/constants"
import { ChevronLeft } from "lucide-react"
import Link, { LinkProps } from "next/link"


export const Back = ({href = ROUTES.HOME, ...props}: Partial<LinkProps>) => {
  return (
    <div className="flex items-center cursor-pointer">
      <ChevronLeft size={15}/>
      <Link className="text-sm" href={href} {...props}>Voltar</Link>
    </div>
  )
}