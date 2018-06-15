import React from "react";
import { InstantSearch, Pagination, Configure } from "react-instantsearch/dom";
import ConnectedWithQueryMatching from "./ConnectedWithQueryMatching";

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
            <Configure hitsPerPage={5} />
            <ConnectedWithQueryMatching />
          </InstantSearch>
        )}
      </div> 
    );
  }
};

export default Search;