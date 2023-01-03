import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getHforUser } from "../../api/history";

export default function Profile() {
  let navigate = useNavigate();
  const [name, setName] = useState("Name");
  const [email, setEmail] = useState("Email");
  const [profileImg, setProfileImg] = useState();
  const [history, setHistory] = useState([]);

  const SignOut = async () => {
    if (window.localStorage.getItem("userid")) {
      window.localStorage.removeItem("email");
      window.localStorage.removeItem("name");
      window.localStorage.removeItem("userid");
      toast.success("logged out successfully");
      navigate("/");
    }
  };

  useEffect(() => {
    if (
      window.localStorage.getItem("name") &&
      window.localStorage.getItem("email") &&
      window.localStorage.getItem("userid")
    ) {
      setName(window.localStorage.getItem("name"));
      setEmail(window.localStorage.getItem("email"));
      var str = window.localStorage.getItem("name");
      if (str.indexOf(" ") !== -1) {
        setProfileImg(
          (str[0] + str[str.indexOf(" ") + 1]).toUpperCase().toString()
        );
      } else {
        setProfileImg(str[0].toUpperCase().toString());
      }

      getHforUser(window.localStorage.getItem("userid"))
        .then((res) => {
          setHistory(res.data);
        })
        .catch((err) => console.log(err));
    }
    else {
      toast.error("Please Login First");
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <div className="block py-10 bg-gray-700">
        <div className="max-w-2xl mx-auto">
          <div className="w-full">
            <div className="w-full bg-blue-200 h-48 rounded-t-lg dark:bg-gray-300"></div>
            <div className="absolute -mt-20 ml-5">
              <div
                className="bg-gray-200 border border-gray-300 h-36 w-40 rounded-lg shadow-md border-b border-primary"
                id="profileimg"
              >
                {profileImg}
              </div>
            </div>
          </div>
          <div className="bg-primary border border-primary rounded-b-lg p-5 pt-20 flex flex-col">
            <div className="mb-1 dark:text-white" id="name">
              {name}
            </div>
            <div className="mb-1 dark:text-white" id="email">
              {email}
            </div>
            <button class="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={SignOut}>SignOut</button>
          </div>
        </div>

        {history.map((his) => (
          <div class="p-4 w-full ">
            <div class="flex items-center justify-between p-4 rounded-lg bg-white">
              <div>
                <h2 class="text-gray-900 text-lg font-bold">{his.videoName}</h2>
                <h3 class="mt-2 text-xl font-bold text-green-500 text-left">{his.audioName}</h3>
                <p class="text-sm font-semibold text-gray-400">{his.createdAt}</p>
                <button class="text-sm mt-6 px-4 py-2 bg-[#304FFE]  text-white rounded-lg font-laonoto tracking-wider hover:bg-indigo-500 outline-none" onClick={() => {navigate(`/video-to-audio/${his._id}`)}}>Load Audio</button>
              </div>
              <div
                class="bg-gradient-to-tr from-blue-600 to-indigo-600 w-32 h-32  rounded-full shadow-2xl shadow-[#304FFE] border-white  border-dashed border-2  flex justify-center items-center ">
                <div>
                  <h1 class="text-white text-2xl">{his.audioFormat}</h1>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
