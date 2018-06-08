import React, { Component } from "react";
import _ from "lodash";
import Link from "gatsby-link";

class PostTags extends Component {
  render() {
    const { tags } = this.props;
    return (
      <div className="post-tag-container">
        {tags &&
          tags.map(tag => (
            <Link
              key={tag}
              style={{ textDecoration: "none" }}
              to={`/tags/${_.kebabCase(tag)}`}
            >
              <button className="py-2 mr-2 px-4 mt-2 text-sm font-black border border-indigo-dark hover:border-indigo-darkest text-indigo-darker bg-white uppercase rounded">{tag}</button>
            </Link>
          ))}
      </div>
    );
  }
}

export default PostTags;
