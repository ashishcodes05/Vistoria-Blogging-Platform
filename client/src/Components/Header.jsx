import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Header = () => {
  const { query, setQuery } = useAppContext();
  const inputRef = React.useRef();
  const handleSearch = (e) => {
    e.preventDefault();
    const inputValue = inputRef.current.value.trim();
    if (inputValue) {
      setQuery(inputValue);
    } else {
      toast.error("Please enter a search term");
    }
  };
  return (
    <div className="mx-8 sm:mx-16 xl:mx-24 relative">
      <div className="text-center mt-20 mb-8">
        <div className=" inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 bg-gradient-to-r from-violet-500 via-[#9938CA] to-[#E0724A] rounded-full text-sm text-white font-semibold">
          <i className="fa-solid fa-wand-sparkles text-yellow-300"></i>
          <p>AI feature integrated</p>
          <div className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            New
          </div>
        </div>
        <h1 className="text-3xl sm:text-6xl font-semibold sm:leading-16 text-gray-700">
          One Platform. <br />{" "}
          <span className="text-primary">Infinite Stories.</span>
        </h1>
        <p className="my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs">
          Whether you're a thinker, a coder, a dreamer, or a storyteller,
          Vistoria gives you the freedom to explore, express, and evolve — all
          in one place.
        </p>
        <form
          onSubmit={handleSearch}
          className="flex border-1 border-gray-300 justify-between max-w-xl max-sm:scale-75 mx-auto bg-white rounded-sm overflow-hidden "
        >
          <input
            type="text"
            ref={inputRef}
            className="w-full pl-4 outline-none"
            placeholder="Search for blogs"
          />
          <button
          type="button"
            className=" text-primary max-sm:text-sm px-1 sm:px-2 py-2 rounded hover:scale-105 transition-all cursor-pointer"
            onClick={() => {
              setQuery("");
              inputRef.current.value = "";
              toast.success("Search cleared");
            }}
          >
            Clear
          </button>
          <button
            type="submit"
            className="bg-primary max-sm:text-sm text-white px-2 sm:px-6 py-2 m-1.5 rounded hover:scale-105 transition-all cursor-pointer"
          >
            Search
          </button>
          
        </form>
        
      </div>
      <img
        src={assets.gradientBackground}
        className="absolute -top-50 -z-1"
        alt=""
      />
    </div>
  );
};

export default Header;
