import useLoadImage from '@/hooks/useLoadImage';
import { Song } from '@/types';
import Image from 'next/image';
import React from 'react';
import PlayButton from './PlayButton';

type Props = {
  data: Song;
  onClick: (id: string) => void;
};

const SongItem: React.FC<Props> = ({ data, onClick }) => {
  const imagePath = useLoadImage(data);
  return (
    <div
      onClick={() => onClick(data.id)}
      className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 cursor-pointer transition p-3 bg-neutral-400/5 hover:bg-neutral-400/10"
    >
      <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
        <Image src={imagePath as string} alt={data.title} fill />
      </div>

      <div className="flex flex-col items-start gap-y-1 mt-4 w-full">
        <p className="font-semibold truncate w-full">{data.title}</p>
        <p className="text-sm pb-4 text-neutral-400 w-full truncate">
          By {data.author}
        </p>
      </div>

      <div className="absolute bottom-24 right-5">
        <PlayButton />
      </div>
    </div>
  );
};

export default SongItem;
