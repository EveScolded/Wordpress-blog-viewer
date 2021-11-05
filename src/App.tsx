import React from "react";
import "./App.css";
import { PostList } from "./components/PostList";
import SideBar from "./components/SideBar";
import Wordpress from "./dataSources/Wordpress";
import { WordpressPost } from "./model/WordpressPost";

interface AppState {
  posts: WordpressPost[];
  domainsList: string[];
}

//React.Component<{} - typ propsów, AppState - typ state>
class App extends React.Component<{}, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      domainsList: [],
    };
  }

  getPosts(domain) {
    new Wordpress(domain).getPosts().then((posts) => {
      const newPostsList = [...this.state.posts, ...posts].sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });

      this.setState({ posts: newPostsList });
    });
  }

  componentDidMount() {
    const existingDomains = eval(localStorage.getItem("domains"));
    this.setState({ domainsList: existingDomains });

    existingDomains.forEach((domain) => {
      this.getPosts(domain);
    });
  }

  addNewDomain = (domain) => {
    const existingDomains = eval(localStorage.getItem("domains"));

    if (!existingDomains.includes(domain)) {
      const newDomainsList = existingDomains
        ? [...existingDomains]
        : [...this.state.domainsList];

      newDomainsList.push(domain);
      this.setState({ domainsList: newDomainsList });
    } else {
      alert("Domain already exsists.");
    }

    this.state.domainsList.forEach((domain) => {
      this.getPosts(domain);
    });

    localStorage.setItem("domains", JSON.stringify(this.state.domainsList));
  };

  public render() {
    return (
      <div className="App">
        <header className="App-header">Amazing post viewer</header>

        <SideBar
          addNewDomain={this.addNewDomain}
          domainList={this.state.domainsList}
        />
        <PostList posts={this.state.posts}></PostList>
      </div>
    );
  }
}

export default App;
