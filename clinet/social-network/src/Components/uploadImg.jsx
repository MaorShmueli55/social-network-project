import React, { useState } from "react";
import axios from "axios";

const ImageUpload = ({ setFormData, img }) => {
  //states for image creation
  const [image, setImage] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  //manage the imge state
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  //manage upload status
  const handleUpload = async () => {
    if (!image) {
      setUploadStatus("Please select an image to upload.");
      return;
    }
    //formData hold all of the config details as the body of the request
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "posts-social");
    formData.append("cloud_name", "dpjsj3rpk");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dpjsj3rpk/image/upload",
        formData
      );
      setFormData({
        ...formData,
        [img]: response.data.secure_url,
      });
      setUploadedImageUrl(response.data.secure_url); //send this to backend
      setUploadStatus("Image uploaded successfully!");
    } catch (error) {
      console.error(error);
      setUploadStatus("Error uploading image.");
    }
  };

  return (
    <div>
      <h1>Upload an Image</h1>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload</button>
      {uploadStatus && <p>{uploadStatus}</p>}
      {uploadedImageUrl && (
        <div>
          <h2>Uploaded Image:</h2>
          <img
            src={uploadedImageUrl}
            alt="Uploaded"
            style={{ maxWidth: "300px" }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
