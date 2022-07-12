import React, { useEffect, useState } from "react";
import "./App.css";
import SearchBarContainer from "./Components/SearchBarContainer";
import SearchBar from "./Components/SearchBarContainer/searchBar";
import SearchResults from "./Components/SearchResults";
import useFetch from "./Hooks/useFetch";

function App() {
  const [searchText, setSearchText] = useState("");
  const [page, setpage] = useState(1);
  const [results, setResults] = useState([]);
  const [totalPage, setTotalPage] = useState(0);

  const { data, error, loading } = useFetch(
    searchText
      ? `https://content.guardianapis.com/search?api-key=test&q=${searchText}&show-fields=thumbnail,headline&show-tags=keyword&page=${page}&page-size=10`
      : ""
  );

  useEffect(() => {
    if (data?.response?.results) {
      const res = data.response.results.map((result) => ({
        label: result.webTitle,
        thumbnail: result.fields.thumbnail,
        tags: result.tags.map((tag) => tag.webTitle),
        url: result.webUrl,
      }));
      setResults(res);
      setTotalPage(data.response.pages);
    }
  }, [data]);
  return (
    <div className='App'>
      {searchText ? (
        <>
          <SearchBar searchText={searchText} onSearch={setSearchText} />
          <SearchResults
            results={results}
            loading={loading}
            page={page}
            setpage={setpage}
            totalPage={totalPage}
            setNewTag={setSearchText}
            searchedText={searchText}
          />
        </>
      ) : (
        <SearchBarContainer onSearch={setSearchText} />
      )}
    </div>
  );
}

export default App;
