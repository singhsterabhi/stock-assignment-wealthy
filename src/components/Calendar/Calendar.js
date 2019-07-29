import React, { Component } from "react";
import Calendar from "react-calendar";
import { connect } from "react-redux";

import * as actions from "../../store/action";

import classes from "./Calendar.module.scss";
import "./Calendar.css";

class CalenderComponent extends Component {
  componentDidMount() {
    this.props.OnInit(this.props.month, this.props.year);
  }

  render() {
    const el = ({ date, view }) => {
      const clickHandler = (d, v) => {
        console.log(d, v);
      };
      let day = +date.toLocaleString().substring(0, 2);

      return (
        <div className={classes.StockData}>
          {this.props.data && this.props.data[day] ? (
            <>
              <p className={classes.StockPrice}>
                Rs. {this.props.data[day].stockPrice}
              </p>
              <div
                className={classes.Delete}
                onClick={() => clickHandler(date, view)}>
                x
              </div>
            </>
          ) : (
            <div
              className={classes.Add}
              onClick={() => clickHandler(date, view)}>
              ADD
            </div>
          )}
        </div>
      );
    };
    console.log("render");
    return (
      <div>
        {this.props.data ? (
          <Calendar
            className={classes.Calendar}
            minDetail="month"
            tileContent={el}
            showNeighboringMonth={false}
            onClickDay={value => alert("Clicked day: " + value)}
            value={new Date()}
          />
        ) : null}
      </div>
    );
  }
}

const MapStateToProps = state => {
  return {
    data: state.stockData,
    month: state.month,
    year: state.year
  };
};

const MapDispatchToProps = dispatch => {
  return {
    OnInit: (m, y) => dispatch(actions.initialize(m, y))
  };
};

export default connect(
  MapStateToProps,
  MapDispatchToProps
)(CalenderComponent);
