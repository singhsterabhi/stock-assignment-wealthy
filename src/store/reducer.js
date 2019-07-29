import * as actionTypes from "./actionTypes";

const initialState = {
  stockData: null,
  month: 7,
  year: 2019
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INITIALIZE:
      return {
        ...state,
        stockData: action.data
      };
    default:
      return state;
  }
};

export default reducer;
