import axios from "axios";

export const saveHistory = async (userId, audioUrl, audioFormat, audioName, videoName, comments) =>
  await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/savehistory`, {userId, audioUrl, audioFormat, audioName, videoName, comments});

export const getHbyId = async (histId) =>
  await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/gethistorybyid`, {histId});

export const getHforUser = async (uId) =>
  await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/gethistoryforuser`, {uId});

export const updComByID = async (commId, comments) =>
  await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/updatecommentsbyid`, {commId, comments});

export const addSubText = async (commId, subtitle, text) =>
  await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/addsubtext`, {commId, subtitle, text});
  