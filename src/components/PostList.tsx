import React from "react";
import { WordpressPost } from "../model/WordpressPost";
import { Post } from "./Post";

interface PostListProps {
  posts: WordpressPost[];
}

export class PostList extends React.Component<PostListProps, {}> {
  render() {
    return (
      <ul>
        {this.props.posts.map((post) => {
          return <Post post={post}></Post>;
        })}
      </ul>
    );
  }
}
