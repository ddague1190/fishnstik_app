import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  CheckIcon,
  ClockIcon,
  XIcon as XIconSolid,
} from "@heroicons/react/solid";
import { addToCart, removeFromCart } from "../../redux/actions/cartActions";

const CartItemElement = ({ productIdx, product }) => {
  const dispatch = useDispatch();
  return (
    <li key={productIdx} className="flex py-6 sm:py-10">
      <div className="flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-24 h-24 rounded-md object-center sm:w-48 sm:h-48 object-contain"
        />
      </div>

      <div className="ml-2 flex-1 flex flex-col justify-between sm:ml-2">
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div>
            <div className="flex justify-between">
              <h3 className="text-sm">
                <Link
                  to={`/product/${product.slug}`}
                  className="font-medium text-gray-700 hover:text-gray-800">
                  {product.name}
                </Link>
              </h3>
            </div>
            <dt className="mt-1 flex text-sm">
              {product.type && (
                <div>
                  <dt className="ml-4 pl-4 text-xs border-l border-gray-200 text-gray-500">
                    Type:
                  </dt>
                  <dd>{product.type}</dd>
                </div>
              )}
              {product.material && (
                <p className="ml-4 pl-4 border-l text-xs border-gray-200 text-gray-500">
                  Material: {product.material}
                </p>
              )}
              {product.pack && (
                <p className="ml-4 pl-4 text-xs border-l border-gray-200 text-gray-500">
                  Pack: {product.pack}
                </p>
              )}
            </dt>
            <p className="mt-1 text-sm font-medium text-gray-900">
              ${product.price}
            </p>
          </div>

          <div className="mt-4 sm:mt-0 flex items-center gap-5 rounded-md bg-slate-100 max-w-fit py-1 px-2">
            <div className="text-lg bg-white border-2 max-w-fit px-3 text-center">
              {product.qty}
            </div>
            <div className="flex gap-5 mt-2">
              <i
                onClick={() => {
                  dispatch(
                    addToCart({
                      ...product,
                      qty: product.qty + 1,
                    })
                  );
                }}
                className="font-bold fa-solid fa-plus"></i>
              <i
                onClick={() => {
                  dispatch(
                    addToCart({
                      ...product,
                      qty: product.qty - 1,
                    })
                  );
                }}
                className="fa-solid fa-minus"></i>
            </div>

            <div className="absolute top-0 right-0">
              <button
                type="button"
                onClick={() =>
                  dispatch(removeFromCart(product.productId, product.variantId))
                }
                className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500">
                <span className="sr-only">Remove</span>
                <XIconSolid className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <p className="mt-4 flex text-sm text-gray-700 space-x-2">
          {product.countInStock >= product.qty ? (
            <CheckIcon
              className="flex-shrink-0 h-5 w-5 text-green-500"
              aria-hidden="true"
            />
          ) : (
            <ClockIcon
              className="flex-shrink-0 h-5 w-5 text-gray-300"
              aria-hidden="true"
            />
          )}

          <span>
            {product.countInStock >= product.qty
              ? "In stock"
              : `Ships in ${product.leadTime} week${
                  product.leadTime > 0 ? "s" : ""
                }`}
          </span>
        </p>
      </div>
    </li>
  );
};

export default CartItemElement;
