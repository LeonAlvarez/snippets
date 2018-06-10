import React from "react";
import Search from "./Search";
import {LayoutContext} from "../../layouts/layout-context";

class SearchModalWindow extends React.Component {
  render() {
    return (
      <LayoutContext.Consumer>
        {({searchOpened}) => (
          <div className={`search-container ${searchOpened ? 'open' : ''}`}>
            <Search algolia={this.props.algolia} />
          </div>
        )}
      </LayoutContext.Consumer>  
    );
  }
};

export default SearchModalWindow;