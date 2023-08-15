import React, { useState, useEffect } from 'react';

import "./blogCard.css";
import blogCardImg from "../../images/blogcard.png";
import stars from "../../images/stars.png";
import BlogCardIndiv from "./BlogCardIndiv.component";
import blogs from './blog.json';

const data = Array.from({ length: 20 }, (_, index) => ({ id: index + 1, name: `Item ${index + 1}` }));

function BlogCard(props) {

  const itemsPerPage = 3;
  const totalPages = Math.ceil(blogs.blogs.length / itemsPerPage);
  const autoChangeInterval = 5000; // 5 seconds

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const autoChangeTimer = setInterval(() => {
      setCurrentPage((prevPage) => (prevPage % totalPages) + 1);
    }, autoChangeInterval);

    return () => {
      clearInterval(autoChangeTimer);
    };
  }, [currentPage, totalPages]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  console.log("blogs, items", blogs.blogs, data)
  const renderItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToDisplay = blogs.blogs.slice(startIndex, endIndex);
    return itemsToDisplay.map((blog, index) => (
      <div key={index} className="item">
        <BlogCardIndiv 
          para={blog.para}
          className={index%2 == 0 ? "" : "insideBlogCard2" }
          name={blog.name}
          desc={blog.desc}
        />
      </div>
    ));
  };


  return (
  <div className="pagination-container">
    <div className="blog-page-items-container">{renderItems()}</div>
    <div className="blog-pagination">
      <div className="blog-pagination-item">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(index + 1)}
          className={currentPage === index + 1 ? 'active' : ''}
        >
          
        </button>
      ))}
      </div>
    </div>
  </div>
    );
}
export default BlogCard;