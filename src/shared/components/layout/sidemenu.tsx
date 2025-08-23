"use client";

import { useLogout } from "@/features/auth/services/mutations";
import { useUserData } from "@/features/auth/services/queries";
import { removeUserInfo, setUserInfo } from "@/features/auth/store/authSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import { ROUTES } from "@/shared/constants";
import { useMediaQuery } from "@/shared/hooks/useMediaQuery";
import { cn } from "@/shared/lib/utils";
import { RootState } from "@/shared/store";
import { BookOpen, Home, LogIn, LogOut, Menu, Trophy, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const MENU_ITENS = [
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

function SidemenuComponent() {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const {
    data: logoutResult,
    isPending: isLogoutPending,
    mutate: logout,
    reset: resetLogout,
  } = useLogout();
  const { data: dataResult, isPending: isDataPending } = useUserData();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const { isDesktop } = useMediaQuery();

  const isAuthenticated = !!(user?.username && user?.avatar && user?.score);
  const disabled = isDataPending || isLogoutPending;

  useEffect(() => {
    if (!isDesktop && isOpen) {
      setIsOpen(false);
    }
  }, [router, isDesktop]);

  useEffect(() => {
    if (isDesktop) {
      setIsOpen(false);
    }
  }, [isDesktop]);

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

    if (!isDesktop) {
      setIsOpen(false);
    }
  };

  const handleMenuItemClick = () => {
    if (!isDesktop) {
      setIsOpen(false);
    }
  };

  if (!isDesktop) {
    return (
      <>
        <div className="fixed top-4 left-4 z-50">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="h-10 w-10 bg-bkg-100 border border-border shadow-lg hover:bg-accent"
          >
            <Menu size={20} />
          </Button>
        </div>

        {isOpen && (
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsOpen(false)} />
        )}

        <div
          className={cn(
            "fixed left-0 top-0 z-50 h-screen bg-bkg-100 border-r border-border flex flex-col shadow-lg transition-transform duration-300 ease-out w-64",
            isOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="p-4 border-b border-border min-h-[88px] flex flex-col justify-start">
            <div className="flex items-center h-8 justify-between">
              <h2 className="text-lg font-fredoka font-semibold text-foreground">Letrino</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8"
              >
                <X size={18} />
              </Button>
            </div>

            {isAuthenticated && user && (
              <div className="mt-4">
                <UserInfo
                  username={user.username}
                  avatar={user.avatar}
                  score={user.score}
                  isOpen={true}
                />
              </div>
            )}
          </div>

          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {MENU_ITENS.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={handleMenuItemClick}
                      className={cn(
                        "flex items-center p-2 rounded-lg transition-colors h-10",
                        "hover:bg-accent hover:text-accent-foreground",
                      )}
                    >
                      <Icon size={18} className="shrink-0" />
                      <span className="ml-3 text-xs font-medium">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="p-4 border-t border-border">
            <Button
              variant="outline"
              className="w-full h-10 justify-start"
              disabled={disabled}
              onClick={handleLogout}
            >
              {isAuthenticated ? (
                <LogOut size={18} className="shrink-0" />
              ) : (
                <LogIn size={18} className="shrink-0" />
              )}
              <span className="ml-2">{isAuthenticated ? "Sair" : "Entrar"}</span>
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <div
      className={cn(
        "fixed left-0 top-0 z-50 h-screen bg-bkg-200 border-r border-border flex flex-col shadow-lg transition-all duration-300 ease-out",
        isOpen ? "w-64" : "w-16",
      )}
    >
      <div className="p-4 border-b border-border min-h-[88px] flex flex-col justify-start">
        <div className="flex items-center h-8">
          <MenuBurguer isOpen={isOpen} setIsOpen={setIsOpen} />

          <div
            className={cn(
              "ml-3 transition-all duration-300 ease-out overflow-hidden",
              isOpen ? "opacity-100 w-auto max-w-none" : "opacity-0 w-0 max-w-0",
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

      <nav className="flex-1 p-2">
        <ul className="space-y-2">
          {MENU_ITENS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  data-active={isActive}
                  aria-current={isActive ? "page" : undefined}
                  onClick={handleMenuItemClick}
                  className={cn(
                    "flex data-[active='true']:text-primary-100 text-primary-200 items-center p-2 rounded-lg transition-colors h-10",
                    "hover:text-primary-100",
                    "focus:bg-accent focus:text-accent-foreground",
                  )}
                >
                  <div
                    className={cn(
                      "flex items-center justify-center bg-primary-300 p-2 rounded-lg",
                      isActive ? "bg-primary-100 text-primary-300" : "bg-bkg-200 text-text-200",
                    )}
                  >
                    <Icon size={18} className="shrink-0" />
                  </div>

                  <span
                    className={cn(
                      "ml-3 text-xs font-medium transition-all duration-300 ease-out whitespace-nowrap overflow-hidden",
                      isOpen ? "visible" : "hidden",
                      isActive ? "text-text-100" : "text-text-200",
                    )}
                  >
                    {item.label}
                  </span>
                </Link>
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
            isOpen ? "justify-start" : "justify-center",
            isAuthenticated &&
              "bg-transparent border border-destructive text-destructive hover:bg-destructive/10",
          )}
          disabled={disabled}
          onClick={handleLogout}
        >
          {isAuthenticated ? (
            <LogOut size={18} className="shrink-0" />
          ) : (
            <LogIn size={18} className="shrink-0" />
          )}
          <span
            className={cn(
              "ml-2 transition-all duration-300 ease-out whitespace-nowrap overflow-hidden",
              isOpen ? "visible w-auto" : "hidden opacity-0 w-0",
            )}
          >
            {isAuthenticated ? "Sair" : "Entrar"}
          </span>
        </Button>
      </div>
    </div>
  );
}

function MenuBurguer({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
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

function UserInfo({
  avatar,
  username,
  score,
  isOpen,
}: {
  username: string;
  avatar: string;
  score: number;
  isOpen?: boolean;
}) {
  return (
    <div className="flex items-center h-8">
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarImage src={avatar} alt={username} />
        <AvatarFallback>-</AvatarFallback>
      </Avatar>
      <div
        className={cn(
          "ml-3 transition-all duration-300 ease-out overflow-hidden",
          isOpen ? "opacity-100 w-auto max-w-none" : "opacity-0 w-0 max-w-0",
        )}
      >
        <p className="text-sm font-medium text-foreground whitespace-nowrap">{username}</p>
        <p className="text-xs text-muted-foreground whitespace-nowrap">{score} pts</p>
      </div>
    </div>
  );
}

export const Sidemenu = memo(SidemenuComponent);
