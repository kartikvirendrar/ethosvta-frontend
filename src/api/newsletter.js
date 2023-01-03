import axios from "axios";

export const saveEmail = async (email) =>
  await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/saveemail`, {email});