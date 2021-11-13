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

  private getPosts(domain) {
    return new Wordpress(domain).getPosts().then((posts) => {
      const newPostsList = [...this.state.posts, ...posts].sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });

      this.setState({ posts: newPostsList });
    });
  }

  public componentDidMount() {
    const existingDomains = JSON.parse(localStorage.getItem("domains"));

    if (existingDomains) {
      this.setState({ domainsList: existingDomains });
      existingDomains.forEach((domain) => {
        this.getPosts(domain);
      });
    }
  }

  private addNewDomain = async (domain) => {
    const existingDomains = localStorage.getItem("domains");

    if (
      !existingDomains ||
      (existingDomains && !existingDomains.includes(domain))
    ) {
      try {
        await this.getPosts(domain);

        const newDomainsList = existingDomains
          ? [...JSON.parse(existingDomains)]
          : [...this.state.domainsList];

        newDomainsList.push(domain);

        this.setState({ domainsList: newDomainsList }, () =>
          localStorage.setItem(
            "domains",
            JSON.stringify(this.state.domainsList)
          )
        );
      } catch (error) {
        alert("Incorrect domain!");
        console.log(error.message);
      }
    } else {
      alert("Domain already exsists.");
    }
  };

  private deleteDomain = (domain, index) => {
    const newDomainsList = [...this.state.domainsList];
    newDomainsList.splice(index, 1);
    this.setState({ domainsList: newDomainsList }, () =>
      localStorage.setItem("domains", JSON.stringify(this.state.domainsList))
    );

    const existingPosts = [...this.state.posts];
    const filteredPosts = existingPosts.filter(
      (post) => !post.link.includes(domain)
    );
    this.setState({ posts: filteredPosts });
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
            {this.state.posts.length ? (
              <PostList posts={this.state.posts}></PostList>
            ) : this.state.domainsList.length ? (
              <div className="dot-overtaking"></div>
            ) : (
              <p>Add domain to view posts.</p>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default App;
