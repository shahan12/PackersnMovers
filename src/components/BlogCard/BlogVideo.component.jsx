import React, { useState, useEffect } from "react";

import "./blogCard.css";
import BlogVideoIndiv from "./BlogVideoIndiv.component";
import blogs from "./videoBlog.json";

const data = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  name: `Item ${index + 1}`,
}));

function BlogVideo(props) {
  const itemsPerPage = 2;
  const totalPages = Math.ceil(blogs.vlogs.length / itemsPerPage);
  const autoChangeInterval = 2000000; // 5 seconds

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
  const containerKey = `page-${currentPage}`;
  const renderItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToDisplay = blogs.vlogs.slice(startIndex, endIndex);
    return itemsToDisplay.map((blog, index) => (
      <div key={index} className="item">
        <BlogVideoIndiv
          title={blog.title}
          thumb={blog.thumbnail}
          video={blog.videolink}
          className={index % 2 == 0 ? "" : "insideBlogCard2"}
        />
      </div>
    ));
  };

  return (
    <div className="pagination-container">
      <div className="blog-page-items-container" key={containerKey}>{renderItems()}</div>
      <div className="blog-pagination">
        <div className="blog-pagination-item">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
}
export default BlogVideo;
