import React from "react";
import { Tag, List } from "antd";
import "antd/lib/list/style/css";
import "antd/lib/tag/style/css";

const SearchResults = ({
  results,
  loading,
  page,
  setPage,
  totalPage,
  setNewTag,
  searchedText,
}) => {
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };
  return (
    <List
      loading={loading}
      itemLayout='vertical'
      size='large'
      pagination={{
        onChange: setPage,
        total: totalPage,
        current: page,
        pageSize: 10,
        showSizeChanger: false,
        hideOnSinglePage: true,
      }}
      locale={{
        emptyText: loading ? "Loading..." : "No results found",
      }}
      style={{
        textAlign: "start",
      }}
      dataSource={results}
      header={<h3>Results for {searchedText}</h3>}
      renderItem={(item) => (
        <List.Item
          key={item.label}
          actions={item.tags.map((tag) => (
            <Tag
              style={{
                cursor: "pointer",
              }}
              onClick={() => setNewTag(tag)}
            >
              {tag}
            </Tag>
          ))}
          extra={
            <img
              style={{
                cursor: "pointer",
              }}
              width={200}
              height={100}
              alt='logo'
              src={item.thumbnail}
              onClick={() => openInNewTab(item.url)}
            />
          }
        >
          <h3
            style={{
              cursor: "pointer",
            }}
            onClick={() => openInNewTab(item.url)}
          >
            {item.label}
          </h3>
        </List.Item>
      )}
    />
  );
};

export default SearchResults;
