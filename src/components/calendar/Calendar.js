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
    allEvents: [],
    isLoading: true
  };

  componentDidMount() {
    let self = this;
    base("stock data")
      .select({
        fields: ["id", "title", "date"],
        view: "Grid view",
        sort: [{ field: "id", direction: "asc" }]
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach(function(record) {
            self.setState({
              allEvents: [...self.state.allEvents, record.fields]
            });
          });
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
        base("stock data").create(
          {
            id: parseInt(arg.dateStr.slice(8)),
            title: parseInt(price),
            date: arg.dateStr
          },
          function(err, record) {
            if (err) {
              console.error(err);
              return;
            }
            console.log(record.getId());
          }
        );

        // this.setState({
        //   allEvents: [
        //     ...this.state.allEvents,
        //     {
        //       id: 3,
        //       title: parseInt(price),
        //       date: arg.dateStr
        //     }
        //   ]
        // });
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
