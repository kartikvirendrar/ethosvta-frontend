import axios from "axios";

export const saveHistory = async (userId, audioUrl, audioFormat, audioName, videoName) =>
  await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/savehistory`, {userId, audioUrl, audioFormat, audioName, videoName});

export const getHbyId = async (histId) =>
  await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/gethistorybyid`, {histId});

export const getHforUser = async (uId) =>
  await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/gethistoryforuser`, {uId});