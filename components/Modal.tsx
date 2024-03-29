import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { IoMdClose } from 'react-icons/io';

type ModalProps = {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  children,
  description,
  onChange,
  title,
}) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onChange} defaultOpen={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-neurtal-900/90 backdrop-blur-sm fixed inset-0" />

        <Dialog.Content
          className="
          fixed 
          drop-shadow-md 
          border-neutral-700 
          border 
          top-[50%] 
          left-[50%] 
          h-full 
          w-full 
          max-h-full 
          md:h-auto 
          md:max-h-[85vh] 
          md:w-[90vw] 
          md:max-w-[450px]
          translate-x-[-50%]
          translate-y-[-50%]
          rounded-md
          bg-neutral-800
          p-[25px]
          focus:outline-none 
        "
        >
          <Dialog.Title className="text-xl font-bold text-center mb-4">
            {title}
          </Dialog.Title>
          <Dialog.Description className="text-sm mb-5 leading-normal text-center">
            {description}
          </Dialog.Description>
          <div>{children}</div>

          <Dialog.Close asChild>
            <button
              className="
                text-neutral-400
                hover:text-white
                absolute
                top-[10px]
                right-[10px]
                h-[25px]
                w-[25px]
                appearance-none
                inline-flex
                items-center
                justify-center
                rounded-full
                focus:outline-none
              "
            >
              <IoMdClose />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
