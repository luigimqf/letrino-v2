"use client";

import { useState } from "react";
import { Home, User, Settings, Menu, X, LogIn, LogOut, Trophy, BookOpen } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { useSelector } from "react-redux";
import { RootState } from "@/shared/store";

const menuItems = [
	{
		icon: Home,
		label: "Home",
		href: "/",
	},
	{
		icon: Trophy,
		label: "Leaderboard",
		href: "/leaderboard",
	},
	{
		icon: BookOpen,
		label: "Tutorial",
		href: "/tutorial",
	},
];

export function Sidemenu() {
	const { user } = useSelector((state: RootState) => state.auth);
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div
			className={cn(
				"fixed left-0 top-0 z-50 h-screen bg-bkg-100 border-r border-border flex flex-col shadow-lg transition-all duration-300 ease-out",
				isOpen ? "w-64" : "w-16"
			)}
		>
			<div className="p-4 border-b border-border">
				<div className="flex items-center justify-between">
          <MenuBurguer isOpen={isOpen} setIsOpen={setIsOpen} />

					<div
						className={cn(
							"ml-3 transition-all duration-300 ease-out",
							isOpen ? "opacity-100 translate-x-0 w-auto" : "opacity-0 -translate-x-2 w-0"
						)}
					>
						<h2 className="text-lg font-fredoka font-semibold text-foreground whitespace-nowrap">
							Letrino
						</h2>
					</div>
				</div>

				{user.username && (
          <UserInfo username={user.username} avatar={user.avatar} score={user.score} />
				)}
			</div>

			<nav className="flex-1 p-4">
				<ul className="space-y-2">
					{menuItems.map((item) => {
						const Icon = item.icon;
						return (
							<li key={item.href}>
								<a
									href={item.href}
									className={cn(
										"flex items-center p-2 rounded-lg transition-colors",
										"hover:bg-accent hover:text-accent-foreground",
										"focus:bg-accent focus:text-accent-foreground"
									)}
								>
									<Icon size={20} className="shrink-0" />

									<span
										className={cn(
											"ml-3 text-sm font-medium truncate transition-all duration-300 ease-out whitespace-nowrap",
											isOpen ? "opacity-100 translate-x-0 w-auto" : "opacity-0 -translate-x-2 w-0"
										)}
									>
										{item.label}
									</span>
								</a>
							</li>
						);
					})}
				</ul>
			</nav>

			<div className="p-4 border-t border-border space-y-3">
				<Button variant="outline" className="w-full justify-start">
					<div className="flex items-center w-full">
						{user.username ? <LogOut size={18} className="shrink-0" /> : <LogIn size={18} className="shrink-0" />}
						<span
							className={cn(
								"ml-2 transition-all duration-300 ease-out whitespace-nowrap",
								isOpen ? "opacity-100 translate-x-0 w-auto" : "opacity-0 -translate-x-2 w-0"
							)}
						>
							{user.username ? "Sair" : "Entrar"}
						</span>
					</div>
				</Button>
			</div>
		</div>
	);
}

function MenuBurguer({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (open: boolean) => void }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setIsOpen(!isOpen)}
      className="h-8 w-8"
    >
      {isOpen ? <X size={18} /> : <Menu size={18} />}
    </Button>
  );
}

function UserInfo({ avatar, username, score }:  { username: string; avatar: string; score: number }) {
  return (
    <div className="flex items-center">
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarImage src={avatar} alt={username} />
        <AvatarFallback>-</AvatarFallback>
      </Avatar>
      <div className="ml-3">
        <p className="text-sm font-medium text-foreground">{username}</p>
        <p className="text-xs text-muted-foreground">{score} pts</p>
      </div>
    </div>
  );
}