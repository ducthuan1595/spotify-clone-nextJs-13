"use client";

import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
// import { Song } from '@/types';

import Box from "./box";
import SidebarItem from "./sidebarItem";
import Library from "./library";

interface SidebarProps {
  children: React.ReactNode;
  // songs: Song[]
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const pathname = usePathname();
  const routers = useMemo(
    () => [
      {
        icon: HiHome,
        label: "Home",
        active: pathname !== "/",
        href: "/",
      },
      {
        icon: BiSearch,
        label: "Search",
        active: pathname !== "/search",
        href: "/search",
      },
    ],
    [pathname]
  );

  return (
    <div className="flex h-full">
      <div className="hidden md:flex flex-col flex-y-2 bg-black h-full w-[300px] p-2">
        <Box className="mb-2">
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routers.map((item) => {
              return <SidebarItem key={item.label} {...item} />;
            })}
          </div>
        </Box>
        <Box className="overflow-y-auto h-full">
          <Library />
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto py-2">{children}</main>
    </div>
  );
};

export default Sidebar;
