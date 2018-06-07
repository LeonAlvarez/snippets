import React from "react";
import Link from "gatsby-link";
import lodash from "lodash";
import config from "../../data/SiteConfig";

class Sidebar extends React.Component {
  renderMenuItem(item) {
    const link = { path: item, label: item.toUpperCase() };
    return (
      <Link
        to={`/tags/${lodash.kebabCase(link.path)}`} key={link.path}
        className="block p-4 text-white font-bold border-purple hover:bg-grey-lighter border-l-4"
      >
        {link.label}
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
