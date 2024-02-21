import React from 'react';
import { Modal,Button } from 'antd';

const ConfirmationModal = ({ isOpen, message, onClose, onConfirm }) => {
  return (
    <Modal 
      open={isOpen}
      
      onCancel={onClose}
      footer={[
        <Button  className='mr-4' key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="confirm" onClick={onConfirm}>
          Confirm
        </Button>,
      ]}
    >
      <p>{message}</p>
      
    </Modal>
  );
};

export default ConfirmationModal;
