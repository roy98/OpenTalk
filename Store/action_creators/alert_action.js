export const startLoading = () => {
  return (dispatch) => {
    dispatch({
      type: "LOADING",
      payload: true,
    });
  };
};

export const stopLoading = () => {
  return (dispatch) => {
    dispatch({
      type: "LOADING",
      payload: false,
    });
  };
};

export const success = (message) => {
  return (dispatch) => {
    dispatch({
      type: "SUCCESS",
      payload: message,
    });
  };
};

export const error = (message) => {
  return (dispatch) => {
    dispatch({
      type: "ERROR",
      payload: message,
    });
  };
};

export const clear = () => {
  return (dispatch) => {
    dispatch({
      type: "CLEAR",
      payload: null,
    });
  };
};
