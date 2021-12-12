import {
  COMPANIES_LIST_FAIL,
  COMPANIES_LIST_REQUEST,
  COMPANIES_LIST_SUCCESS,
} from '../constants/companyConstants';

export const companiesListReducer = (state = { employees: [] }, action) => {
  switch (action.type) {
    case COMPANIES_LIST_REQUEST:
      return { loading: true, companies: [] };
    case COMPANIES_LIST_SUCCESS:
      return { loading: false, companies: action.payload };
    case COMPANIES_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
