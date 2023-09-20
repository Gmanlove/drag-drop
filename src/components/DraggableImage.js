import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableImage = ({ image, setDraggedItem }) => {
  const [{ isDragging }, ref] = useDrag({
    type: 'IMAGE',
    item: { image },
  });

  return (
    <div
      ref={ref}
      className={`card draggable-image ${isDragging ? 'border border-danger shadow' : ''}`}
      style={{ opacity: isDragging ? 0.7 : 1, cursor: 'move' }}
      onClick={() => setDraggedItem(image)}
    >
      <img src={image.url} alt={image.title} className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">{image.title}</h5>
        <div className="tags">
          {image.tags.map((tag, index) => (
            <span key={index} className="badge bg-secondary me-1">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DraggableImage;
