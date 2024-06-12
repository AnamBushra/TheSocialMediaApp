import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState([
    currentUser.followings.includes(user?._id),
  ]);
  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get(
          "https://friendszone-04cf.onrender.com/api/users/friends/" + user._id
        );
        setFriends(friendList.data);
        //  console.log(friendList);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user._id]);

  const handleClick = async (e) => {
    try {
      if (followed) {
        await axios.put(
          `https://friendszone-04cf.onrender.com/api/users/${user._id}/unfollow`,
          {
            userId: currentUser._id,
          }
        );
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        console.log("not followed");
        await axios.put(
          `https://friendszone-04cf.onrender.com/api/users/${user._id}/follow`,
          {
            userId: currentUser._id,
          }
        );
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {}
  };
  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          {/* <Cake htmlColor="pink" className="birthdayImg" /> */}
          <span className="birthdayText"></span>
          <b>Luna Lovegood &nbsp;</b> and &nbsp;<b> 2 other friends &nbsp; </b>{" "}
          have a birthday today.
        </div>
        <img src={`${PF}posts/ad.jpg`} alt="" className="rightbarAd" />
        <h4 className="rightbarTitle">Active Now</h4>
        <ul className="rightbarFriendsList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>{" "}
      </>
    );
  };
  const ProfileRightbar = () => {
    console.log("hello");

    return (
      <>
        {user._id !== currentUser._id && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow -" : "Follow +"}
            {/* {followed ? <Remove /> : <Add />} */}
          </button>
        )}
        {(user.occupation || user.relationship || user.city) && (
          <h4 className="profileRightbarTitle">User Information</h4>
        )}

        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            {user.city && <span className="rightbarInfoKey">City : </span>}

            {user.city && (
              <span className="rightbarInfoValue">{user.city}</span>
            )}
          </div>
          <div className="rightbarInfoItem">
            {user.occupation && (
              <span className="rightbarInfoKey">Occupation : </span>
            )}
            {user.occupation && (
              <span className="rightbarInfoValue">{user.occupation}</span>
            )}
          </div>
          <div className="rightbarInfoItem">
            {user.relationship && (
              <span className="rightbarInfoKey">Status : </span>
            )}
            {user.relationship && (
              <span className="rightbarInfoValue">{user.relationship}</span>
            )}
          </div>
        </div>
        <h4 className="profileRightbarTitle">User Friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              to={"/profile/" + friend._id}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "persons/noavatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user._id ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
