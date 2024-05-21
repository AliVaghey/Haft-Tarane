"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navItems } from "@/components/admin-layout/nav-items";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ChevronDown,
  CircleUserRound,
  ChevronLeft,
  LogOut,
} from "lucide-react";
import BreadcrumbComponent from "@/components/breadcrumb";
import { ChevronRight } from "lucide-react";
import { useDictionary } from "@/providers/dictionary-provider";
import { useUser } from "@/hooks/use-user";
import { CSRFToken, axios } from "@/lib/axios";
import { routes } from "@/routes/routes";
import { toast } from "sonner";

const Header = () => {
  const dictionary = useDictionary();

  const userHook = useUser();

  const router = useRouter();
  const pathname = usePathname();

  const sheetRef = useRef(null);

  const [activeMenu, setActiveMenu] = useState(null);
  const [navbar, setNavbar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const changeActiveMenu = (index) => {
    activeMenu === index ? setActiveMenu(null) : setActiveMenu(index);
  };

  useEffect(() => {
    sheetRef?.current?.click();
  }, [pathname]);

  const changeNavBg = () => {
    if (window.scrollY > 80) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", changeNavBg);
  }

  const signOut = async () => {
    setIsLoading(true);

    await CSRFToken();

    const fetchData = () => {
      return new Promise(async (resolve) => {
        await axios.post("/logout").finally(() => {
          resolve("خارج شدید");
        });
      });
    };

    toast.promise(fetchData, {
      loading: "در حال خروج...",
      success: () => {
        router.push(routes.auth.signIn);
        return "خارج شدید";
      },
      error: "Error",
    });
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex h-14 items-center gap-4 bg-transparent px-4 transition-all duration-300 lg:h-[60px] lg:px-6",
        navbar && "mx-2 rounded-2xl bg-primary shadow-lg",
      )}
    >
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="icon"
            className="shrink-0 bg-red-primary text-white hover:bg-red-dark md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="flex flex-col bg-primary p-1 px-2"
        >
          <ScrollArea
            dir={dictionary["language"] === "en" ? "ltr" : "rtl"}
            className="mt-5 flex-1 overflow-y-auto"
          >
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {navItems.map((item, index) => (
                <div
                  key={index}
                  className={cn("my-1", item.type === "text" && "mt-3")}
                >
                  {item.type === "link" && (
                    <Link
                      key={index}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg bg-yellow-light p-2 hover:bg-white",
                        pathname.endsWith(item.href) && "bg-white",
                      )}
                      onClick={() => {
                        console.log("first");
                      }}
                    >
                      {item?.icon(18, 1.5)}
                      {item.title}
                      {item.quantity && (
                        <Badge className="mr-auto flex shrink-0 items-center justify-center rounded-full pt-1">
                          {farsiNumber(item.quantity)}
                        </Badge>
                      )}
                    </Link>
                  )}

                  {item.type === "text" && (
                    <span className="px-2 text-xs text-muted-foreground/60">
                      {item.title}
                    </span>
                  )}

                  {item.type === "subMenu" && (
                    <div>
                      <div
                        onClick={() => changeActiveMenu(index)}
                        className={cn(
                          "flex cursor-pointer items-center gap-3 rounded-lg bg-yellow-light p-2 hover:bg-white",
                          activeMenu === index && "bg-white",
                        )}
                      >
                        <span className="text-xs">{item.icon()}</span>
                        <div className="relative flex w-full items-center justify-between">
                          <span>{item.title}</span>
                          {item.subMenu.length !== 0 && (
                            <span>
                              {dictionary["language"] === "en" ? (
                                <ChevronRight
                                  size={18}
                                  strokeWidth={1.5}
                                  className={cn(
                                    "transition-all duration-300",
                                    activeMenu === index && "rotate-90",
                                  )}
                                />
                              ) : (
                                <ChevronLeft
                                  size={18}
                                  strokeWidth={1.5}
                                  className={cn(
                                    "transition-all duration-300",
                                    activeMenu === index && "-rotate-90",
                                  )}
                                />
                              )}
                            </span>
                          )}
                        </div>
                      </div>

                      <div
                        className={cn(
                          "text-paragraph mr-4  flex max-h-0 flex-col gap-y-2 overflow-hidden text-xs font-normal opacity-50 transition-all duration-300",
                          activeMenu === index && "mt-2 max-h-40 opacity-100",
                        )}
                      >
                        {item.subMenu.map((subMenuItem, subMenuIndex) => (
                          <Link
                            key={subMenuIndex}
                            href={subMenuItem.href}
                            className={cn(
                              "flex items-center gap-x-2 rounded-lg bg-yellow-light p-2 transition-all duration-300 hover:bg-white",
                              pathname.endsWith(subMenuItem.href) && "bg-white",
                            )}
                          >
                            <span>{subMenuItem.icon()}</span>
                            <span>{subMenuItem.title}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </ScrollArea>
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
        <BreadcrumbComponent />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="flex items-center justify-center gap-2 bg-red-primary text-white hover:bg-red-dark">
            <CircleUserRound size={24} />
            <span>{userHook?.userData?.username}</span>
            <ChevronDown size={20} strokeWidth={3} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="flex w-full flex-col rtl:items-end"
        >
          <DropdownMenuLabel>اکانت من</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="w-full">
            <div className="w-full rtl:text-right">
              <Link href={"#"}>تنظیمات</Link>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="w-full cursor-pointer">
            <div className="w-full rtl:text-right">پشتیبانی</div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {}}
            className="w-full cursor-pointer"
          >
            <div
              className="flex w-full items-center gap-x-2 rtl:justify-end"
              onClick={signOut}
            >
              <LogOut size={14} strokeWidth={1.5} className="rtl:rotate-180" />
              <span>خروج</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;
