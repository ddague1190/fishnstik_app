import React from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductDetailsPricing = ({ currVariant, name }) => {
  const navigate = useNavigate();
  const productId = useParams();
  const { userInfo } = useSelector((state) => state.userDetails);
  const loginAndComeBack = () => {
    navigate(`/login?redirect=/product/${productId.id}`);
  };
  return (
    <section className="lg:col-start-8 lg:col-span-5">
      <div className="flex justify-between">
        <h1 className="text-xl font-medium text-gray-900">{name}</h1>
        {currVariant && (
          <div className="flex flex-col items-center bg-blue-50 p-5 rounded-md">
            <p
              className={`${
                userInfo ? "line-through text-sm" : "text-xl"
              } font-medium text-grey-500`}>
              ${currVariant.price}
            </p>

            <p className="text-center">
              {userInfo ? (
                <span className="text-xl font-medium text-grey-800">
                  ${currVariant.discountPrice}
                </span>
              ) : (
                <span
                  onClick={loginAndComeBack}
                  className={`${
                    !currVariant ? "hidden" : "block"
                  } font-xs w-24 leading-none text-blue-600 text-xs`}>
                  Login to see your price
                </span>
              )}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductDetailsPricing;
