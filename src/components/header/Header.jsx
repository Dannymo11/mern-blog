import "./header.css"

export default function header(){
    return (
        <div className="header">
            <div className="headerTitles">
                <span className="headerTitleSmall">Danny Mo's</span>
                <span className="headerTitleLarge">Blog</span>
            </div>
            <img 
            className="headerImg"
            src = "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/sunset-quotes-21-1586531574.jpg"
            alt = ""
            />
        </div>
    )
}