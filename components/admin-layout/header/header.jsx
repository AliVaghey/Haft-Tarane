"use client";

import Link from "next/link";
import { CircleUser, Menu, Search, ShoppingCart } from "lucide-react";
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
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
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

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const sheetRef = useRef(null);

  const [activeMenu, setActiveMenu] = useState(null);

  const changeActiveMenu = (index) => {
    activeMenu === index ? setActiveMenu(null) : setActiveMenu(index);
  };

  useEffect(() => {
    sheetRef?.current?.click();
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 flex h-14 items-center gap-4 bg-transparent px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="flex flex-col p-1 px-2">
          <ScrollArea dir="rtl">
            <SheetClose ref={sheetRef} className="hidden" />
            <nav className="grid items-start px-0 text-sm font-medium lg:px-4">
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
                        "flex items-center gap-3 rounded-lg rounded-r-none px-2 py-2 text-muted-foreground transition-all hover:text-primary",
                        pathname === item.href &&
                          "border-r-4 border-r-primary text-primary",
                      )}
                    >
                      {item?.icon(18, 1.5)}
                      {item.title}
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
                          "text-paragraph relative flex cursor-pointer items-center gap-x-3 px-5 py-2 text-sm font-medium",
                          "border-r-4 border-r-card transition-all duration-200 hover:text-primary",
                          activeMenu === index &&
                            "border-r-4 border-r-primary text-primary",
                        )}
                      >
                        <span className="text-xs">{item.icon()}</span>
                        <div className="relative flex w-full items-center justify-between">
                          <span>{item.title}</span>
                          {item.subMenu.length !== 0 && (
                            <span>
                              <ChevronLeft
                                size={18}
                                strokeWidth={1.5}
                                className={cn(
                                  "transition-all duration-300",
                                  activeMenu === index && "-rotate-90",
                                )}
                              />
                            </span>
                          )}
                        </div>
                      </div>

                      <div
                        className={cn(
                          "text-paragraph flex max-h-0 flex-col gap-y-2 overflow-hidden text-xs font-normal opacity-50 transition-all duration-300",
                          activeMenu === index && "max-h-40 opacity-100",
                        )}
                      >
                        {item.subMenu.map((subMenuItem, subMenuIndex) => (
                          <Link
                            key={subMenuIndex}
                            href={subMenuItem.href}
                            className={cn(
                              "flex items-center gap-x-2 py-2 pr-7 transition-all duration-300 hover:text-primary",
                              pathname === subMenuItem.href && "text-primary",
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
            <span>آرمین افشار</span>
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
          <DropdownMenuItem className="w-full">
            <div className="w-full rtl:text-right">پشتیبانی</div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => {}} className="w-full">
            <div className="flex w-full items-center gap-x-2 rtl:justify-end">
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
