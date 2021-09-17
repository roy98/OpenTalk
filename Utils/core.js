export const validateEmail = (text) => {
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  if (regex.test(text) === false) {
    return false;
  }
  return true;
};

// Simple Timeout on a Promise: to remove later
export const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
