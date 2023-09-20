'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { BiSearch } from 'react-icons/bi';
import { HiHome } from 'react-icons/hi';
import { RxCaretRight, RxCaretLeft } from 'react-icons/rx';
import { twMerge } from 'tailwind-merge';
import Button from './Button';
import useAuthModal from '@/hooks/useAuthModal';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useUser } from '@/hooks/useUser';
import { FaUserAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';

type HeaderProps = {
  children?: React.ReactNode;
  className?: string;
};

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  const { user } = useUser();
  const { onOpen } = useAuthModal();

  const handleLogOut = async () => {
    const { error } = await supabaseClient.auth.signOut();
    //TODO: reset any playing song
    router.refresh();

    if (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className={twMerge(
        'h-fit bg-gradient-to-b from-emerald-800 p-6',
        className
      )}
    >
      <div className="flex justify-between items-center w-full mb-4">
        {/* Right and Left button on large screen */}
        <div className="hidden md:flex items-center gap-x-2">
          <button
            className="bg-neutral-900 rounded-full p-2 hover:opacity-75 transition"
            onClick={() => router.back()}
          >
            <RxCaretLeft className="text-white" size={35} />
          </button>

          <button
            className="bg-neutral-900 rounded-full p-2 hover:opacity-75 transition"
            onClick={() => router.forward()}
          >
            <RxCaretRight className="text-white" size={35} />
          </button>
        </div>

        {/* Home and Search button when on small screen */}
        <div className="flex md:hidden items-center gap-x-2">
          <button className="bg-white rounded-full p-2  hover:opacity-75 transition">
            <HiHome className="text-black" size={20} />
          </button>

          <button className="bg-white rounded-full p-2 hover:opacity-75 transition">
            <BiSearch className="text-black" size={20} />
          </button>
        </div>

        {/* Signup and Login button */}
        <div className="flex justify-between items-center gap-x-4">
          {user ? (
            <div className="flex justify-between items-center gap-x-4">
              <Button onClick={handleLogOut} className="bg-white px-6 py-2">
                Logout
              </Button>
              <Button
                onClick={() => router.push('/account')}
                className="bg-white "
              >
                <FaUserAlt />
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Button
                  className="font-medium text-neutral-300 bg-transparent"
                  onClick={onOpen}
                >
                  Sign Up
                </Button>
              </div>
              <div>
                <Button className="px-6 py-2 bg-white" onClick={onOpen}>
                  Login
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
