import React, { useState, useEffect } from 'react';

const BlogCardScroll = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 16;

  const staticData = [
    { id: 1, title: 'Blog 1000' },
    { id: 2, title: 'Blog 2' },
    { id: 3, title: 'Blog 3' },
    { id: 4, title: 'Blog 2' },
    { id: 5, title: 'Blog 5' },
    { id: 6, title: 'Blog 2' },
    { id: 7, title: 'Blog 7' },
    { id: 8, title: 'Blog 2' },
    { id: 9, title: 'Blog 8' },
    { id: 10, title: 'Blog 2' },
    { id: 11, title: 'Blog 21' },
    { id: 12, title: 'Blog 2' },
    { id: 13, title: 'Blog 2' },
    { id: 14, title: 'Blog 1' },
    { id: 15, title: 'Blog 2' },
    { id: 16, title: 'Blog 7' }
  ];

  useEffect(() => {
    // Simulate loading data from the static array
    const fetchData = () => {
      setIsLoading(true);

      // Calculate the range of items to display for the current page
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      // Slice the static data to get the items for the current page
      const itemsForPage = staticData.slice(startIndex, endIndex);

      // Simulate a delay to mimic loading time (remove this in production)
      setTimeout(() => {
        setBlogs((prevBlogs) => [...prevBlogs, ...itemsForPage]);
        setIsLoading(false);
      }, 1); // Adjust the delay as needed
    };

    fetchData();
  }, [page]);

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;

    if (scrollTop + windowHeight >= documentHeight - 100 && !isLoading) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default BlogCardScroll;
