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

export const addData = (price, month, year) => dispatch => {
  base("Table 1").create(
    {
      Day: "2019-07-01",
      stockPrice: 100
    },
    function(err, record) {
      if (err) {
        console.error(err);
        return;
      }
      console.log(record.getId());
    }
  );
};
