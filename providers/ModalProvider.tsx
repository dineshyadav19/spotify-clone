'use client';

import Modal from '@/components/Modal';
import React, { useEffect, useState } from 'react';

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;

  return (
    <>
      <Modal
        title="Modal"
        description="test modal"
        isOpen
        onChange={() => setIsMounted(true)}
      >
        Test Modal
      </Modal>
    </>
  );
};

export default ModalProvider;
