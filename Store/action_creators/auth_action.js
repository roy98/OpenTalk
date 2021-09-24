export const restoreToken = (payload) => {
  //Fetch token from secureStore
  //Re-validate the token on production
  //Dispatch the alert (success or error)
  //Then dispatch the current action

  return (dispatch) => {
    dispatch({
      type: "RESTORE_TOKEN",
      payload: payload,
    });
  };
};

export const signIn = (payload) => {
  //Get login info parameter : {email, password}
  //call the login API
  //Dispatch the alert (success or error)
  //Then dispatch the current action
  return (dispatch) => {
    dispatch({
      type: "SIGN_IN",
      payload: payload,
    });
  };
};

export const signUp = (payload) => {
  //Get sign up info parameter : {avatar, name, email, password}
  //call the signUp API
  //Dispatch the alert (success or error)
  //Then dispatch the SignIn action
  return (dispatch) => {
    dispatch({
      type: "SIGN_UP",
      payload: payload,
    });
  };
};

export const signOut = () => {
  return (dispatch) => {
    dispatch({
      type: "SIGN_OUT",
      payload: null,
    });
  };
};
