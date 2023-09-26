'use client';

import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

type Props = { songId: string };

const LikeButton: React.FC<Props> = ({ songId }) => {
  const [isLikedSong, setIsLikedSong] = useState(false);

  const { supabaseClient } = useSessionContext();

  const authModal = useAuthModal();
  const router = useRouter();

  const { user } = useUser();

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from('liked_songs')
        .select('*')
        .eq('user_id', user.id)
        .eq('song_id', songId)
        .single();

      if (!error && data) {
        setIsLikedSong(true);
      }
    };

    fetchData();
  }, [songId, supabaseClient, user]);

  const Icon = isLikedSong ? AiFillHeart : AiOutlineHeart;

  const handleLike = async () => {
    if (!user) {
      return authModal.onOpen();
    }

    if (isLikedSong) {
      const { error } = await supabaseClient
        .from('liked_songs')
        .delete()
        .eq('user_id', user.id)
        .eq('song_id', songId);

      if (error) {
        toast.error(error.message);
      } else {
        setIsLikedSong(false);
      }
    } else {
      const { error } = await supabaseClient.from('liked_songs').insert({
        song_id: songId,
        user_id: user.id,
      });

      if (error) {
        toast.error(error.message);
      } else {
        setIsLikedSong(true);
        toast.success('Liked');
      }
    }

    router.refresh();
  };

  return (
    <button className="hover:opacity-75 transition" onClick={handleLike}>
      <Icon color={isLikedSong ? '#22c55e' : 'white'} size={25} />
    </button>
  );
};

export default LikeButton;
