import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("https://mern-blog-mottesi.herokuapp.com/api/auth/register", {
        username,
        email,
        password,
      });
      //Redirect to login page if successful
      console.log(res);
      res.data && navigate("/login");
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="login">
      <span className="loginTitle">Register</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter your username..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="loginButton" type="submit">
          Register
        </button>
      </form>
      <button className="registerLoginButton">
        <Link className="link" to="/login">
          Login
        </Link>
      </button>
      {error && <span style={{color:"red", marginTop:"10px"}}>Something went wrong!</span>}
    </div>
  );
}