import React from "react";
import { InstantSearch, Hits, RefinementList, Pagination, Configure } from "react-instantsearch/dom";
import SearchBox from "./SearchBox";
import SearchInput from "./SearchInput";
import Hit from "./Hit";

class Search extends React.Component {
  render() {
    const {algolia} = this.props;
    return (
      <div className="search">
        { (
          <InstantSearch
            appId={algolia.appId}
            apiKey={algolia.searchOnlyApiKey}
            indexName={algolia.indexName}
            render={false}
          >
            <Configure hitsPerPage={20} />
            <SearchBox />
            <div className="twoColumns">
              <RefinementList attribute="brand" />
              <Hits hitComponent={Hit} />
            </div>
            <div style={{ textAlign: "center" }}>
              <Pagination />
            </div>
          </InstantSearch>
        )}
      </div> 
    );
  }
};

export default Search;