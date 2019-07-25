import React, { Component } from "react";
import "./App.css";
import Calendar from "./components/calendar/Calendar";
import MaxProfit from "./components/reportPanel/MaxProfit";
import Chart from "./components/reportPanel/Chart";
import BuySellDate from "./components/reportPanel/BuySellDate";

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Calendar />
        <div className="report-panel">
          <h1>Report</h1>
          <MaxProfit />
          <Chart />
          <BuySellDate />
        </div>
      </div>
    );
  }
}
