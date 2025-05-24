"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/shared/components/ui/dropdown-menu"
import { RootState } from "@/shared/store"
import { LogOut } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "sonner"
import { removeUserInfo } from "../../store/authSlice"
import { Button } from "@/shared/components/ui/button"
import { useRouter } from "next/navigation"
import { ROUTES } from "@/shared/constants"

export const AccountMenu = () => {
  const {username} = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter()

  const logout = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST"
      });

      if(res.ok) {
        dispatch(removeUserInfo())
        router.push(ROUTES.HOME)
      }
    } catch (error) {
      toast("Erro durante o logout")
    }
  }

  if(!username) return <Button variant="outline" className="w-15" onClick={() => router.push(ROUTES.SIGN_IN)}>Login</Button>;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="cursor-pointer select-none">
          <AvatarImage src="https://github.com/shadcn.png" alt="avatar"/>
          <AvatarFallback>--</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem disabled className="text-xs">{username}</DropdownMenuItem>
        <DropdownMenuSeparator/>
        <DropdownMenuItem className="cursor-pointer" onClick={logout}>
          <span className="text-destructive text-xs font-medium">Log out</span>
          <DropdownMenuShortcut>
            <LogOut color="var(--destructive)"/>
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}