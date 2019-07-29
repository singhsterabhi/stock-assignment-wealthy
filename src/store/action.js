import * as actionTypes from "./actionTypes";
import { base } from "../airtable";

export const setInit = data => {
  return {
    type: actionTypes.INITIALIZE,
    data
  };
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
      Day: +d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear(),
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
