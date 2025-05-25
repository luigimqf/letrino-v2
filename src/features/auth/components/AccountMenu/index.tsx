"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/shared/components/ui/dropdown-menu"
import { RootState } from "@/shared/store"
import { CircleHelp, LogOut } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "sonner"
import { removeUserInfo, setUserInfo } from "../../store/authSlice"
import { Button } from "@/shared/components/ui/button"
import { useRouter } from "next/navigation"
import { ROUTES } from "@/shared/constants"
import { useUserData } from "../../services/queries"
import { useEffect } from "react"
import { useLogout } from "../../services/mutations"

export const AccountMenu = () => {
  const {avatar,username, score} = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const {data: dataResult, isPending: isDataPending} = useUserData();
  const {data: logoutResult,isPending: isLogoutPending, mutate} = useLogout();

  useEffect(() => {
    if(dataResult?.success) {
      dispatch(setUserInfo(dataResult.data))
    }
  },[dataResult])

  useEffect(() => {
    if(logoutResult?.success) {
      dispatch(removeUserInfo())
      router.push(ROUTES.HOME)
      return;
    };

    if(!logoutResult?.success) {
      toast("Erro durante o logout")
    }
  },[logoutResult])

  if(!username) return <Button variant="outline" className="w-15" onClick={() => router.push(ROUTES.SIGN_IN)}>Login</Button>;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="cursor-pointer select-none">
          <AvatarImage src={avatar} alt="avatar"/>
          <AvatarFallback>--</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem disabled className="text-xs flex items-center justify-between">{username} <span>{score} pts</span></DropdownMenuItem>
        <DropdownMenuSeparator/>
        <DropdownMenuItem disabled={isDataPending || isLogoutPending} className="cursor-pointer hover:bg-accent transition-all duration-300" onClick={() => mutate()}>
          <span className="text-destructive text-xs">Log out</span>
          <DropdownMenuShortcut>
            <LogOut color="var(--destructive)"/>
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator/>
        <DropdownMenuItem className="cursor-pointer hover:bg-accent transition-all duration-300">
          <span className="text-xs">Suporte</span>
          <DropdownMenuShortcut>
            <CircleHelp />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}