import axios from "axios";

export const uploadAudio = async (audio, format) => {
  return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/uploadAudio`, { audio, format });
};
