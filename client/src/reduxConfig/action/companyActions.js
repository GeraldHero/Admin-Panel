import {
  COMPANIES_LIST_FAIL,
  COMPANIES_LIST_REQUEST,
  COMPANIES_LIST_SUCCESS,
} from '../constants/companyConstants';
import axion from 'axios';
export const getCompaniesList = () => async (dispatch) => {
  try {
    dispatch({ type: COMPANIES_LIST_REQUEST });
    const { data } = await axion.get('/api/companies');

    dispatch({
      type: COMPANIES_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COMPANIES_LIST_FAIL,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.data.msg,
    });
  }
};
