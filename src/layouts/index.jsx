import React from "react";
import Helmet from "react-helmet";
import config from "../../data/SiteConfig";
import Header from "./Header";
import Footer from "./Footer";
import "./index.css";
import "../styles/main.scss";

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
  getCategories() {
    const categories = new Set(
        this.props.data.allMarkdownRemark.edges
          .map(edge => edge.node.frontmatter.category)
    );
    return Array.from(categories);
  }
  render() {
    const { children } = this.props; 
    const categories = this.getCategories();
    return (
      <div>
        <Helmet>
          <title>{`${config.siteTitle} |  ${this.getLocalTitle()}`}</title>
          <meta name="description" content={config.siteDescription} />
        </Helmet>
        
        <Header categories={categories}/>
        {children()}
        <Footer/>
      </div>
    );
  }
};


/* eslint no-undef: "off"*/
export const postCategoriesAndTags = graphql`
  query IndexQuery2 {
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
