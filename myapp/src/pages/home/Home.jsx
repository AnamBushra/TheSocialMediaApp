import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";
import Feed from "../../components/feed/Feed";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./home.css"
export default function Home(){
   const { user } = useContext(AuthContext);
    return(<>
       <Topbar/>
    <div className="homeContainer">
    
       <Sidebar/>
       <Feed username={user}/>
      <Rightbar user={{}}/>
       </div>
       </>
    )
}