import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaPlay } from 'react-icons/fa';

type ListItemProps = {
  image: string;
  href: string;
  name: string;
};

const ListItem: React.FC<ListItemProps> = ({ image, href, name }) => {
  const router = useRouter();

  const onClick = () => {
    router.push(href);
  };
  return (
    <button
      onClick={onClick}
      className="relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4"
    >
      <div className="relative min-h-[64px] min-w-[64px]">
        <Image src={image} alt="" fill className="object-cover" />
      </div>
      <p className="truncate font-medium py-5">{name}</p>
      <div className="absolute right-5 transition opacity-0 group-hover:opacity-100 flex justify-center items-center p-4 bg-green-500 rounded-full hover:scale-110 drop-shadow-md">
        <FaPlay className="text-black" />
      </div>
    </button>
  );
};

export default ListItem;
