import React from 'react';
import { Modal, Button, Text, Loading } from '@nextui-org/react';

interface ModalProps {
  isLoading: boolean;
  visible: boolean;
  closeHandler: () => void;
  hash: string;
  explorer: string;
  showSuccessText: boolean;
  errorMessage?: string;
}

const LoadModal = ({
  closeHandler,
  visible,
  hash,
  explorer,
  isLoading,
  showSuccessText,
  errorMessage,
}: ModalProps) => {
  return (
    <>
      <Modal
        closeButton
        blur
        preventClose
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" b size={18}>
            Your Transaction
          </Text>
        </Modal.Header>
        {isLoading ? (
          <Loading type="default" />
        ) : (
          <>
            <Modal.Body>
              {errorMessage ? (
                <text className="text-red-500 text-center text-xl">
                  {errorMessage}
                </text>
              ) : (
                <>
                  <Button
                    flat
                    auto
                    onClick={() => window.open(`${explorer}${hash}`, '_blank')}
                  >
                    View on Explorer
                  </Button>
                  {showSuccessText && (
                    <Text b size={14}>
                      Your Gift Card Redeem Successfully
                    </Text>
                  )}
                </>
              )}
            </Modal.Body>
          </>
        )}
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default LoadModal;
