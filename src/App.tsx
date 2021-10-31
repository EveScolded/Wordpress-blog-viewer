import React from "react";
import "./App.css";
import { PostList } from "./components/PostList";
import Wordpress from "./dataSources/Wordpress";
import { WordpressPost } from "./model/WordpressPost";

interface AppState {
  posts: WordpressPost[];
}

//React.Component<{} - typ propsów, AppState - typ state>
class App extends React.Component<{}, AppState> {
  private provider = new Wordpress("https://elnathsoft.pl");
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    this.provider.getPosts().then((posts) => this.setState({ posts: posts }));
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">Amazing post viewer</header>
        <PostList posts={this.state.posts}></PostList>
      </div>
    );
  }
}

export default App;
