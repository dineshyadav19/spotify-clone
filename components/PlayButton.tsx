import React from 'react';
import { FaPlay } from 'react-icons/fa';

type Props = {};

const PlayButton = (props: Props) => {
  return (
    <button className="transition bg-green-500 opacity-0 rounded-full flex items-center p-4 drop-shadow-md translate translate-y-1/4 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110">
      <FaPlay className="text-black" />
    </button>
  );
};

export default PlayButton;
