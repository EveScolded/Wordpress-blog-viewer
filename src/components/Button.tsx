import React from "react";
import classes from "./Button.module.css";

interface ButtonProps {
  onClick: () => void;
}

export default class Button extends React.Component<ButtonProps, {}> {
  public render() {
    return (
      <button className={classes.button} onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}
