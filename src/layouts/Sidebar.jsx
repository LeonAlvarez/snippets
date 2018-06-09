import React from "react";
import Link from "gatsby-link";
import lodash from "lodash";

class Sidebar extends React.Component {
  render() {
    console.log(this.props.menuItems);
    return (
      <div className={`${this.props.opened ? 'open' : ''} sidebar shadow fixed w-64`}>
        <ul className="list-reset">
          {this.props.menuItems.map(menuItem => renderMenuCategory(menuItem, this.props.toogleeSidebar))}
        </ul>
      </div>
    );
  }
}
export const renderMenuCategory = (item, onClickHandler) => (
  <li key={item.slug}>
    <Link
      to={`/categories/${lodash.kebabCase(item.category)}`} 
      onClick={onClickHandler}
      className="block capitalize no-underline p-4 m-1 text-white text-base font-medium hover:text-teal-light"
    >
      {item.category}
    </Link>
    <ul>
      {item.tags.map(tag => renderSubMenuItem(tag, onClickHandler))}
    </ul>
  </li>
);

export const renderSubMenuItem = (item, onClickHandler) => (
  <Link
    to={`/tags/${lodash.kebabCase(item)}`} 
    key={item}
    onClick={onClickHandler}
    className="block capitalize no-underline p-2 my-2 text-white text-base font-medium border-grey-darker hover:text-teal-light hover:border-pink-lighter hover:bg-indigo-dark border-l-2"
  >
    {item}
  </Link>
);

export default Sidebar;
