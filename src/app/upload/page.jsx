"use client"

import React, { useState } from 'react';
import { uploadFile } from '../../lib/ipfs';
const Page = () => {
  const [file, setFile] = useState(null);

  const onChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      console.log('File selected:', selectedFile.name);
    }
  };

  const onSubmit = async(e) => {
    e.preventDefault();
    // your logic here
    try {
        const url = await uploadFile(file);
        console.log(url) 
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="file" onChange={onChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default Page;
