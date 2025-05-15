"use client"

import { Award } from "lucide-react"
import { Logo } from "./Logo"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

export const Header = () => {
  return(
    <header className="w-full h-20 flex justify-between items-center px-10">
      
      <Logo />

      <div className="flex gap-6 justify-center items-center">
        <Award color="var(--foreground)"/>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"/>
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}