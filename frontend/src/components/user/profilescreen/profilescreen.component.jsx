import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../utilities/loader/loader.component";
import Message from "../../utilities/message/message.component";
import {
  getUserDetails,
  updateUserProfile,
} from "../../../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
import {
  USER_LOGOUT,
  USER_UPDATE_PROFILE_RESET,
} from "../../../redux/constants/userConstants";
import { listMyOrders } from "../../../redux/actions/orderActions";
import "./profilescreen.styles.scss";
import { motion } from "framer-motion";
import { pageVariants } from "../../../utils/variants";

const ProfileScreen = () => {
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  let navigate = useNavigate();
  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success, error: errorUpdatePassword } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;
  // If user is not already logged in, return user to previous page
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    if (!user || !user.username || success) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(getUserDetails("profile"));
      dispatch(listMyOrders());
      setPassword("");
      setPassword2("");
      setOldPassword("");
      setShowResetPassword(false);
    }
    if (
      error === "Given token not valid for any token type" ||
      errorUpdatePassword === "Given token not valid for any token type"
    ) {
      dispatch({ type: USER_LOGOUT });
    }
  }, [navigate, userInfo, dispatch, user, success, error, errorUpdatePassword]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        updateUserProfile({
          old_password: oldPassword,
          password: password,
          password2: password2,
        })
      );
      setMessage("");
    }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial='initial'
      animate='in'
      exit='out'
      className='profilescreen u-margin-top-medium'>
      <div className='profilescreen__profilesection u-margin-bottom-medium'>
        <h2 className='profilescreen__title'>User Profile</h2>
        <span
          className='profilescreen__resetpasswordbutton'
          onClick={() => setShowResetPassword(!showResetPassword)}>
          Reset password
        </span>
        {message && <Message variant='danger'>{message}</Message>}

        {errorUpdatePassword && (
          <Message variant='danger'>{errorUpdatePassword}</Message>
        )}

        {success && <Message variant='success'>Password updated</Message>}

        {error && <Message variant='danger'>{error}</Message>}

        {(loading || loadingOrders) && <Loader />}

        <div className='profilescreen__userinfo u-margin-top-small'>
          <span className='profilescreen__label'>Username:</span>
          <span>{user && user.username}</span>
          <span className='profilescreen__label'>Email:</span>
          <span>{user && user.email}</span>
        </div>

        {showResetPassword && (
          <div className='profilescreen__resetpassword'>
            <h3>Reset password</h3>
            <form onSubmit={submitHandler}>
              <div class='input-control'>
                <input
                  id='oldpassword'
                  required
                  type='password'
                  class='input-control__input'
                  placeholder='Please enter your old password'
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <label for='oldpassword' class='input-control__label'>
                  Old password
                </label>
              </div>

              <div class='input-control'>
                <input
                  id='newpassword'
                  class='input-control__input'
                  required
                  type='password'
                  placeholder='Please enter a new password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label for='newpassword' class='input-control__label'>
                  New password
                </label>
              </div>

              <div class='input-control'>
                <input
                  id='newpassword2'
                  required
                  class='input-control__input'
                  type='password'
                  placeholder='Please enter a new password'
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                />
                <label for='newpassword2' class='input-control__label'>
                  Confirm new password
                </label>
              </div>

              <button className='btn--navbar' type='submit' variant='primary'>
                Update
              </button>
            </form>
            <span onClick={() => setShowResetPassword(!showResetPassword)}>
              Close
            </span>
          </div>
        )}
      </div>
      <div className='profilescreen__orders'>
        <h2>My Orders</h2>
        {errorOrders ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <table className='profilescreen__table u-margin-top-medium'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Delivered</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <Link to={`/order/${order._id}`}>Details</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </motion.div>
  );
};

export default ProfileScreen;
