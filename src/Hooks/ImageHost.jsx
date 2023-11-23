import useAxios from "./useAxios";
const image_hosting_KEY = import.meta.env.VITE_IMAGE_HOSTING_API;

const ImageHost = async (image) => {
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_KEY}`;
  const axios = useAxios();

  const res = await axios.post(image_hosting_api, image, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });
  const imageUrl = res.data.data.display_url;
  return imageUrl;
};

export default ImageHost;
