import React from "./profile.css"
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";
import Feed from "../../components/feed/Feed";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";
export default function Profile() {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  const[user,setUser]=useState({});
 //changes
//  const {user}=useContext(AuthContext);
//  console.log(currentUser)
  const username=useParams().username;
  
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("http://localhost:8800/api/users/"+username);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);
  console.log(user)
  return (
    <>
    <Topbar/>
    <div className="profile">
    
       <Sidebar/>
       <div className="profileRight">
        <div className="profileRightTop">
            <div className="profileCover">
            <img src={user.coverPicture? PF+user.coverPicture: PF+"persons/nocover.png"} alt="" className="profileCoverImg" />
            <img src={user.profilePicture? PF+user.profilePicture: PF+"persons/noavatar.png"} alt="" className="profileUserImg" />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{user.username}</h4>
                <span className="profileInfoDesc">{user.desc}</span>
            </div>
        </div>
       <div className="profileRightBottom">
       
       <Feed username={user}/>
      <Rightbar user={user}/>
      </div>
      </div>
       </div>
       </>
  )
}
