import axios from 'axios';
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from '../constants/userConstant';
import setAuthToken from '../utils/setAuthToken';
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('/api/auth', { email, password }, config);
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    setAuthToken(data.token);
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response.data.msg,
    });
  }
};

export const logout = (userInfo) => async (dispatch) => {
  // const config = {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${userInfo.token}`,
  //   },
  // };
  await axios.post('/api/auth/logout');
  setAuthToken();
  localStorage.removeItem('userInfo');
  dispatch({
    type: USER_LOGOUT,
  });
};
