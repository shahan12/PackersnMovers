import React from "react";
import "./blogCard.css";
import blogCardImg from "../../images/blogcard.png";
import stars from "../../images/stars.png";
import BlogCardIndiv from "./BlogCardIndiv.component";


function BlogCard(props) {
  return (
    <>
      <h2>What our customers say</h2>
      <BlogCardIndiv 
        para={"qqdsq ipsum xaax sit amet, hrtrth adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad."}
        className={""}
        name={"prachi Kashyap"}
        desc={"Moved from Delhi to Bangalore"}
      />
      <BlogCardIndiv 
        para={"qqdsq ipsum xaax sit amet, hrtrth adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad."}
        className={"insideBlogCard2"}
        name={"prachi Kashyap"}
        desc={"Moved from Delhi to Bangalore"}
      />
      <BlogCardIndiv 
        para={"qqdsq ipsum xaax sit amet, hrtrth adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad."}
        className={""}
        name={"prachi Kashyap"}
        desc={"Moved from Delhi to Bangalore"}
      />
    </>
  );
}
export default BlogCard;