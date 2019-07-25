import React, { Component } from "react";
import "./App.css";
import Calendar from "./components/calendar/Calendar";

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Calendar />
      </div>
    );
  }
}
