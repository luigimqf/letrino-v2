"use client";

import { useEffect, useState } from "react";
import { Home, User, Settings, Menu, X, LogIn, LogOut, Trophy, BookOpen } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/shared/store";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/shared/constants";
import { useLogout } from "@/features/auth/services/mutations";
import { toast } from "sonner";
import { useUserData } from "@/features/auth/services/queries";
import { removeUserInfo, setUserInfo } from "@/features/auth/store/authSlice";

const menuItems = [
    {
        icon: Home,
        label: "Home",
        href: ROUTES.HOME,
    },
    {
        icon: Trophy,
        label: "Leaderboard",
        href: ROUTES.LEADERBOARD,
    },
    {
        icon: BookOpen,
        label: "Tutorial",
        href: ROUTES.TUTORIAL,
    },
];

export function Sidemenu() {
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const { data: logoutResult, isPending: isLogoutPending, mutate: logout, reset: resetLogout } = useLogout();
    const { data: dataResult, isPending: isDataPending } = useUserData();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const isAuthenticated = !!(user?.username && user?.avatar && user?.score);
    const disabled = isDataPending || isLogoutPending;

    useEffect(() => {
        if (dataResult?.success && dataResult.data) {
            dispatch(setUserInfo(dataResult.data));
        }
    }, [dataResult, dispatch]);

    useEffect(() => {
        if (logoutResult?.success) {
            dispatch(removeUserInfo());
            resetLogout();
            router.push(ROUTES.HOME);
            toast("Logout realizado com sucesso", { duration: 1500 });
            return;
        }

        if (logoutResult && !logoutResult.success) {
            toast("Erro durante o logout", { duration: 1500 });
            resetLogout();
        }
    }, [logoutResult, dispatch, router, resetLogout]);

    const handleLogout = () => {
        if (isAuthenticated) {
            logout();
        } else {
            router.push(ROUTES.SIGN_IN);
        }
    };

    return (
        <div
            className={cn(
                "fixed left-0 top-0 z-50 h-screen bg-bkg-100 border-r border-border flex flex-col shadow-lg transition-all duration-300 ease-out",
                isOpen ? "w-64" : "w-16"
            )}
        >
            <div className="p-4 border-b border-border min-h-[88px] flex flex-col justify-start">
                <div className="flex items-center h-8">
                    <MenuBurguer isOpen={isOpen} setIsOpen={setIsOpen} />

                    <div
                        className={cn(
                            "ml-3 transition-all duration-300 ease-out overflow-hidden",
                            isOpen ? "opacity-100 w-auto max-w-none" : "opacity-0 w-0 max-w-0"
                        )}
                    >
                        <h2 className="text-lg font-fredoka font-semibold text-foreground whitespace-nowrap">
                            Letrino
                        </h2>
                    </div>
                </div>

                {isAuthenticated && user && (
                    <div className="mt-4">
                        <UserInfo 
                            username={user.username} 
                            avatar={user.avatar} 
                            score={user.score} 
                            isOpen={isOpen}
                        />
                    </div>
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
                                        "flex items-center p-2 rounded-lg transition-colors h-10",
                                        "hover:bg-accent hover:text-accent-foreground",
                                        "focus:bg-accent focus:text-accent-foreground"
                                    )}
                                >
                                    <Icon size={20} className="shrink-0" />

                                    <span
                                        className={cn(
                                            "ml-3 text-sm font-medium transition-all duration-300 ease-out whitespace-nowrap overflow-hidden",
                                            isOpen ? "opacity-100 w-auto max-w-none" : "opacity-0 w-0 max-w-0"
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

            <div className="p-4 border-t border-border">
                <Button 
                    variant="outline" 
                    className={cn(
                        "w-full h-10 transition-all duration-300 ease-out",
                        isOpen ? "justify-start" : "justify-center"
                    )}
                    disabled={disabled}
                    onClick={handleLogout}
                >
                    <div className="flex items-center w-full">
                        {isAuthenticated ? <LogOut size={18} className="shrink-0" /> : <LogIn size={18} className="shrink-0" />}
                        <span
                            className={cn(
                                "ml-2 transition-all duration-300 ease-out whitespace-nowrap overflow-hidden",
                                isOpen ? "opacity-100 w-auto" : "opacity-0 w-0"
                            )}
                        >
                            {isAuthenticated ? "Sair" : "Entrar"}
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
            className="h-8 w-8 shrink-0"
        >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
        </Button>
    );
}

function UserInfo({ avatar, username, score, isOpen }: { username: string; avatar: string; score: number, isOpen?: boolean }) {
    return (
        <div className="flex items-center h-8">
            <Avatar className="h-8 w-8 shrink-0">
                <AvatarImage src={avatar} alt={username} />
                <AvatarFallback>-</AvatarFallback>
            </Avatar>
            <div 
                className={cn(
                    "ml-3 transition-all duration-300 ease-out overflow-hidden",
                    isOpen ? "opacity-100 w-auto max-w-none" : "opacity-0 w-0 max-w-0"
                )}
            >
                <p className="text-sm font-medium text-foreground whitespace-nowrap">{username}</p>
                <p className="text-xs text-muted-foreground whitespace-nowrap">{score} pts</p>
            </div>
        </div>
    );
}