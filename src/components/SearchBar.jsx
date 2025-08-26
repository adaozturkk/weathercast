import React from 'react'
import { useState } from "react";

const SearchBar = ({ setCity }) => {
  const [inputValue, setInputValue] = useState("");

  const getCityInput = (e) => {
    if (e.key === "Enter") {
      setCity(inputValue);
    }
  };
  return (
    <div className="flex relative">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 absolute top-1/2 left-3 -translate-y-1/2 text-gray-100"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <path
            d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>{" "}
        </g>
      </svg>

      <input
        type="text"
        name="city"
        id="city"
        placeholder="Search for a city..."
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={getCityInput}
        className="pl-10 w-full h-10 text-white placeholder:text-gray-100 bg-sky-500/70 outline-0 border border-sky-500/50 focus:ring-2 focus:ring-sky-500/30 transition rounded-full"
      />
    </div>
  );
};

export default SearchBar;
