'use client';

import React, { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import Box from '../Box';
import SidebarItem from './SidebarItem';
import SidebarFooter from './SidebarFooter';
import Library from './Library';
import { Song } from '@/types';
import { twMerge } from 'tailwind-merge';
import usePlayer from '@/hooks/usePlayer';

type SidebarProps = {
  children: React.ReactNode;
  songs: Song[];
};

const Sidebar: React.FC<SidebarProps> = ({ children, songs }) => {
  const player = usePlayer();
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
    <div
      className={twMerge(
        'flex',
        player.activeId ? 'h-[calc(100%-80px)]' : 'h-full'
      )}
    >
      <div className="hidden md:flex w-[300px] h-full flex-col bg-black gap-y-2 p-2">
        <Box className="flex flex-col gap-y-4 px-5 py-4">
          {routes.map((route) => (
            <SidebarItem key={route.label} {...route} />
          ))}
        </Box>
        <Box className="h-full overflow-y-auto">
          <Library songs={songs} />
        </Box>
      </div>
      <main className="h-full overscroll-y-auto flex-1 py-2 px-2 md:pl-0">
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
