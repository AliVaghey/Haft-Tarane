"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo/logo-red.png";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/use-user";
import { routes } from "@/routes/routes";
import { usePathname, useRouter } from "next/navigation";
import { X } from "lucide-react";
// import { Bars3Icon, BeakerIcon, XMarkIcon } from "@heroicons/react/24/solid";

export default function Nav() {
  const pathname = usePathname();

  const router = useRouter();

  const userHook = useUser();

  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1111);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // change the color
  const [scrollBackground, setScrollBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 20) {
        setScrollBackground(true);
      } else {
        setScrollBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const pannelLink = () => {
    if (userHook.userData.access_type === "superadmin") {
      return routes.superadmin.dashboard;
    } else if (userHook.userData.access_type === "admin") {
      return routes.admin.dashboard;
    } else if (userHook.userData.access_type === "agency") {
      return routes.agency.dashboard;
    } else if (userHook.userData.access_type === "user") {
      return routes.user.dashboard;
    } else {
      return routes.auth.signIn;
    }
  };

  return (
    <div
      className={`fixed top-0 z-[999] w-full !bg-yellow-primary bg-transparent transition-all duration-500 ${scrollBackground ? "z-[9999] bg-yellow-primary" : "bg-transparent"}`}
    >
      <div className="mx-auto shadow-lg">
        <div className="flex h-full items-center justify-between px-5 py-2 md:px-10 lg:px-16">
          <div className="flex items-center justify-between gap-9">
            <Link href="/">
              <Image
                src={logo}
                alt="alt"
                width={260}
                height={160}
                className="h-14 w-28"
              />
            </Link>
            {!isMobile && (
              <>
                <Link href="/">
                  <p className="text-xl">خانه</p>
                </Link>
                <Link href="/flights">
                  <p className="text-xl">پرواز</p>
                </Link>
                <Link href="/trains">
                  <p className="text-xl">قطار</p>
                </Link>
                <Link href="/tours">
                  <p className="text-xl">تور</p>
                </Link>
                <Link href="/hotels">
                  <p className="text-xl">هتل</p>
                </Link>
                <Link href="/nature">
                  <p className="text-xl">طبیعت گردی</p>
                </Link>
              </>
            )}
          </div>
          <div className="flex items-center gap-4">
            {isMobile ? (
              <button onClick={toggleMenu} className="text-gray-dark">
                {menuOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                )}
              </button>
            ) : (
              <>
                <Link href="/about">
                  <Button
                    variant="outline"
                    className="rounded-xl border border-gray-dark text-gray-dark hover:text-yellow-primary"
                  >
                    ارتباط با ما
                  </Button>
                </Link>
                <Link href={pannelLink()}>
                  <Button
                    variant="outline"
                    className="rounded-xl border border-gray-dark bg-gray-dark text-white hover:bg-gray-dark hover:text-yellow-primary"
                  >
                    {userHook.userData ? "پنل کاربری" : " ورود یا ثبت نام"}
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      {isMobile && menuOpen && (
        <div className="mx-auto mt-4 flex w-full flex-col gap-4 p-5 shadow-lg">
          <Link href="/">
            <p className="text-xl">خانه</p>
          </Link>
          <Link href="/flights">
            <p className="text-xl">پرواز</p>
          </Link>
          <Link href="/trains">
            <p className="text-xl">قطار</p>
          </Link>
          <Link href="/tours">
            <p className="text-xl">تور</p>
          </Link>
          <Link href="/hotels">
            <p className="text-xl">هتل</p>
          </Link>
          <Link href="/nature">
            <p className="text-xl">طبیعت گردی</p>
          </Link>
          <Link href="/about">
            <Button
              variant="outline"
              className="rounded-xl border border-gray-dark text-gray-dark hover:text-yellow-primary"
            >
              ارتباط با ما
            </Button>
          </Link>

          <Link href="/auth/sign-in">
            <Button
              variant="outline"
              className="rounded-xl border border-gray-dark bg-gray-dark text-white hover:bg-gray-dark hover:text-yellow-primary"
            >
              ورود یا ثبت نام
            </Button>
          </Link>
        </div>
      )}
      {(pathname === "/fa" ||
        pathname === "/en" ||
        pathname === "/fa-ir" ||
        pathname === "/en-us") && (
        <div className="flex flex-col gap-1 p-1.5 text-xs">
          {userHook.banners.map((banner, bannerIndex) =>
            banner.link ? (
              <div
                key={bannerIndex}
                className="flex w-full cursor-pointer items-center justify-between rounded-sm pl-2 shadow-md"
                style={{
                  backgroundColor: banner.background_color,
                  color: banner.text_color,
                }}
              >
                <Link href={banner.link} className="flex-1 px-2 py-1">
                  {banner.description}
                </Link>
                <X
                  onClick={() =>
                    userHook.setBanners(
                      userHook.banners.filter(
                        (filterItem, filterIndex) =>
                          filterIndex !== bannerIndex,
                      ),
                    )
                  }
                  className="cursor-pointer text-black"
                  size={16}
                  strokeWidth={1}
                />
              </div>
            ) : (
              <div
                key={bannerIndex}
                className="flex w-full items-center justify-between rounded-sm px-2 py-1 shadow-md"
                style={{
                  backgroundColor: banner.background_color,
                  color: banner.text_color,
                }}
              >
                <span>{banner.description}</span>
                <X
                  onClick={() =>
                    userHook.setBanners(
                      userHook.banners.filter(
                        (filterItem, filterIndex) =>
                          filterIndex !== bannerIndex,
                      ),
                    )
                  }
                  className="cursor-pointer text-black"
                  size={16}
                  strokeWidth={1}
                />
              </div>
            ),
          )}
        </div>
      )}
    </div>
  );
}
