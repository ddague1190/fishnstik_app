import React from "react";
import Loader from "../../utilities/loader/loader.component";
import Message from "../../utilities/Message";
import { Link } from "react-router-dom";
import { listMyOrders } from "../../../redux/actions/orderActions";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

export const ProfileOrders = () => {
  const { loading, error, orders } = useSelector((state) => state.orderListMy);
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(listMyOrders())
  }, [])
  return (
    <>

      {error && <Message>{error}</Message>}

      {(loading) && <Loader />}
      <div className=" mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:mx-0 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                ID
              </th>
              <th
                scope="col"
                className=" px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">
                Date
              </th>
              <th
                scope="col"
                className=" px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                Total
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {orders?.map((order) => (
              <tr key={order._id}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                {order._id}
                </td>
                <td className=" whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">
                {order.createdAt.substring(0, 10)}
                </td>
                <td className=" whitespace-nowrap px-3 py-4 text-sm text-gray-500 lg:table-cell">
                ${order.totalPrice}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <div className='flex flex-col justify-center'>

                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                    <Link to={`/order/${order._id}`} className='text-sm font-semibold underline'>Order Details</Link>
                    </div>

                </td>
  
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
