'use client';

import React from 'react';
import Modal from './Modal';

type Props = {};

const AuthModal = () => {
  return (
    <Modal
      title="Welcome back"
      description="Login to your account"
      isOpen
      onChange={() => {}}
    >
      Auth Modal
    </Modal>
  );
};

export default AuthModal;
