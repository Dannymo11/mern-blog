import axios from "axios";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import "./write.css"

export default function Write() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);
    const { user } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
          username: user.username,
          title,
          desc,
        };
        if(file){
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            newPost.photo = filename;
            try{
                await axios.post("/upload", data);
            }catch(err){}
        }
        try{
            const res = axios.post("/posts", newPost);
            window.location.replace("/post/"+ res.data._id)
        }catch (err) {}
          
        };


    return(
        <div className="write"> 

        {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
            <form className="writeForm" onSubmit={handleSubmit}>
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                    <img
        className="writeIcon"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAATlBMVEX///8AAACEhISFhYWJiYno6OjJycn19fVzc3N7e3u1tbXx8fHf39+qqqq4uLhpaWliYmJSUlKPj49AQECYmJhZWVlCQkJJSUnLy8tPT0/dazVuAAACeklEQVR4nO3di1LiQBBAUSbvBDRBguL//+iWtVW6i5MEih6607nnA3Ru8TAwaWe3AwAAAAAAAAAAAAAA8Gjftc1wHpq222svJYlLH370lfZyxB2O4X/Hg/aSZL2E3160FyXpLRIYQqG9LDnxwBDetBcm5XUiMIRX7aXJqCcDQ6i1FyeinSlstBcnoZwJDKHUXp6AYrbQwftp/T5beFr/K3H+SerhaVotFK7/AnVcKBy1F/iwfKEw017gwzIKtRf4MAoptI9CCu2jkEL7KKTQPgoptI9CCu2jkEL7KKTQPgoptI9CCu2jkEL7KKTQPgoptM9/4fztpRZvMK3LasyzmxUfC4UfRX6TLMuzfLyUqe9HLYvTwopTOxUp70itG+W8v5pkj+P03MSzJZrTWLoX9pmSTNtMjfboSJAYmz7TJD75dtAu+kV6fvF6QFLfUTbwot0TcREt7Jd/4dP1koF77ZooyYnwTjsmqhMsnBsh1NMKFtq4Hr0mOZ45aMdEDYKFZ+2YqLNgof/H0P/r0P97qf+/h/6vafxfly7OK2sQnpF2//lwA5/x/X9Pszx2/lxJtjssfZ2Y6L8Tuf/OewP7Fjv/e09fvvYPb98+vGX/8I6fNlbJ9w/vt7494Hv538enkEL7KKTQPgoptI9CCu2jkEL7KKTQPgoptI9CCu2jkEL7KKTQPgoptI9CCu2jkEL7KFx/of/znvyf2eX/3DX/Z+fV87fcOjj/0P8Zlhs4h3R2PNPFWbIbOA/Y/5nOGziXe+r91MP76LfY5FuC6TNNh+sRzU/x+UF11b+zxP36L0dj9l3bDOehaTvRKWwAAAAAAAAAAAAAAAAz/gBf0Sp4i/BPhgAAAABJRU5ErkJggg=="
        alt=""
        />
                    </label>
                    <input type="file" id="fileInput" style={{ display: "none"}} 
                    onChange={(e) => setFile(e.target.files[0])}/>
                    <input 
                        type="text" 
                        placeholder="Title" 
                        className="writeInput"
                        autoFocus={true}
                        onChange={e=>setTitle(e.target.value)}
                        />
                </div>
                <div className="writeFormGroup">
                    <textarea 
                    placeholder="tell your story..."
                    type="text"
                    className="writeInput writeText"
                    onChange={e=>setDesc(e.target.value)}
                    ></textarea>
                </div>
                    <button className="writeSubmit"type="submit">
                        Publish
                    </button>
                
            </form>
        </div>
    )
}