import React, { useState } from 'react';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    passwordHash: '',
    profilePictureFile: null
  });

const handleChange = e => {
  const { name, value, files } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: files ? files[0] : value
  }));
};

  const handleSubmit = async e => {
    e.preventDefault();

    const data = new FormData();
    data.append('fullName', formData.fullName);
    data.append('email', formData.email);
    data.append('password', formData.passwordHash); // match backend param name
    data.append("profilePictureFile", formData.profilePictureFile);

    try {
      const res = await fetch('https://localhost:7289/api/Users/register', {
        method: 'POST',
        body: data
      });

      if (res.ok) {
        alert('Registration successful');
      } else {
        const err = await res.text();
        alert('Registration failed: ' + err);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong!');
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input type="text" name="fullName" placeholder="Full Name" required onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
      <input type="password" name="passwordHash" placeholder="Password" required onChange={handleChange} />
      <input type="file" name="profilePictureFile" accept="image/*" onChange={handleChange} />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
