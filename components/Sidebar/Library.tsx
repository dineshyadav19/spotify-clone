import React from 'react';
import { TbPlaylist } from 'react-icons/tb';
import { AiOutlinePlus } from 'react-icons/ai';
import { useUser } from '@/hooks/useUser';
import useAuthModal from '@/hooks/useAuthModal';
import useUploadModal from '@/hooks/useUploadModal';

type LibraryProps = {};

const Library: React.FC<LibraryProps> = () => {
  const uploadModal = useUploadModal();
  const authModal = useAuthModal();
  const { user } = useUser();

  const handleOnClick = () => {
    if (!user) {
      return authModal.onOpen();
    }

    //TODO: check for subscription

    return uploadModal.onOpen();
  };

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex justify-between items-center px-5 pt-4">
        <div className="inline-flex items-center gap-x-2 text-neutral-400 hover:text-white transition cursor-pointer group">
          <TbPlaylist size={26} />
          <p className="font-medium text-base cursor-pointer">Your Library</p>
        </div>

        <AiOutlinePlus
          className="text-neutral-400 hover:text-white transition cursor-pointer"
          size={20}
          onClick={handleOnClick}
        />
      </div>
    </div>
  );
};

export default Library;
