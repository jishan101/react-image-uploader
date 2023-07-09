import { Button, CardMedia, CircularProgress } from "@mui/material";
import Axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const ImageUploader = () => {
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>();
  console.log("env: ", process.env.REACT_APP_UPLOAD_PRESET);

  const changeHandler = (files: any) => {
    console.log(files);
    if (files[0]) {
      setFile(files[0]);

      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target as FileReader;
        if (result) {
          setImageUrl(result as string);
        }
      };
      fileReader.readAsDataURL(files[0]);
    }
  };

  const clickHandler = () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.REACT_APP_UPLOAD_PRESET as string
    );
    console.log("formData: ", Object.fromEntries(formData));

    setLoading(true);
    Axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
      formData
    )
      .then((response: any) => {
        if (response?.data?.secure_url) {
          setImageUrl(response.data.secure_url);
          toast.success("Successfully Uploaded the Image");
        }
        console.log(response?.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Image Upload Failed");
      })
      .finally(() => {
        setLoading(false);
      });

    // const { loading, data } = useFetch(
    //   process.env.REACT_APP_CLOUDINARY_URL as string,
    //   formData
    // );
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          changeHandler(e.target.files);
        }}
      />
      {loading ? (
        <CircularProgress color="secondary" />
      ) : (
        <Button
          variant="contained"
          color="secondary"
          disabled={loading}
          onClick={clickHandler}
        >
          Upload
        </Button>
      )}
      {imageUrl && <CardMedia component="img" height="100%" image={imageUrl} />}
    </div>
  );
};

export default ImageUploader;
