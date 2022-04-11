import React from "react";
import { Link } from "react-router-dom";

const PayDetails = ({ order, index }) => {
  const payment = order.payments[index];


  return (
    <div className="bg-blue-50 rounded-md p-2 my-5">
      <p className="text-lg font-semibold  text-gray-700">Payment details</p>
      <div className="ml-10 my-8 leading-6 ">
        <p className="">
          <span className="font-semibold w-32 inline-block text-sm text-gray-500">
            Items Price:
          </span>{" "}
          ${payment.itemsPrice}{" "}
        </p>
        <p className="">
          <span className="font-semibold text-sm w-32 inline-block text-gray-500">
            Tax Price:
          </span>{" "}
          ${payment.taxPrice}{" "}
        </p>
        <p className="">
          <span className="font-semibold text-sm w-32 inline-block  text-gray-500">
            Shipping Price:
          </span>{" "}
          ${payment.shippingPrice}{" "}
        </p>
        <p className="">
          <span className="font-semibold text-sm w-32 inline-block text-gray-500">
            Total Price:
          </span>{" "}
          ${payment.totalPrice}{" "}
        </p>
      </div>
      <p className="text-lg font-semibold  text-gray-700">Shipment details</p>



      <p className="text-lg font-semibold  text-gray-700">Items paid for</p>
      <div className="my-8">
        {payment.paidItems.map((product, index) => (
          <li key={index} className="flex py-6 sm:py-2 bg-white rounded-md">
            <div className="flex-shrink-0">
              <img
                src={product.variantInfo.image}
                alt={product.productInfo.name}
                className="w-24 h-24 rounded-lg object-center object-contain sm:w-20 sm:h-12"
              />
            </div>

            <div className="relative ml-4 flex-1 flex flex-col justify-between sm:ml-6">
              <div>
                <div className="flex justify-between sm:grid sm:grid-cols-2">
                  <div className="pr-6">
                    <h3 className="text-sm">
                      <Link
                        to={`/product/${product.productInfo.slug}`}
                        className="font-medium text-gray-700 hover:text-gray-800">
                        {product.productInfo.name}
                      </Link>
                    </h3>

                    {product.variantInfo.title ? (
                      <p className="mt-1 text-sm text-gray-500">
                        {product.variantInfo.title}
                      </p>
                    ) : null}
                    {product.variantInfo.type &&
                    product.variantInfo.type != product.variantInfo.title ? (
                      <p className="mt-1 text-sm text-gray-500">
                        Type: {product.variantInfo.title}
                      </p>
                    ) : null}
                    {product.variantInfo.material ? (
                      <p className="mt-1 text-sm text-gray-500">
                        Type: {product.variantInfo.material}
                      </p>
                    ) : null}
                    {product.variantInfo.pack ? (
                      <p className="mt-1 text-sm text-gray-500">
                        Type: {product.variantInfo.pack}
                      </p>
                    ) : null}
                  </div>
                  <div className="mt-4 flex items-center sm:block sm:top-0 sm:mt-0">
                    <div className="text-sm font-medium text-gray-900 text-right">
                      <span className="text-xs font-normal">Per pack: </span>$
                      {product.variantInfo.discountPrice}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center sm:block sm:absolute sm:top-0 sm:left-1/2 sm:mt-0">
                  <div className="flex flex-row gap-2 items-center">
                    <span className="text-xs">Qty ordered:</span>
                    <span>{product.qty}</span>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </div>
      
    </div>
  );
};

export default PayDetails;
