import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBox = ({ posts }) => {
  const [query, setQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setFilteredPosts([]);
      return;
    }

    const results = posts.filter((post) =>
      post.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredPosts(results);
  };

  const handleSelect = (title) => {
    setQuery(title);
    setFilteredPosts([]);
  };

  return (
    <div className="relative w-full max-w-lg mt-6">
      <div className="flex items-center border-2 border-grey2 rounded-full shadow-sm bg-transparent ">
        <span className="pl-3 text-gray-500">
          <FaSearch />
        </span>
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search blog posts..."
          className="w-full px-4 py-2 outline-none rounded-r-md"
        />
      </div>

      {filteredPosts.length > 0 && (
        <ul className="absolute z-10 w-full bg-transparent border border-t-0 border-gray-300 rounded-b-md shadow-lg max-h-60 overflow-y-auto">
          {filteredPosts.map((post) => (
            <li
              key={post.id}
              onClick={() => handleSelect(post.title)}
              className="px-4 py-2 hover:border-1 hover:border-grey2 cursor-pointer text-sm"
            >
              {post.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
