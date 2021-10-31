import React from "react";
import { WordpressPost } from "../model/WordpressPost";
import ReactHtmlParser from "react-html-parser";
import { classicNameResolver } from "typescript";
import classes from "./Post.module.css";

interface PostProps {
  post: WordpressPost;
}

export class Post extends React.Component<PostProps, {}> {
  private renderDate() {
    const date = new Date(this.props.post.date);
    return `${date.getDay()}.${date.getMonth() + 1}.${date.getFullYear()}`;
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
        <div>
          {this.renderDate()}
          {this.props.post.link}
        </div>
      </div>
    );
  }
}
