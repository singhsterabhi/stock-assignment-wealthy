import React, { Component } from "react";
import Calendar from "react-calendar";
import { connect } from "react-redux";

import * as actions from "../../store/action";

import classes from "./Calendar.module.scss";
import "./Calendar.css";
import Modal from "../Modal/Modal";
import Spinner from "../Spinner/Spinner";

class CalenderComponent extends Component {
  state = {
    addingDataOn: "",
    stockprice: 0
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   // if (nextState.addingDataOn !== this.state.addingDataOn) return false;
  //   // if (nextProps.isModalOpen !== this.props.isModalOpen) return false;
  //   return true;
  // }

  componentDidMount() {
    this.props.OnInit(this.props.month, this.props.year);
  }

  ChangeHandler = e => {
    // console.log(e.target.value);
    this.setState({ stockprice: e.target.value });
  };

  submitData = () => {
    console.log("submitting");
    this.props.OnSubmitData(
      this.state.addingDataOn,
      this.state.stockprice,
      this.props.month,
      this.props.year
    );
    this.setState({
      addingDataOn: "",
      stockprice: 0
    });
  };

  render() {
    console.log("rendering...");
    const el = ({ date, view }) => {
      const deleteHandler = (d, v, id) => {
        this.props.OnDelete(id, this.props.month, this.props.year);
      };
      const addHandler = (dt, v) => {
        // const d = new Date(dt);
        // console.log(
        //   d.getFullYear() + "-" + (+d.getMonth() + 1) + "-" + d.getDate()
        // );
        this.props.OnAddData();
        this.setState({
          addingDataOn: dt
        });
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
            value={this.props.currentDate}
            onActiveDateChange={({ activeStartDate, view }) => {
              const d = new Date(activeStartDate);
              console.log(1 + d.getMonth(), d.getFullYear());
              this.props.OnChangeMonthYear(activeStartDate);
            }}
            onChange={value => this.props.OnChangeDate(value)}
          />
        ) : (
          <Spinner />
        )}
        <Modal
          isOpen={this.props.isModalOpen}
          handleCloseModal={this.props.OnCloseModal}>
          <div className={classes.ModalContent}>
            <h3>Add Stock Data</h3>
            <p>
              Date :{" "}
              <span>{new Date(this.state.addingDataOn).toLocaleString()}</span>
            </p>
            <label htmlFor="stockprice">Stock Price : </label>
            <input
              type="number"
              name="stockprice"
              id="stockprice"
              value={this.state.stockprice}
              onChange={this.ChangeHandler}
            />
            <div>
              <button
                className={classes.Cancel}
                onClick={this.props.OnCloseModal}>
                CANCEL
              </button>
              <button className={classes.AddData} onClick={this.submitData}>
                ADD
              </button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

const MapStateToProps = state => {
  return {
    data: state.stockData,
    month: state.month,
    year: state.year,
    isModalOpen: state.addDataModalShow,
    currentDate: state.currentDate
  };
};

const MapDispatchToProps = dispatch => {
  return {
    OnInit: (m, y) => dispatch(actions.initialize(m, y)),
    OnDelete: (id, m, y) => dispatch(actions.deleteData(id, m, y)),
    OnAddData: () => dispatch(actions.startAddData()),
    OnCloseModal: () => dispatch(actions.closeModal()),
    OnSubmitData: (d, p, m, y) => dispatch(actions.submitData(d, p, m, y)),
    OnChangeMonthYear: d => dispatch(actions.changeMonthYear(d)),
    OnChangeDate: d => dispatch(actions.changeCurrentDate(d))
  };
};

export default connect(
  MapStateToProps,
  MapDispatchToProps
)(CalenderComponent);
