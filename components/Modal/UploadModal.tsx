import React, { useState } from 'react';
import Modal from '../Modal';
import useUploadModal from '@/hooks/useUploadModal';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import Input from '../Input';
import Button from '../Button';
import toast from 'react-hot-toast';
import { useUser } from '@/hooks/useUser';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import uniqid from 'uniqid';
import { useRouter } from 'next/navigation';

const UploadModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onClose } = useUploadModal();
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      author: '',
      title: '',
      song: null,
      image: null,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];
      const uniqId = uniqid();

      if (!imageFile || !songFile || !user) {
        toast.error('Missing Fields');
        return;
      }

      //Upload song
      const { data: songData, error: songError } = await supabaseClient.storage
        .from('songs')
        .upload(`song-${values.title}-${uniqId}`, songFile, {
          cacheControl: '3600',
          upsert: false,
        });

      if (songError) {
        setIsLoading(false);
        return toast.error('Failed song upload');
      }

      //Upload Image
      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from('images')
          .upload(`image-${values.title}-${uniqId}`, imageFile, {
            cacheControl: '3600',
            upsert: false,
          });

      if (imageError) {
        setIsLoading(false);
        return toast.error('Failed image upload');
      }

      const { error: supabaseError } = await supabaseClient
        .from('songs')
        .insert({
          user_id: user.id,
          title: values.title,
          author: values.author,
          image_path: imageData.path,
          song_path: songData.path,
        });

      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }

      router.refresh();
      setIsLoading(false);
      toast.success('Song created!');
      reset();
      onClose();
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      title="Add Music to your library"
      description="Upload an MP3 File"
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          id="title"
          disabled={isLoading}
          type="text"
          placeholder="Song title"
          {...register('title', { required: true })}
        />
        <Input
          id="author"
          type="text"
          disabled={isLoading}
          placeholder="Song author"
          {...register('author', { required: true })}
        />

        <div>
          <p className="mb-1">Select a song file</p>
          <Input
            id="song"
            type="file"
            disabled={isLoading}
            placeholder=""
            accept=".mp3"
            {...register('song', { required: true })}
          />
        </div>

        <div>
          <p className="mb-1">Select a song image</p>
          <Input
            id="image"
            type="file"
            disabled={isLoading}
            placeholder=""
            accept="image/*"
            {...register('image', { required: true })}
          />
        </div>

        <Button disabled={isLoading} type="submit">
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
