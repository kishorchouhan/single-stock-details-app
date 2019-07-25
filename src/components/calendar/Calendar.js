import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interaction from "@fullcalendar/interaction";

import "./Calendar.css";
import "./main.scss";

class Calendar extends Component {
  // state = {
  //   stockPriceData: [],
  //   addButton: true,
  //   deleteButton: true
  // };

  state = {
    allEvents: [
      { id: 1, title: "event 1", date: "2019-07-01" },
      { id: 2, title: "event 2", date: "2019-07-02" }
    ]
  };

  handleDateClick = arg => {
    // console.log(arg);
    // arg.dayEl.style.backgroundColor = "red";
    this.setState(state => ({
      allEvents: [...state.allEvents, { title: "event", date: arg.dateStr }]
    }));
    // console.log(this.state);
  };

  handleEventClick = arg => {
    console.log(arg);
    this.setState(state => ({
      allEvents: state.allEvents.filter(
        event => event.title !== arg.event._def.title
      )
    }));
  };

  render() {
    return (
      <div className="calendar">
        <div>
          <h1>Calendar</h1>
        </div>
        <FullCalendar
          defaultView="dayGridMonth"
          plugins={[dayGridPlugin, interaction]}
          events={this.state.allEvents}
          dateClick={this.handleDateClick}
          eventClick={this.handleEventClick}
        />
      </div>
    );
  }
}

export default Calendar;
