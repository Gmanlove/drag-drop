import React, { useState, useEffect } from "react";
import { images } from "../data/images";

const Gallery = () => {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredImages, setFilteredImages] = useState(images);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("index", index.toString());
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    const draggedIndex = parseInt(e.dataTransfer.getData("index"), 10);

    const updatedImages = [...filteredImages];
    [updatedImages[draggedIndex], updatedImages[dropIndex]] = [
      updatedImages[dropIndex],
      updatedImages[draggedIndex],
    ];

    setFilteredImages(updatedImages);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const filtered = images.filter((image) =>
      image.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredImages(filtered);
  }, [searchQuery]);

  return (
    <div className="container">
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search image by tags..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="row" onDragOver={handleDragOver}>
        {loading ? (
          <div className="text-center mt-5">
            <h2>Loading...</h2>
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          filteredImages.map((image, index) => (
            <div
              key={image.id}
              className="col-md-4 mb-4"
              onDrop={(e) => handleDrop(e, index)}
              onDragOver={handleDragOver}
            >
              <div className="card">
                <div draggable onDragStart={(e) => handleDragStart(e, index)}>
                  <img
                    src={image.url}
                    alt={image.title}
                    className="card-img-top"
                  />
                </div>
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
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Gallery;
