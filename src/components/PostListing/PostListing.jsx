import React from "react";
import Link from "gatsby-link";
import PostTags from "../PostTags/PostTags";  

class PostListing extends React.Component {
  getPostList() {
    console.log(this.props.postEdges);
    const postList = [];
    this.props.postEdges.forEach(postEdge => {
      postList.push({
        path: postEdge.node.fields.slug,
        tags: postEdge.node.frontmatter.tags,
        cover: postEdge.node.frontmatter.cover,
        title: postEdge.node.frontmatter.title,
        date: postEdge.node.frontmatter.date,
        excerpt: postEdge.node.excerpt,
        timeToRead: postEdge.node.timeToRead, 
        html: postEdge.node.html
      });
    });
    return postList;
  }
  render() {
    const postList = this.getPostList();
    return (
      <div>
        {/* Your post list here. */
          postList.map(post => drawPost(post))
        }
      </div>
    );
  }
}

const drawPost= (post) => (
  <div key={post.path} className="snippet">
    <div className="snippet__header">
      <Link className="no-underline" to={post.path} key={post.title}>
        <h1 className="snippet__title">{post.title}</h1>
      </Link>
      <PostTags tags={post.tags} />
    </div>
    <div dangerouslySetInnerHTML={{ __html: post.html }} />
  </div>
);
  

export default PostListing;