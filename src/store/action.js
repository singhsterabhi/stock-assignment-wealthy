import * as actionTypes from "./actionTypes";
import { base } from "../airtable";

export const setInit = data => {
  return {
    type: actionTypes.INITIALIZE,
    data
  };
};

export const setProfit = (p, s) => {
  return {
    type: actionTypes.SET_PROFIT,
    profit: p,
    sellDate: s
  };
};

export const calculateProfit = data => (dispatch, getState) => {
  // console.log(data);
  // console.log(getState().currentDate);
  let buyDate = +new Date(getState().currentDate).getDate();
  // console.log(buyDate);
  // console.log(data.hasOwnProperty(buyDate));
  let sellDate = null;
  let profit = 0;
  if (data.hasOwnProperty(buyDate)) {
    let buyPrice = data[buyDate].stockPrice;
    let sellPrice = buyPrice;
    Object.keys(data).forEach(k => {
      if (+k >= buyDate) {
        // console.log(data[k].stockPrice, sellPrice);

        if (data[k].stockPrice >= sellPrice) {
          sellPrice = +data[k].stockPrice;
          sellDate = data[k].Day;
          // console.log(data[k].stockPrice, data[k].Day);
        }
      }
    });
    profit = sellPrice * 10 - buyPrice * 10;
  }
  // console.log(profit, sellDate);
  dispatch(setProfit(profit, sellDate));
};

export const initialize = (month, year) => dispatch => {
  let r = {};
  base("Table 1")
    .select({
      view: "Grid view",
      filterByFormula: `AND({Month}=${month},{Year}=${year})`
    })
    .eachPage(
      (records, fetchNextPage) => {
        records.forEach(function(record) {
          let day = record.fields.Day;
          day = +day.substring(day.length - 2, day.length);
          r[day] = { ...record["fields"], id: record["id"] };
        });
        dispatch(calculateProfit(r));
        dispatch(setInit(r));
      },
      err => {
        if (err) {
          console.error(err);
          return;
        }
      }
    );
};

export const deleteData = (id, month, year) => dispatch => {
  base("Table 1").destroy(id, (err, deletedRecord) => {
    if (err) {
      console.error(err);
      return;
    }
    dispatch(initialize(month, year));
  });
};

export const closeModal = () => {
  return {
    type: actionTypes.CLOSE_MODAL
  };
};

export const startAddData = () => {
  return {
    type: actionTypes.START_ADD_DATA
  };
};

export const finishAddData = () => {
  return {
    type: actionTypes.FINISH_ADD_DATA
  };
};

export const submitData = (date, price, month, year) => dispatch => {
  const d = new Date(date);

  base("Table 1").create(
    {
      Day: 1 + d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear(),
      stockPrice: +price
    },
    (err, record) => {
      if (err) {
        console.error("Error", err);
        return;
      }
      console.log(record.getId());
      dispatch(initialize(month, year));
      dispatch(closeModal());
    }
  );
};

export const setMonthYear = (m, y) => {
  return {
    type: actionTypes.CHANGE_MONTH_YEAR,
    month: m,
    year: y
  };
};

export const changeMonthYear = activeStartDate => dispatch => {
  let m = 1 + new Date(activeStartDate).getMonth();
  let y = new Date(activeStartDate).getFullYear();
  dispatch(setCurrentDate(activeStartDate));
  dispatch(setMonthYear(m, y));
  dispatch(initialize(m, y));
};

export const setCurrentDate = date => {
  return {
    type: actionTypes.CHANGE_CURRENT_DATE,
    currentDate: date
  };
};

export const changeCurrentDate = date => (dispatch, getState) => {
  dispatch(setCurrentDate(date));
  dispatch(calculateProfit(getState().stockData));
};
