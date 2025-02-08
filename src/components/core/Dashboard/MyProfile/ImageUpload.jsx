// ImageUpload.js
import React, { useState } from 'react';
 

const ImageUpload = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];

    if (selectedImage) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setImage(e.target.result);
      };

      reader.readAsDataURL(selectedImage);
    }
  };

  return (
    <div className='image-upload-container'>
            {image && (
        <div className="image-preview">
          <img className="rounded-circle" src={image} alt="User Avatar" />
        </div>
      )}
      <label className="custom-file-upload">
        <input type="file" className='img-input' accept="image/*" onChange={handleImageChange} />
        <span>Choose Image</span>
      </label>
      

    </div>
  );
};

export default ImageUpload;
