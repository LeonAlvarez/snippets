import React from "react";
import Link from "gatsby-link";
import lodash from "lodash";
import config from "../../data/SiteConfig";

class Sidebar extends React.Component {
  renderMenuItem(item) {
    return (
      <Link
        to={`/tags/${lodash.kebabCase(item)}`} key={item}
        className="block capitalize no-underline p-4 m-1 text-white text-base font-medium border-grey-darker hover:text-teal-light hover:border-pink-lighter hover:bg-indigo-dark border-l-2"
      >
        {item}
      </Link>
    ); 
  }
  render() {
    return (
      <div className="sidebar shadow w-64 my-2">
        <ul className="list-reset">
        {
          this.props.tags.map(tag => this.renderMenuItem(tag))
        }
        </ul>
      </div>
    );
  }
}

export default Sidebar;
