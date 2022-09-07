import React from "react";
import ReactDOM from "react-dom";

const modalRoot = document.getElementById("portal") as HTMLElement;

export default class Modal extends React.Component<{
  children?: React.ReactNode;
}> {
  el: HTMLElement = document.createElement("div");

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    const { children } = this.props;
    const { el } = this;
    return ReactDOM.createPortal(children, el);
  }
}
