import {
  Box,
  Button,
  CardMedia,
  CircularProgress,
  Skeleton,
} from "@mui/material";
import Axios from "axios";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

const ImageUploader = () => {
  const [isMouseIn, setIsMouseIn] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (files: any) => {
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

  const handleDragOver = (event: any) => {
    event.preventDefault();
  };

  const handleDrop = (event: any) => {
    console.log("handleDrop: ", event);
    event.preventDefault();
    event.stopPropagation();
    if (event?.dataTransfer?.files) {
      handleChange(event.dataTransfer.files);
    }
  };

  const handleUploadClick = () => {
    if (!file) {
      toast("Drag and Drop or Select Image to Upload...");
      return;
    }
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
  };

  const handleRemoveClick = () => {
    if (file) {
      setFile(null);
    }
    setImageUrl("");
  };

  return (
    <div>
      <Box m={2}>
        {loading ? (
          <Skeleton
            variant="rectangular"
            width="30vw"
            height="20vw"
            sx={{
              marginX: "auto",
            }}
          />
        ) : (
          <Box
            style={{ position: "relative" }}
            sx={{
              width: "30vw",
              height: "20vw",
              marginX: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid grey",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "grey",
                opacity: [0.2, 0.4, 0.2],
              },
            }}
            onMouseEnter={() => setIsMouseIn(true)}
            onMouseLeave={() => setIsMouseIn(false)}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef?.current?.click()}
          >
            <input
              ref={fileInputRef}
              hidden
              type="file"
              accept="image/*"
              onChange={(e) => {
                handleChange(e.target.files);
              }}
            />
            {!imageUrl && "Drag and Drop or Select Image to Upload..."}
            {imageUrl && (
              <CardMedia
                component="img"
                height="100%"
                width="100%"
                title="Drag and Drop or Select Image to Upload..."
                image={imageUrl}
                sx={{
                  objectFit: "cover",
                }}
              />
            )}
            {imageUrl && isMouseIn && (
              <Box
                style={{
                  position: "absolute",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Drag and Drop or Select Image to Upload...
              </Box>
            )}
          </Box>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          textAlign: "center",
        }}
      >
        {loading ? (
          <CircularProgress color="secondary" />
        ) : (
          <Button
            variant="contained"
            color="secondary"
            disabled={!file}
            onClick={handleUploadClick}
          >
            Upload
          </Button>
        )}
        {loading ? (
          <CircularProgress color="secondary" />
        ) : (
          <Button
            variant="contained"
            color="secondary"
            disabled={!file}
            onClick={handleRemoveClick}
          >
            Remove
          </Button>
        )}
      </Box>
    </div>
  );
};

export default ImageUploader;
