/*import { useEffect, useState } from "react"
import Post from "../post/Post"
import Share from "../share/Share"
import "./feed.css"
//import { posts } from "../../dummyData"
export default function Feed() {
  const [posts,setPosts]=useState([]);
 // const [text,setText]=useState("");
  useEffect(()=>{
    console.log("feed rendered");
  },[])
  return (
    <div className="feed">
      
        <div className="feedWrapper">
            <Share/>
            {/*posts.map((p)=>(
 <Post key={p.id} post={p}/>
            ))*/ /*} 
           
          
        </div>
    </div>
  )
}*/

import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      console.log(username);
      const res = username
        ? await axios.get(
            "https://friendszone-04cf.onrender.com/api/posts/profile/" +
              username._id
          )
        : await axios.get(
            "https://friendszone-04cf.onrender.com/api/posts/timeline/" +
              username._id
          );
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username.username || username.username === user.username) && (
          <Share />
        )}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
