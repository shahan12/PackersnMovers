import React from "react";
import "./blogCard.css";
import stars from "../../images/stars.png";


function BlogCardIndiv(props) {
  return (
    <>
      <div className="blogCardImg">
        <div className={`insideBlogCard ${props.className}`}>
          <div className="insideBlogCard-top">
            <p>{props.para}</p>
          </div>
          <div className="insideBlogCard-bottom">
            <div className="textHolder">
              <img  style={{width: '6.2rem'}} className="stars" src={stars}  alt="stars"></img>
              <p className="insideBlogCard-bottom-p">{props.name}</p>
            </div>
            <div className="textHolder">
              <p style={{opacity: 0.5}}>{props.desc}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default BlogCardIndiv;