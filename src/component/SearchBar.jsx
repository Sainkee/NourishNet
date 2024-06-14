import React from "react";
import { Form,  useNavigate } from "react-router-dom";

import { useRef } from "react";
import { toast } from "react-toastify";


export default function SearchBar() {
  const navigate = useNavigate()
  const searchRef = useRef();
  const handleSearch = (e) => {
    e.preventDefault();
    const searchdata = searchRef.current.value;
    if (searchdata === "") {
      toast.error("Please enter something to search");
      return;
    }
    navigate(`/category/${searchdata}`)
    searchRef.current.value = "";
  };

  return (
    <Form
      onSubmit={handleSearch}
      className="flex items-center justify-center md:justify-start w-full"
    >
      <input
        placeholder="Search recipe"
        className="rounded-full text-black px-4 py-3 focus:outline-none focus:border-orange-500 w-full max-w-md"
        type="text"
        ref={searchRef}
      />
      <button
        className="rounded-full -translate-x-10 px-10 py-3 bg-red-500 text-white   hover:bg-orange-600 focus:outline-none"
        type="submit"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-4.35-4.35m2.7-3.65a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </Form>
  );
}
