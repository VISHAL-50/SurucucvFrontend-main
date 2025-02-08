// SocialForm.js
import React, { useState } from 'react';

const SocialForm = () => {
  const [formData, setFormData] = useState({
    facebook: '',
    googlePlus: '',
    vimeo: '',
    twitter: '',
    linkedin: '',
    pinterest: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // You can handle the form data as needed (e.g., send it to a server)
  };

  return (
    <div className="social-form">
     <div className="responsive-form">
      <h2>Social Network Usernames</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
        <div className="form-group col">
          <label htmlFor="facebook">Facebook Username:</label>
          <input
            type="text"
            id="facebook"
            name="facebook"
            value={formData.facebook}
            onChange={handleChange}
          />
        </div>

        <div className="form-group col">
          <label htmlFor="googlePlus">Google Plus Username:</label>
          <input
            type="text"
            id="googlePlus"
            name="googlePlus"
            value={formData.googlePlus}
            onChange={handleChange}
          />
        </div>
        </div>
<div  className="form-row">
<div className="form-group col">
          <label htmlFor="linkedin">LinkedIn Username:</label>
          <input
            type="text"
            id="linkedin"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
          />
        </div>

        <div className="form-group col">
          <label htmlFor="twitter">Twitter Username:</label>
          <input
            type="text"
            id="twitter"
            name="twitter"
            value={formData.twitter}
            onChange={handleChange}
          />
        </div>
        </div>
 
        <button type="submit">Submit</button>
      </form>
      </div>
    </div>
  );
};

export default SocialForm;
