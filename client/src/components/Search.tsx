import axios from "axios";
import { useEffect, useRef, useState } from "react";

const Search = () => {
  const [suggetionList, setSuggetionList] = useState([]);
  const [searching, setSearching] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = async (event: any) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        console.log("Clicked Outside");
        setSearching(false);
      } else {
        const searchQuery = searchRef.current?.value;
        const res = await axios.get(
          `http://localhost:8080/search?q=${searchQuery}`
        );

        setSuggetionList(res.data.slice(0, 8));
        setSearching(true);
        console.log(suggetionList);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [searchRef]);

  const handleChange = async (value: string) => {
    console.log(searchRef.current?.value);
    const res = await axios.get("http://localhost:8080/search?q='Hello'");

    setSuggetionList(res.data.slice(0, 5));
    setSearching(true);
    console.log(suggetionList);
  };

  return (
    <div className="flex flex-col items-center mt-64 min-h-screen gap-12 md:w-2/3 lg:w-1/2">
      <div className="text-title text-9xl font-title font-bold">Guggal</div>
      <div className="relative w-full">
        <input
          type="search"
          id="default-search"
          className={`p-4 pl-10 w-full text-lg text-gray-900 ${
            searching ? "bg-gray-50" : "bg-gray-100"
          } rounded-3xl ${
            searching && "rounded-b-none"
          } border focus:border-2 focus:border-tertiary focus:outline-none`}
          placeholder="Search Mockups, Logos..."
          required
          ref={searchRef}
        />
        {searching && (
          <ul className="w-full text-lg text-gray-900 bg-gray-50 rounded-3xl rounded-t-none border focus:border-2 focus:border-tertiary focus:outline-none">
            {suggetionList.map((item) => {
              return <li className="py-2 pl-10 w-full">{item}</li>;
            })}
          </ul>
        )}
        {/* <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-title"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div> */}
      </div>
    </div>
  );
};

export default Search;
