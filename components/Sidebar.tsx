'use client';

import React, { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import Box from './Box';
import SidebarItem from './SidebarItem';
import SidebarFooter from './SidebarFooter';

type SidebarProps = {
  children: React.ReactNode;
};

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const pathname = usePathname();
  const routes = useMemo(
    () => [
      {
        label: 'Home',
        icon: HiHome,
        active: pathname !== '/search',
        href: '/',
      },
      {
        label: 'Search',
        icon: BiSearch,
        active: pathname === '/search',
        href: '/search',
      },
    ],
    [pathname]
  );
  return (
    <div className="flex h-full">
      <div className="hidden md:flex w-[300px] h-full flex-col bg-black gap-y-2 p-2">
        <Box className="flex flex-col gap-y-4 px-5 py-4">
          {routes.map((route) => (
            <SidebarItem key={route.label} {...route} />
          ))}
        </Box>
        <Box className="h-full overflow-y-auto px-5 py-4">
          The Playlist
          <SidebarFooter />
        </Box>
      </div>
      <main className="h-full overscroll-y-auto flex-1 py-2">{children}</main>
    </div>
  );
};

export default Sidebar;
