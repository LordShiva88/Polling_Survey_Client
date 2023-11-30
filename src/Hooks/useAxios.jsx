import axios from "axios";

const instance = axios.create({
  baseURL: "https://polling-survey-server-wine.vercel.app/",
});
const useAxios = () => {
  return instance;
};

export default useAxios;
