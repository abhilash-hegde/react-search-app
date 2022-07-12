import { AutoComplete, Input } from "antd";
import { useEffect, useState } from "react";
import useFetch from "../../Hooks/useFetch";
import debounce from "../../helper/debounce";
import "./style.css";
import "antd/lib/auto-complete/style/css";
import "antd/lib/input/style/css";

const SearchBar = ({ onSearch, searchText = "", margin = "1rem" }) => {
  const [options, setOptions] = useState([]);
  const [input, setInput] = useState("");

  const { data, error, loading } = useFetch(
    input
      ? `https://content.guardianapis.com/tags?show-references=all&api-key=test&type=keyword&web-title=${input}`
      : ""
  );

  useEffect(() => {
    if (data?.response?.results) {
      const res = data.response.results.map((result) => ({
        label: result.webTitle,
        value: result.webTitle,
      }));
      setOptions(res);
    }
  }, [data]);

  const onSearchChange = debounce((value) => {
    setInput(value);
  });

  return (
    <AutoComplete
      dropdownClassName='news-search-dropdown'
      dropdownMatchSelectWidth={500}
      className='news-search-input'
      style={{
        margin: margin,
        width: "calc(100vw - 8rem)",
        maxWidth: "500px",
      }}
      options={options}
    >
      <Input.Search
        size='large'
        defaultValue={searchText}
        onChange={({ target }) => onSearchChange(target.value)}
        onSearch={onSearch}
        placeholder='Enter search text..'
      />
    </AutoComplete>
  );
};

export default SearchBar;
