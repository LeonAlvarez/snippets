import React from "react";
import Link from "gatsby-link";
import lodash from "lodash";
import config from "../../data/SiteConfig";
import SearchModalWindow from "../components/Search/SearchModalWindow"
import FaSearch from "react-icons/lib/fa/search";
import {LayoutContext} from "./layout-context";

class Header extends React.Component {
  renderMenuItem(item) {
    const link = { path: item , label : item.toUpperCase()};
    return (
      <Link
        to={`/categories/${lodash.kebabCase(link.path)}`} key={link.path}
        className="block mt-4 md:inline-block md:mt-0 mr-6 no-underline text-white"
      >
        {link.label}
      </Link>);
  }
  render() {
    return ( 
      <LayoutContext.Consumer>
         {({searchOpened, toggleSearch}) => (
          <nav className="header">
            <div className="flex flex-wrap items-center justify-between max-w-xl mx-auto p-4 md:p-8">
              <Link to="/" className="flex items-center no-underline">
                <span className="font-bold text-xl tracking-tight text-white">
                  {config.siteTitle}
                </span>
              </Link>
              <button onClick={this.props.toggleSidebar} className="block md:hidden border border-white flex items-center px-3 py-2 rounded">
                <svg
                  className="fill-current h-3 w-3"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Menu</title>
                  <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
              </button>
              <div
                id="nav"
                className="hidden md:flex md:items-center w-full md:w-auto"
              >
                <div className="text-sm">
                    <button onClick={toggleSearch}>
                      <FaSearch/>
                    </button> 
                    <SearchModalWindow searchOpened={searchOpened} toggleSearch={toggleSearch} algolia={this.props.algolia} />    
                  {
                    this.props.categories.map(category => this.renderMenuItem(category))
                  }
                </div>
              </div>
            </div>
          </nav>
          )}
      </LayoutContext.Consumer>
    );
  }
};

export default Header;

