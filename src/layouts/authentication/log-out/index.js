import { useState } from "react";
const logOut = () => {
  localStorage.removeItem('token');
  window.location.href = '/authentication/sign-in';
};

export default logOut;
// Path: src/layouts/authentication/Log-out/index.js
