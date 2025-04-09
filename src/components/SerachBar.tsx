// components/SearchBar.tsx
import React from "react";

interface Props {
  searchText: string;
  setSearchText: (text: string) => void;
}

const SearchBar: React.FC<Props> = ({ searchText, setSearchText }) => {
  return (
    <div className="">
      <input
        type="text"
        placeholder="Search blogs..."
        className="input input-bordered w-full "
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
