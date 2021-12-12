import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { employeeListReducer } from './reduxConfig/reducers/employeeReducers';
import { companiesListReducer } from './reduxConfig/reducers/companyReducers';
import { userLoginReducer } from './reduxConfig/reducers/userReducers';
const reducer = combineReducers({
  employeeList: employeeListReducer,
  companiesList: companiesListReducer,
  userLogin: userLoginReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : [];

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
