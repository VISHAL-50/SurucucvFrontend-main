// // ResponsiveForm.js
// import React, { useState } from 'react';
 

// const ResponsiveForm = () => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     middleName: '',
//     lastName: '',
//     post: 'CEO',
//     bio: '',
//     profileImage: null,
//     coverImage: null,
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleProfileImageChange = (e) => {
//     const selectedImage = e.target.files[0];
//     setFormData({ ...formData, profileImage: selectedImage });
//   };

//   const handleCoverImageChange = (e) => {
//     const selectedImage = e.target.files[0];
//     setFormData({ ...formData, coverImage: selectedImage });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission, e.g., submit to server
//     console.log(formData);

    
    
//   };

//   return (
//     <div className="container">
//       <div className="responsive-form">
//       <h2>Profile Settings</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="form-row">
//             <div className="form-group col">
//               <label htmlFor="firstName">First Name:</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="firstName"
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleInputChange}
//               />
//             </div>

//             <div className="form-group col">
//               <label htmlFor="middleName">Middle Name:</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="middleName"
//                 name="middleName"
//                 value={formData.middleName}
//                 onChange={handleInputChange}
//               />
//             </div>

//             <div className="form-group col">
//               <label htmlFor="lastName">Last Name:</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="lastName"
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleInputChange}
//               />
//             </div>
//           </div>

//           <div className="form-group">
//             <label htmlFor="post">Post:</label>
//             <input
//               type="text"
//               className="form-control"
//               id="post"
//               name="post"
//               value={formData.post}
//               onChange={handleInputChange}
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="bio">Bio:</label>
//             <textarea
//               className="form-control"
//               id="bio"
//               name="bio"
//               value={formData.bio}
//               onChange={handleInputChange}
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="profileImage">Profile Image:</label>
//             <input
//               type="file"
//               className="form-control-file"
//               id="profileImage"
//               name="profileImage"
//               accept="image/*"
//               onChange={handleProfileImageChange}
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="coverImage">Cover Image:</label>
//             <input
//               type="file"
//               className="form-control-file"
//               id="coverImage"
//               name="coverImage"
//               accept="image/*"
//               onChange={handleCoverImageChange}
//             />
//           </div>

//           <button type="submit" className="btn btn-primary btn-block">
//             Save
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ResponsiveForm;
