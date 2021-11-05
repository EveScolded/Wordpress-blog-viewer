import React from "react";
import Button from "./Button";
import classes from "./SideBar.module.css";

interface SideBarProps {
  addNewDomain: (domain: string) => void;
  domainList: string[];
}

interface SideBarState {
  deleteButtons: boolean;
}

export default class SideBar extends React.Component<
  SideBarProps,
  SideBarState
> {
  constructor(props) {
    super(props);
    this.state = {
      deleteButtons: false,
    };
  }

  inputConfirm = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      this.props.addNewDomain(e.target.value);
      e.target.value = "";
    }
  };

  showDeleteButtons = () => {
    this.setState({
      deleteButtons: !this.state.deleteButtons,
    });
  };

  deleteDomainHandler = () => {};

  render() {
    return (
      <div className={classes.sideBar}>
        <form>
          <label>Add domain</label>
          <input onKeyDown={this.inputConfirm}></input>
        </form>
        <div className={classes.domainList}>
          Added domain:
          <Button onClick={this.showDeleteButtons}>edit</Button>
        </div>
        <ul>
          {this.props.domainList.map((domain) => {
            return (
              <>
                <li>{domain}</li>
                {this.state.deleteButtons && (
                  <Button onClick={this.deleteDomainHandler}>x</Button>
                )}
              </>
            );
          })}
        </ul>
      </div>
    );
  }
}
