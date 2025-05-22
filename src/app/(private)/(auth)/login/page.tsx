"use client"

import { Logo } from "@/shared/components/layout/Logo"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"

export default function LoginPage() {
  
  return (
    <form className=" bg-bkg-100 flex flex-col gap-8 px-20 py-10 rounded-xl">
      <div className="flex flex-col gap-5 items-center">
        <Logo/>
        <span className="font-bold text-text-100 font-fredoka">Faça login em sua conta</span>
      </div>
      <div className="flex flex-col items-start gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email"/>
      </div>
      <div className="flex flex-col items-start gap-2">
        <Label htmlFor="password">Senha</Label>
        <Input id="password" type="password"/>
        <a className="text-xs cursor-pointer" href="/forgot-password">Esqueceu a senha?</a>
      </div>
      <Button type="submit">Entrar</Button>
    </form>
  )
}