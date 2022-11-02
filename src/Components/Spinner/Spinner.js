import React, { Component } from "react";
import image from "./images/tenor.gif";

export default class Spinner extends Component {
  render() {
    return (
        <div className="text-center">
            <img style={{width : "200px"}} src={image} alt="load" />
        </div>
    );
  }
}