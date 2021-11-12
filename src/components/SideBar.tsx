import React from "react";
import Button from "./Button";
import classes from "./SideBar.module.css";

interface SideBarProps {
  addNewDomain: (domain: string) => void;
  deleteDomain: (index: number) => void;
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

  private inputConfirm = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      this.props.addNewDomain(e.target.value);
      e.target.value = "";
    }
  };

  private showDeleteButtons = () => {
    this.setState({
      deleteButtons: !this.state.deleteButtons,
    });
  };

  private deleteDomainHandler = (index) => {
    this.props.deleteDomain(index);
    this.setState({
      deleteButtons: !this.state.deleteButtons,
    });
  };

  public render() {
    return (
      <div className={classes.sideBar}>
        <form className={classes.domainForm}>
          <label>Add domain</label>
          <input
            className={classes.domainInput}
            onKeyDown={this.inputConfirm}
          ></input>
        </form>
        <div className={classes.domainList}>
          Added domain:
          <Button onClick={this.showDeleteButtons}>edit</Button>
        </div>
        <ul>
          {this.props.domainList.map((domain, index) => {
            return (
              <>
                <li>{domain}</li>
                {this.state.deleteButtons && (
                  <Button onClick={() => this.deleteDomainHandler(index)}>
                    x
                  </Button>
                )}
              </>
            );
          })}
        </ul>
      </div>
    );
  }
}
