import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import DraggableImage from './DraggableImage';

const DraggableGallery = ({ images }) => {
  const [galleryImages, setGalleryImages] = useState(images);
  const [draggedItem, setDraggedItem] = useState(null);
  const [draggedOverItem, setDraggedOverItem] = useState(null);

  const [, ref] = useDrop({
    accept: 'IMAGE',
    drop: (item) => {
      const draggedImage = item.image;
      const updatedImages = galleryImages.filter((image) => image.id !== draggedImage.id);

      // Find the index where the image was dropped
      const dropIndex = images.indexOf(images.find((image) => image.id === draggedImage.id));

      updatedImages.splice(dropIndex, 0, draggedImage);
      setGalleryImages(updatedImages);

      // Reset draggedItem and draggedOverItem
      setDraggedItem(null);
      setDraggedOverItem(null);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      draggedItem: monitor.getItem(),
    }),
  });

  return (
    <div ref={ref} className="container">
      <div className="row">
        {galleryImages.map((image) => (
          <div key={image.id} className="col-md-4 mb-4">
            <DraggableImage
              image={image}
              setDraggedItem={setDraggedItem}
              setDraggedOverItem={setDraggedOverItem}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DraggableGallery;
