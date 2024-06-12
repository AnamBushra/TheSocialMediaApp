import { useContext, useRef, useState } from "react";
import "./share.css";
import { AuthContext } from "../../context/AuthContext";
// import { PermMedia,Sell ,LocationOn,Mood, Cancel} from "@mui/icons-material"
import axios from "axios";
export default function Share() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);
  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);

      newPost.img = fileName;
      try {
        await axios.post(
          "https://friendszone-31og.onrender.com/api/upload",
          data
        );
      } catch (err) {}
    }
    try {
      await axios.post(
        "https://friendszone-31og.onrender.com/api/posts",
        newPost
      );
      window.location.reload();
    } catch (err) {}
  };
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "persons/noavatar.png"
            }
            alt=""
            className="shareProfileImg"
          />
          <input
            placeholder={"Share Your Fleeting Thoughts " + user.username}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            {/* <Cancel className="shareCancelImg"  onClick={()=> setFile(null)}/> */}
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              {/* <PermMedia htmlColor="#80187c" className="shareIcon"/> */}
              <span className="shareOptionText"> Photo or Video</span>
              <input
                style={{ display: "none  " }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />{" "}
            </label>
            <div className="shareOption">
              {/* <Sell htmlColor="#1d1280" className="shareIcon"/> */}
              <span className="shareOptionText">Tag</span>{" "}
            </div>
            <div className="shareOption">
              {/* <LocationOn htmlColor="green" className="shareIcon"/> */}
              <span className="shareOptionText"> Location</span>{" "}
            </div>
            <div className="shareOption">
              {/* <Mood htmlColor="#7a4f0d" className="shareIcon"/> */}
              <span className="shareOptionText"> Feelings</span>{" "}
            </div>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}
