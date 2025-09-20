import React, { useState } from "react";
import AllVideos from "../components/AllVideos";
import Container from "../components/Container";
import { useNavigate } from "react-router-dom"; 
 
function Home() {

  const [searchQuery, setSearchQuery] = useState("")
  const [showSearch, setShowSearch] = useState(false)
 

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setShowSearch(true)
     

  };
  return (
    <Container>
      <form className="max-w-md mx-auto mt-4 mb-4" onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type="search"
            id="default-search"
            className="block w-full p-3 ps-10 text-sm text-white placeholder-gray-400 border border-gray-600 rounded-lg bg-black focus:ring-gray-300 focus:border-gray-300"
            placeholder="Search..."

            value={searchQuery}
            onChange={(e)=>{
              setSearchQuery(e.target.value.trimStart())
            }}
            required
          />


          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <button
            type="submit"
            className="absolute end-2.5 bottom-1 px-4 py-2 text-sm font-medium text-black bg-white border border-gray-600 rounded-lg hover:bg-gray-100 focus:ring-2 focus:ring-gray-300"
          >
            Search
          </button>
        </div>
      </form>
 
      {showSearch ?  <AllVideos query={`&query=${searchQuery}`}/> : <AllVideos /> }
       
    </Container>
  );
}

export default Home;
