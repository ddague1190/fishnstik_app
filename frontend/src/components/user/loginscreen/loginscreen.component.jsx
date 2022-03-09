import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../utilities/loader/loader.component";
import Message from "../../utilities/message/message.component";
import { login, loginWithOTP } from "../../../redux/actions/userActions";
import { useNavigate, useLocation } from "react-router-dom";
import "./loginscreen.styles.scss";
import { motion } from "framer-motion";
import { pageVariants } from "../../../utils/variants";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [needOTP, setNeedOTP] = useState(false);
  const [OTP, setOTP] = useState("");

  const dispatch = useDispatch();

  let navigate = useNavigate();

  let redirect = useLocation().search.split("=")[1];
  if (!redirect) redirect = "/";

  const userLogin = useSelector((state) => state.userLogin);

  const { error, loading, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }

    if (error && error[0].includes("We were not able to verify your email")) {
      setNeedOTP(true);
    }
  }, [navigate, userInfo, redirect, error]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(username, password));
  };

  const submitOTP = (e) => {
    e.preventDefault();
    dispatch(loginWithOTP(OTP, username, password));
  };

  return (
    <motion.div
      variants={pageVariants}
      initial='initial'
      animate='in'
      exit='out'
      className='loginscreen'>
      {error && <Message variant='danger'>{error}</Message>}

      {loading && <Loader />}

      {!needOTP ? (
        <div className='loginscreen__signin'>
          <form className='u-center-text' onSubmit={submitHandler}>
            <div className='input-control'>
              <input
                className='input-control__input'
                id='username'
                required
                type='username'
                placeholder='Create username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor='username' className='input-control__label'>
                Username
              </label>
            </div>

            <div className='input-control'>
              <input
                className='input-control__input'
                id='password'
                required
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor='password' className='input-control__label'>
                Password
              </label>
            </div>

            <button className='btn--main' type='submit' variant='primary'>
              Sign In
            </button>
          </form>

          <div className='u-margin-top-small loginscreen__register'>
            New to our site?
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}>
              {" "}
              Register
            </Link>
          </div>
        </div>
      ) : (
        <div className='loginscreen__validateeamil'>
          <h1>Validate Email</h1>
          <h5>
            An OTP was sent to email associated with your account. Please enter
            it here to complete registration.
          </h5>

          <form onSubmit={submitOTP}>
            <div className='input-control'>
              <input
                className='input-control__input'
                id='password'
                required
                type='name'
                placeholder='OTP from your email'
                value={OTP}
                onChange={(e) => setOTP(e.target.value)}
              />
              <label htmlFor='password' className='input-control__label'>
                Password
              </label>
            </div>
            <button className='btn--main' type='submit' variant='primary'>
              Submit
            </button>
          </form>
        </div>
      )}
    </motion.div>
  );
};

export default LoginScreen;
