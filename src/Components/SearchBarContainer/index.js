import SearchBar from "./searchBar";
import "./style.css";

const SearchBarContainer = ({ onSearch }) => (
  <div className='search-container'>
    <h1>News Lister</h1>
    <SearchBar onSearch={onSearch} margin='4rem' />
  </div>
);

export default SearchBarContainer;
