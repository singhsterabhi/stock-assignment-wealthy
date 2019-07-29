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
      const deleteHandler = (d, v, id) => {
        this.props.OnDelete(id, this.props.month, this.props.year);
      };
      const addHandler = (date, view) => {
        console.log(date);
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
                onClick={() =>
                  deleteHandler(date, view, this.props.data[day].id)
                }>
                x
              </div>
            </>
          ) : (
            <div className={classes.Add} onClick={() => addHandler(date, view)}>
              ADD
            </div>
          )}
        </div>
      );
    };

    return (
      <div>
        {this.props.data ? (
          <Calendar
            className={classes.Calendar}
            minDetail="month"
            tileContent={el}
            showNeighboringMonth={false}
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
    OnInit: (m, y) => dispatch(actions.initialize(m, y)),
    OnDelete: (id, m, y) => dispatch(actions.deleteData(id, m, y))
  };
};

export default connect(
  MapStateToProps,
  MapDispatchToProps
)(CalenderComponent);
