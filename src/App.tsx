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
    const existingDomains = JSON.parse(localStorage.getItem("domains"));
    this.setState({ domainsList: existingDomains });

    existingDomains.forEach((domain) => {
      this.getPosts(domain);
    });
  }

  addNewDomain = (domain) => {
    const existingDomains = localStorage.getItem("domains");

    if (!existingDomains.includes(domain)) {
      const newDomainsList = existingDomains
        ? [...JSON.parse(existingDomains)]
        : [...this.state.domainsList];

      newDomainsList.push(domain);

      this.setState({ domainsList: newDomainsList }, () =>
        localStorage.setItem("domains", JSON.stringify(this.state.domainsList))
      );

      this.getPosts(domain);
    } else {
      alert("Domain already exsists.");
    }
  };

  deleteDomain = (index) => {
    const newDomainsList = [...this.state.domainsList];
    newDomainsList.splice(index, 1);

    this.setState({ domainsList: newDomainsList });

    this.state.domainsList.forEach((domain) => {
      this.getPosts(domain);
    });

    localStorage.setItem("domains", JSON.stringify(this.state.domainsList));
  };

  public render() {
    return (
      <>
        <header className="appHeader">Amazing post viewer</header>
        <div className="app">
          <div className="sideBar">
            <SideBar
              addNewDomain={this.addNewDomain}
              domainList={this.state.domainsList}
              deleteDomain={this.deleteDomain}
            />
          </div>
          <div className="postList">
            <PostList posts={this.state.posts}></PostList>
          </div>
        </div>
      </>
    );
  }
}

export default App;
