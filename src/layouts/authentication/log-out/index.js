import { useState } from "react";
import { useNavigate } from "react-router-dom";

const logOut = () => {
  const navigate = useNavigate();
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('id_user');

  navigate('/authentication/sign-in');
};

export default logOut;
// Path: src/layouts/authentication/Log-out/index.js
