'use client';

import LikeButton from '@/components/LikeButton';
import MediaItem from '@/components/MediaItem';
import SongItem from '@/components/SongItem';
import useOnPlay from '@/hooks/useOnPlay';
import { useUser } from '@/hooks/useUser';
import { Song } from '@/types';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

type Props = {
  songs: Song[];
};

const LikedContent: React.FC<Props> = ({ songs }) => {
  const router = useRouter();
  const { isLoading, user } = useUser();
  const onPlay = useOnPlay(songs);
  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/');
    }
  }, [isLoading, router, user]);

  if (songs.length)
    return (
      <div className="flex flex-col gap-y-2 w-full p-6">
        LikedContent
        {songs.map((song) => (
          <div className="flex items-center gap-x-4 w-full" key={song.id}>
            <div className="flex-1">
              <MediaItem data={song} onClick={(id) => onPlay(id)} />
            </div>
            <LikeButton songId={song.id} />
          </div>
        ))}
      </div>
    );

  return (
    <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
      No liked songs
    </div>
  );
};

export default LikedContent;
