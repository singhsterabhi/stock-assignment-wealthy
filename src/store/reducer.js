import * as actionTypes from "./actionTypes";

const initialState = {
  stockData: null,
  month: 7,
  year: 2019,
  addDataModalShow: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INITIALIZE:
      return {
        ...state,
        stockData: action.data
      };
    case actionTypes.START_ADD_DATA:
      return {
        ...state,
        addDataModalShow: true
      };
    case actionTypes.CLOSE_MODAL:
      return {
        ...state,
        addDataModalShow: false
      };
    default:
      return state;
  }
};

export default reducer;
