import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css"

export default function TopBar() {
    const { user, dispatch} = useContext(Context);
    const PF = "https://mern-blog-mottesi.herokuapp.com/images/"

    const handleLogout = () =>{
        dispatch({type:"LOGOUT"})}
    return (
        <div className="bar">
            <div className="topLeft"></div>
            <div className="topCenter">
                <ul className="topList">
                    <li className="topListItem">
                        <Link className="link" to ="/" >HOME</Link>
                    </li>
                    <li className="topListItem">
                        <Link className="link" to ="/" >ABOUT</Link>
                    </li>
                    <li className="topListItem">
                        <Link className="link" to ="/" >CONTACT</Link>
                    </li>
                    <li className="topListItem">
                        <Link className="link" to ="/write" >WRITE</Link>
                    </li>
                    <li className="topListItem" onClick={handleLogout}>
                        {user && "LOGOUT"}
                    </li>
                </ul>
            </div>
            <div className="topRight">
                {
                    user ? (
                    <Link to="settings"> 
                        <img 
                className="topImg"
                src={PF + user.profilePic}
                alt=""
                />
                </Link>
                ) : (
                    <ul className="topList">
                        <li className="topListItem">
                        <Link className="link" to ="/login" >LOGIN</Link>
                        </li>
                        <li className="topListItem">
                        <Link className="link" to ="/register" >REGISTER</Link>
                        </li>
                        
                    </ul>

                )
                    
                }
                
                <i className="searchIcon fa-solid fa-magnifying-glass"></i>
            </div>
        </div>
    );
}