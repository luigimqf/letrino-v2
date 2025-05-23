"use client"

import { login } from "@/app/actions/auth"
import { Logo } from "@/shared/components/layout/Logo"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { useRouter } from "next/navigation"
import { useActionState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setUserInfo } from "../../store/authSlice"
import { RootState } from "@/shared/store"
import { toast } from "sonner"
import { ROUTES } from "@/shared/constants"

export default function LoginForm() {
  const [result, handleLogin, isPending] = useActionState(login, null);
  const {username} = useSelector((state: RootState) => state.auth)
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if(result?.success && result.data) {
      dispatch(setUserInfo(result.data.user.username))
      toast("Login efetuado com sucesso!", {
        description: `Seja bem-vindo ${username}`,
        action: {
          label: "Fechar",
          onClick: () => {}
        },
        duration: 3000
      })
      router.push(ROUTES.HOME)
    }

    if(!result?.success && result?.error.login) {
      toast("Erro ao efetuar login", {
        description: result.error.login?.[0],
        action: {
          label: "Fechar",
          onClick: () => {}
        },
        duration: 3000
      })
    }
  },[result])
  
  return (
    <form action={handleLogin} className=" bg-bkg-100 flex flex-col gap-8 px-20 py-10 rounded-xl">
      <div className="flex flex-col gap-5 items-center">
        <Logo/>
        <span className="font-bold text-text-100 font-fredoka">Faça login em sua conta</span>
      </div>
      <div className="flex flex-col items-start gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email"/>
        {!result?.success && result?.error?.email && (
          <span
            data-visible={!!result.error.email?.[0]}
            className="data-[visible='true']:visible invisible text-xs text-destructive font-semibold"
          >
            {result.error.email?.[0]}
          </span>
        )}
      </div>
      <div className="flex flex-col items-start gap-2">
        <Label htmlFor="password">Senha</Label>
        <Input id="password" name="password" type="password"/>
        {!result?.success && result?.error?.password && (
          <span
            data-visible={!!result.error.password?.[0]}
            className="data-[visible='true']:visible invisible text-xs text-destructive font-semibold"
          >
            {result.error.password?.[0]}
          </span>
        )}
        <a className="text-xs cursor-pointer" href="/forgot-password">Esqueceu a senha?</a>
      </div>
      <div className="flex flex-col gap-3">
        <Button disabled={isPending} type="submit">Entrar</Button>
        <Button variant="ghost" disabled={isPending} onClick={() => router.push(ROUTES.SIGN_IN)}>Criar conta</Button>
      </div>
    </form>
  )
}