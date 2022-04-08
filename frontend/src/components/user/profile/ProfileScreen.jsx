import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../utilities/loader/loader.component";
import Message from "../../utilities/Message";
import { getUserDetails } from "../../../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
import {
  USER_LOGOUT,
  USER_UPDATE_PROFILE_RESET,
} from "../../../redux/constants/userConstants";
import { ProfileOrders } from "./ProfileOrders";
import { ProfileUserInfo } from "./ProfileUserInfo";
import { ResetPassword } from "./ResetPassword";
import { ProfileMessages } from "./ProfileMessages";
import {
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  MenuIcon,
  UsersIcon,
  XIcon,
} from "@heroicons/react/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProfileScreen() {
  const [currentTab, setCurrentTab] = useState("orders");
  const [navigation, setNavigation] = useState([
    { name: "Orders", value: "orders", icon: InboxIcon },
    { name: "Account", value: "account", icon: HomeIcon },
    { name: "Messages", value: "messages", icon: UsersIcon },
  ]);

  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { error, loading, user } = useSelector((state) => state.userDetails);
  const { userInfo } = useSelector((state) => state.userLogin);

  // If user is not already logged in, return user to previous page
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    if (!user || !user.username) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(getUserDetails());
    }
    if (error === "Given token not valid for any token type") {
      dispatch({ type: USER_LOGOUT });
    }
  }, [navigate, userInfo, dispatch, user, error]);

  return (
    <div className="">
      <nav className="mt-5 space-y-1 bg-blue-50 items-center col-span-3 flex flex-row flex-wrap justify-center gap-2 border-b-2 p-3 border-gray sm:mx-8">
        {navigation.map((item) => (
          <div
            key={item.value}
            onClick={() => setCurrentTab(item.value)}
            className={classNames(
              item.value === currentTab
                ? "bg-gray-900 text-white"
                : "text-gray-600 hover:bg-gray-700 hover:text-white bg-white",
              "group flex text-sm items-center px-2 py-1 text-base font-medium rounded-md cursor-pointer"
            )}>
            <item.icon
              className={classNames(
                item.value === currentTab
                  ? "text-gray-300"
                  : "text-gray-400 group-hover:text-gray-300",
                "mr-4 flex-shrink-0 h-6 w-6"
              )}
              aria-hidden="true"
            />
            {item.name}
          </div>
        ))}
      </nav>

      {
        {
          orders: <ProfileOrders />,
          account: <ProfileUserInfo />,
          messages: <ProfileMessages />,
          resetpassword: <ResetPassword />,
        }[currentTab]
      }
    </div>
  );
}
