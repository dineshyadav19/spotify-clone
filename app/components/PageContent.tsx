'use client';

import SongItem from '@/components/SongItem';
import { Song } from '@/types';
import React from 'react';

type Props = {
  songs: Song[];
};

const PageContent: React.FC<Props> = ({ songs }) => {
  if (songs.length === 0) {
    return <div className="mt-4 text-neutral-400">No songs available.</div>;
  }

  return (
    <div className="grid gap-4 mt-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8">
      {songs.map((song) => (
        <SongItem data={song} onClick={() => {}} key={song.id} />
      ))}
    </div>
  );
};

export default PageContent;
