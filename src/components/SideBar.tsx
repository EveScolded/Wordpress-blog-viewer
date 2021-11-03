import React from "react";
import Button from "./Button";
import classes from "./SideBar.module.css";

interface SideBarProps {
  addNewDomain: (domain: string) => void;
  domainList: string[];
}

export default class SideBar extends React.Component<SideBarProps, {}> {
  inputConfirm = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      this.props.addNewDomain(e.target.value);
    }
    e.target.value = "";
  };

  showDeleteButtons = () => {};

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
          {this.props.domainList.map((domain) => (
            <li>{domain}</li>
          ))}
        </ul>
      </div>
    );
  }
}
