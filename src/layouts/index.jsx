import React from "react";
import Helmet from "react-helmet";
import config from "../../data/SiteConfig";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";  
import "./index.css";
import "../styles/algolia.css";
import "../styles/main.scss"; 
import "../../node_modules/prismjs/themes/prism-tomorrow.css";
import "prismjs/plugins/keep-markup/prism-keep-markup.js";
import {LayoutContext} from "./layout-context";

export default class MainLayout extends React.Component {
  constructor(props) {
    super(props);
    this.toggleSearch = () => {
      this.setState(state => ({searchOpened:!state.searchOpened}));
    };
    this.state = {
      sidebarOpened: false,
      searchOpened: false,
      toggleSearch: this.toggleSearch
    };  
    this.toggleSidebar = this.toggleSidebar.bind(this);
  }
  getLocalTitle() {
    function capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const pathPrefix = config.pathPrefix ? config.pathPrefix : "/";
    const currentPath = this.props.location.pathname
      .replace(pathPrefix, "")
      .replace("/", "");
    let title = "";
    if (currentPath === "") {
      title = "Home";
    } else if (currentPath === "tags/") {
      title = "Tags";
    } else if (currentPath === "categories/") {
      title = "Categories";
    } else if (currentPath === "about/") {
      title = "About";
    } else if (currentPath.indexOf("posts")) {
      title = "Article";
    } else if (currentPath.indexOf("tags/")) {
      const tag = currentPath
        .replace("tags/", "")
        .replace("/", "")
        .replace("-", " ");
      title = `Tagged in ${capitalize(tag)}`;
    } else if (currentPath.indexOf("categories/")) {
      const category = currentPath
        .replace("categories/", "")
        .replace("/", "")
        .replace("-", " ");
      title = `${capitalize(category)}`;
    }
    return title;
  }
  getNestedMenu() {
    const data =  this.props.data.allMarkdownRemark.edges
    .map(edge => {
      const {category, tags} = edge.node.frontmatter;
      return {category, tags};     
    });
    const categories =  groupBy(data , el => el.category);
    return Object.entries(categories)
    .map( category => ({
      category: category[0],
      tags: Array.from(new Set([].concat(...category[1].map( cat => cat.tags))))
    }));  
  } 
  getCategories() {
    const categories = new Set(
        this.props.data.allMarkdownRemark.edges
          .map(edge => edge.node.frontmatter.category)
    );
    return Array.from(categories);
  }
  getTags() {
    const tags = new Set(
      [].concat(...this.props.data.allMarkdownRemark.edges
          .map(edge => edge.node.frontmatter.tags))
    );
    return Array.from(tags);
  }
  toggleSidebar() {
    this.setState({
      sidebarOpened: !this.state.sidebarOpened  
    });
  }
  
  render() {
    const { children } = this.props; 
    const categories = this.getCategories();
    const menuItems = this.getNestedMenu();
    const tags = this.getTags();
    const {algolia} = this.props.data.site.siteMetadata;
    return (
      <LayoutContext.Provider value={this.state}>
        <div>
          <Helmet>
            <title>{`${config.siteTitle} |  ${this.getLocalTitle()}`}</title>
            <meta name="description" content={config.siteDescription} />
          </Helmet>
          <Header algolia={algolia} toggleSidebar={this.toggleSidebar} categories={categories} />
          <div className="min-h-screen main-container md:flex">
            <Sidebar toggleSidebar={this.toggleSidebar} opened={this.state.sidebarOpened} tags={tags} menuItems={menuItems} />
            {children()}
          </div>
        </div>
      </LayoutContext.Provider>
    );
  }
};

/* eslint-disable */
export const groupBy = (items , f) => items
  .reduce((l, e, o, n, x = f(e)) => ((l[x] || (l[x] = [])).push(e), l), {});
/* eslint-enable */

/* eslint no-undef: "off" */
export const postCategoriesAndTags = graphql`
  query postCategoriesAndTagsQuery {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            category
            tags
            title
          }
        }
      }
    }
    site {
      siteMetadata {
        algolia {
          appId
          searchOnlyApiKey
          indexName
        }
      }
    }
  }
`;
