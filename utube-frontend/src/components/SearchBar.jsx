import { useNavigate } from "react-router-dom";
import Container from "./Container";

function SearchBar() {

  const navigate = useNavigate() 

  const handleSubmit =async (e)=>{
       e.prevetDefault()

       navigate("/search")
  }

  return (
    <Container>
      <form class="max-w-md mx-auto" onSubmit={handleSubmit}>
        <div class="relative">
          <input
            type="search"
            id="default-search"
            class="block w-full p-3 ps-10 text-sm text-white placeholder-gray-400 border border-gray-600  rounded-none md:rounded-lg bg-black focus:ring-gray-300 "

            required
          />
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              class="w-4 h-4 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <button
            type="submit"
            class="absolute end-2.5 bottom-2.5 px-4 py-2 text-sm font-medium text-black bg-white border border-gray-600 rounded-lg hover:bg-gray-100 focus:ring-2 focus:ring-gray-300"
          >
            Search
          </button>
        </div>
      </form>
    </Container>
  );
}

export default SearchBar;
