import "./singlePost.css"
import axios from "axios";
import { Link, useLocation, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import {Context} from "../../context/Context";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = "https://mern-blog-mottesi.herokuapp.com/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const params = useParams();


  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`https://mern-blog-mottesi.herokuapp.com/api/posts/${params.postid}`);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(`https://mern-blog-mottesi.herokuapp.com/api/posts/${params.postid}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`https://mern-blog-mottesi.herokuapp.com/api/posts/${params.postid}`, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false)
    } catch (err) {}
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img src={PF + post.photo} alt="" className="singlePostImg" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="Title">
            {title}
            {post.username === user?.username && (
               <div className="singlePostEdit">
                     <i className="edit" onClick={()=>setUpdateMode(true)}>
                     Edit Here
                    </i>
                    <i className="delete" onClick={handleDelete}>
                         Delete here
                    </i>
                      </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
            <Link to={`/?user=${post.username}`} className="link">
              <b> {post.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}
