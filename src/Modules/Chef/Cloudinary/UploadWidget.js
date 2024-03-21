import { useEffect, useRef } from "react";

const UploadWidget = ({ onImageUpload }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window?.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dnuyoqw8e",
        uploadPreset: "c08iv1zp",
      },
      function (error, result) {
        if(result.event=='success'){
          console.log("uploaded result",result.info.secure_url);
          const imageUrl=result.info.secure_url
          onImageUpload(imageUrl)

        }
        // Handle the result or error here
      }
    );
  }, [onImageUpload]);
  return <button onClick={() => widgetRef?.current.open()}>Upload</button>;
};

export default UploadWidget;
