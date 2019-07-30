import * as actionTypes from "./actionTypes";

const initialState = {
  stockData: null,
  month: 1 + new Date().getMonth(),
  year: new Date().getFullYear(),
  addDataModalShow: false,
  currentDate: new Date(),
  profit: 0,
  sellDate: null,
  loading: true
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
    case actionTypes.CHANGE_MONTH_YEAR:
      return {
        ...state,
        month: action.month,
        year: action.year
      };
    case actionTypes.CHANGE_CURRENT_DATE:
      return {
        ...state,
        currentDate: action.currentDate
      };
    case actionTypes.SET_PROFIT:
      return {
        ...state,
        profit: action.profit,
        sellDate: action.sellDate
      };
    case actionTypes.CHANGE_LOADING:
      return {
        ...state,
        loading: action.loading
      };
    default:
      return state;
  }
};

export default reducer;
