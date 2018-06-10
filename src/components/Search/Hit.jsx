import React from "react";
import Link from "gatsby-link";
import {LayoutContext} from "../../layouts/layout-context";

class Hit extends React.Component {
  constructor(props){
    super(props);
    console.log(this.props.toggleSearch)
    this.toggleSearch = this.props.toggleSearch;
  }
  render() {
    const {hit} = this.props;
    console.log(this.props);
    return (
      <LayoutContext.Consumer>
        {({toggleSearch}) => (
          <Link className="search-result" to={hit.frontmatter.slug} onClick={toggleSearch}>
            {hit.frontmatter.title}
          </Link>
      )}
      </LayoutContext.Consumer> 
    );
  }
};

export default Hit;