import Link from 'next/link';
import React from 'react';
import { IconType } from 'react-icons';
import { twMerge } from 'tailwind-merge';

type SidebarItemProps = {
  label: string;
  icon: IconType;
  active: boolean;
  href: string;
};

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  icon: Icon,
  active,
  href,
}) => {
  return (
    <Link
      href={href}
      className={twMerge(
        'flex gap-x-4 items-center text-base font-medium cursor-pointer hover:text-white  transition py-1',
        active ? 'text-white' : 'text-neutral-400'
      )}
    >
      <Icon size={26} />
      <p className="truncate w-full">{label}</p>
    </Link>
  );
};

export default SidebarItem;
