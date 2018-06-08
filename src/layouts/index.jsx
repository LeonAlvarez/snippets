import React from "react";
import Helmet from "react-helmet";
import config from "../../data/SiteConfig";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";  
import "./index.css";
import "../styles/main.scss"; 
import "../../node_modules/prismjs/themes/prism-tomorrow.css";
import "prismjs/plugins/keep-markup/prism-keep-markup.js";

export default class MainLayout extends React.Component {
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
    const {edges} = this.props.data.allMarkdownRemark;
    return this.groupBy(edges , edge => edge.node.frontmatter.category);
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
  groupBy(items , f) {
    return items.reduce((l, e, o, n, x = f(e)) => ((l[x] || (l[x] = [])).push(e), l), {});
  }
  render() {
    console.log(this.getNestedMenu());
    const { children } = this.props; 
    const categories = this.getCategories();
    const tags = this.getTags();
    return (
      <div>
        <Helmet>
          <title>{`${config.siteTitle} |  ${this.getLocalTitle()}`}</title>
          <meta name="description" content={config.siteDescription} />
        </Helmet>
        <Header categories={categories} />
        <div className="min-h-screen md:flex">
          <Sidebar tags={tags} />
          {children()}
        </div>
        <Footer tags={tags} />
      </div>
    );
  }
};


/* eslint no-undef: "off"*/
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
  }
`;
