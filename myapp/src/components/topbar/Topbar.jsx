import "./topbar.css"
// import { Search,Person,Chat,Notifications } from "@mui/icons-material"
import { useContext } from "react"
import {Link,useNavigate} from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"

export default function Topbar() {
  const{user}= useContext(AuthContext);
  const navigate=useNavigate();
   const PF= process.env.REACT_APP_PUBLIC_FOLDER;
   const navigateRegister=()=> {
    navigate('/register')
}
   const handleLogout = async(e)=>{
    e.preventDefault();
    try {
      
      window.localStorage.clear();
      window.location.reload();
      navigateRegister();
      
    } catch (ee) {
      console.log(ee.response.data.message);
    }
  }
   
  return (
    <div className="topbarContainer">
        <div className="topbarLeft">
          <Link to="/" style={{textDecoration:"none"}}>
          <span className="logo">FriendsZone</span>
          </Link>
          
        </div>
        <div className="topbarCenter">
          <div className="Searchbar">
           {/* <Search/> */}
           <input placeholder="Search your friends,pages,posts...." className="searchInput"/>
           </div>
        </div>
        <div className="topbarRight">
          <div className="topbarLinks">
          {/* <span className="topbarLink">HomePage</span> */}
          {/* <Link to="/login" style={{textDecoration:"none"}}> */}
         
          {/* </Link> */}
          </div>
          <div className="topbarIcons">
            <div className="topbarIconItem">
              {/* <Person/> */}
            {/* <span className="topbarIconBadge">1</span> */}
            </div>
            
         
            <div className="topbarIconItem">
              {/* <Chat/> */}
            {/* <span className="topbarIconBadge">4</span> */}
            </div>
            
         
            <div className="topbarIconItem">
              {/* <Notifications/> */}
            {/* <span className="topbarIconBadge">2</span> */}
            </div>
            <span className="topbarLink" onClick={handleLogout}>Logout</span>
            </div>
            
            <Link to={`/profile/${user._id}`}>
            <img src={user.profilePicture?
            PF+user.profilePicture
            :PF+"persons/noavatar.png"} 
            alt="" className="topbarImg" />
            </Link>
            
            
                    </div>
    </div>
  )
}
