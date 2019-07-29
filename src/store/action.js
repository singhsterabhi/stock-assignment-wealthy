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
