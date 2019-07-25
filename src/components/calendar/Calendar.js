import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interaction from "@fullcalendar/interaction";
import Airtable from "airtable";

import "./Calendar.css";
import "./main.scss";

class Calendar extends Component {
  state = {
    allEvents: [
      { id: 1, title: 500, date: "2019-07-01", cancelButton: true },
      { id: 2, title: 350, date: "2019-07-02", cancelButton: true }
    ],
    isLoading: true
  };

  handleDateClick = arg => {
    let element = arg.dayEl;
    console.log(arg);
    let price = prompt("Please enter price of stock");
    if (price !== null) {
      if (isNaN(price)) {
        alert("Must enter a valid number");
      } else {
        this.setState({
          allEvents: [
            ...this.state.allEvents,
            {
              id: 3,
              title: parseInt(price),
              date: arg.dateStr,
              cancelButton: true
            }
          ]
        });
        element.innerHTML +=
          "<div style='position:reletive;'><button type='button' id='btnDeleteEvent'>X</button></div>";
      }
    }
  };

  handleEventClick = arg => {
    this.setState({
      allEvents: this.state.allEvents.filter(
        a => a.id !== parseInt(arg.event.id)
      )
    });
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
