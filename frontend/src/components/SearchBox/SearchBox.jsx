import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBox.css"; // nhớ import file CSS

function SearchBox({ onSearch }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSearch(text);
    }
  };

  return (
    <form className="search-box" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nhập từ tiếng Nhật..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">
        <FaSearch />
      </button>
    </form>
  );
}

export default SearchBox;
