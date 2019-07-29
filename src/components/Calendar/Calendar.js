import React, { Component } from "react";
import Calendar from "react-calendar";
import { base } from "../../airtable";

import classes from "./Calendar.module.scss";

class CalenderComponent extends Component {
  state = {
    data: null,
    month: 0
  };
  async componentDidMount() {
    // const start = new Date(2019, 6, 30).toString();
    // console.log(start);
    let r = {};
    let month;
    await base("Table 1")
      .select({
        // Selecting the first 3 records in Grid view:
        view: "Grid view"
        // filterByFormula: `AND(IS_AFTER('7/1/2019', TODAY())`
      })
      .eachPage(
        (records, fetchNextPage) => {
          // This function (`page`) will get called for each page of records.
          // console.log(records);

          records.forEach(function(record) {
            // console.log("Retrieved", record);
            let day = record.fields.Day;
            day = +day.substring(day.length - 2, day.length);
            r[day] = { ...record["fields"], id: record["id"] };
          });

          month = records[0].fields.Day;
          month = +month.substring(month.length - 5, month.length - 3);

          this.setState((prevState, props) => {
            return { data: r, month };
          });
          // this.setState({ data: r });
          // return r;
          // To fetch the next page of records, call `fetchNextPage`.
          // If there are more records, `page` will get called again.
          // If there are no more records, `done` will get called.
          // fetchNextPage();
        },
        err => {
          if (err) {
            console.error(err);
            return;
          }
        }
      );
  }

  render() {
    const el = ({ date, view }) => {
      const clickHandler = (d, v) => {
        console.log(d, v);
      };
      let day = +date.toLocaleString().substring(0, 2);

      return (
        <div className={classes.StockData}>
          {this.state.data && this.state.data[day] ? (
            <>
              <p className={classes.StockPrice}>
                Rs. {this.state.data[day].stockPrice}
              </p>
              <div
                className={classes.Delete}
                onClick={() => clickHandler(date, view)}>
                x
              </div>
            </>
          ) : (
            <div onClick={() => clickHandler(date, view)}>ADD</div>
          )}
        </div>
      );
    };
    console.log("render");
    return (
      <div>
        <h3>calendar</h3>
        {this.state.data ? (
          <Calendar
            className={classes.Calendar}
            minDetail="month"
            tileContent={el}
            showNeighboringMonth={false}
          />
        ) : null}
      </div>
    );
  }
}

export default CalenderComponent;
