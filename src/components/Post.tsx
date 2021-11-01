import React from "react";
import { WordpressPost } from "../model/WordpressPost";
import ReactHtmlParser from "react-html-parser";
import classes from "./Post.module.css";

interface PostProps {
  post: WordpressPost;
}

export class Post extends React.Component<PostProps, {}> {
  private renderDate() {
    const date = new Date(this.props.post.date);
    return `${("0" + date.getDate()).slice(-2)}.${(
      "0" +
      (date.getMonth() + 1)
    ).slice(-2)}.${date.getFullYear()}`;
  }

  public render() {
    return (
      <div className={classes.post}>
        <img
          className={classes.postImg}
          src={
            this.props.post._embedded["wp:featuredmedia"][0].media_details.sizes
              .full.source_url
          }
        />
        <h3 className={classes.postTitle}>{this.props.post.title.rendered}</h3>
        <p className={classes.postExcerpt}>
          {ReactHtmlParser(this.props.post.excerpt.rendered)}
        </p>
        <div className={classes.postDateLink}>
          <div className={classes.postDate}>🕑 {this.renderDate()}</div>
          <div className={classes.postLink}>
            🌐 <a href={this.props.post.link}>{this.props.post.link}</a>
          </div>
        </div>
      </div>
    );
  }
}
