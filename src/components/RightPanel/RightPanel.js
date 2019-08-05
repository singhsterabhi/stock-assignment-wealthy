import React from "react";

import { connect } from "react-redux";

import Spinner from "../Spinner/Spinner";
import Chart from "./ChartDisplay/ChartDipslay";
import classes from "./RightPanel.module.scss";

const rightPanel = props => {
  //   console.log(props.buyDate);
  //   console.log(props.sellDate);

  return (
    <>
      <div className={classes.Panel}>
        <div className={classes.Profit}>
          <h3>Rs. {props.profit}</h3>
          <p>Profit</p>
        </div>
        <div className={classes.Chart}>
          {props.data && !props.loading ? (
            Object.keys(props.data).length > 0 ? (
              <Chart data={props.data} />
            ) : (
              <p>Add data in this month to View report</p>
            )
          ) : (
            <Spinner />
          )}
        </div>
        <div className={classes.Date}>
          {props.loading ? (
            <Spinner />
          ) : props.sellDate === null ? (
            <p>Add data to View report</p>
          ) : (
            <>
              <div>
                <h3>{new Date(props.buyDate).toLocaleDateString()}</h3>
                <p>Buy Date</p>
              </div>
              <div>
                <h3>{new Date(props.sellDate).toLocaleDateString()}</h3>
                <p>Sell Date</p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

const MapStateToProps = state => {
  return {
    profit: state.profit,
    sellDate: state.sellDate,
    buyDate: state.currentDate,
    data: state.stockData,
    loading: state.loading
  };
};

export default connect(MapStateToProps)(rightPanel);
