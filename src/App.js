import TopBar from "./components/topbar/Topbar";
import Home from "./pages/Home/Home";
import Login from "./pages/login/Login";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Register from "./pages/register/Register";
import * as React from "react";
import { useContext } from "react";
import { Context } from "./context/Context";
import { Routes, Route, } from "react-router-dom";

function App() {
const { user } = useContext(Context);
  return (
    <div className="App">
      <TopBar/>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/register" element={user ? <Home/> : <Register />} />
        <Route path="/login" element={user ? <Home/> : <Login />} />
        <Route path="/write" element={user ? <Write /> : <Register />} />
        <Route path="/post/:postid" element={<Single />} />
        <Route path="/settings" element={user ? <Settings /> : <Register />} />
      </Routes>
    </div>
  );
}
  

export default App;