import { ModalItem } from 'components/Modal/Modal';
import { ImgStyled } from './ImageGalleryItem.styled';
import { useState } from 'react';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <ImgStyled src={webformatURL} alt={tags} onClick={openModal} />

      <ModalItem onOpen={isModalOpen} onClose={closeModal}>
        <img src={largeImageURL} alt={tags} />
      </ModalItem>
    </>
  );
};
