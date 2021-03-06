import React from "react";
import Link from "gatsby-link";
import lodash from "lodash";
import {LayoutContext} from "../../layouts/layout-context";

class Hit extends React.Component {
  render() {
    const {hit} = this.props;
    return (
      <LayoutContext.Consumer>
        {({toggleSearch}) => (
          <div>
            <Link className="search-result my-2" to={`/${lodash.kebabCase(hit.frontmatter.slug)}`} onClick={toggleSearch}>
              {hit.frontmatter.title}
            </Link>
            <span>
                {hit.frontmatter.category} : {hit.frontmatter.tags.join(', ')}
            </span>  
          </div>
        )}
      </LayoutContext.Consumer> 
    );
  }
};

export default Hit;