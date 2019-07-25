import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interaction from "@fullcalendar/interaction";
import Airtable from "airtable";

import "./Calendar.css";
import "./main.scss";

var base = new Airtable({ apiKey: "keyEZdZTfWR3FMc3E" }).base(
  "appfzSNTFcqqjf25D"
);

class Calendar extends Component {
  state = {
    allEvents: [
      { id: 1, title: 500, date: "2019-07-01", cancelButton: true },
      { id: 2, title: 350, date: "2019-07-02", cancelButton: true }
    ],
    isLoading: true
  };

  componentDidMount() {
    base("stock data")
      .select({
        // Selecting the first 3 records in Grid view:
        maxRecords: 3,
        view: "Grid view"
      })
      .eachPage(
        function page(records, fetchNextPage) {
          // This function (`page`) will get called for each page of records.

          records.forEach(function(record) {
            console.log("Retrieved", record.get("id"));
          });

          // To fetch the next page of records, call `fetchNextPage`.
          // If there are more records, `page` will get called again.
          // If there are no more records, `done` will get called.
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            console.error(err);
            return;
          }
        }
      );
  }

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
