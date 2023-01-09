import axios from "axios";

export const AudioToText = async (lin) => {
  return await axios.get(`http://127.0.0.1:5000/generateSrtFile/${lin}`);
};
