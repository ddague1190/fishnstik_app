import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/utilities/loader/loader.component";
import Message from "../components/utilities/Message";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../redux/actions/productActions";
import { useScreenOrientation } from "../utils/useOrientationChange";
import { ProductDetailsImages } from "../components/productpresentation/ProductDetailsImages";
import { ProductDetailsDropdowns } from "../components/productpresentation/ProductDetailsDropdowns";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  const [currVariant, setCurrentVariant] = useState();

  const [reviewJustAdded, setReviewJustAdded] = useState(false);
  const dispatch = useDispatch();
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  const { userInfo } = useSelector((state) => state.userLogin);

  const productId = useParams();
  useEffect(() => {
    setCurrentVariant("");
    window.scrollTo(0, 0);
    dispatch(listProductDetails(productId.id));
  }, [dispatch, productId.id, reviewJustAdded]);

  return (
    <div className="bg-white">
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <div className="pt-6 pb-16 sm:pb-24">
          <nav
            aria-label="Breadcrumb"
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ol role="list" className="flex items-center space-x-4">
              <li key={product.category?.slug}>
                <div className="flex items-center">
                  <Link
                    to={`/products/${product.category?.slug}`}
                    className="mr-4 text-sm font-medium text-gray-900">
                    {product.category?.name}
                  </Link>
                  <svg
                    viewBox="0 0 6 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="h-5 w-auto text-gray-300">
                    <path
                      d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </li>
              <li key={product.subcategory?.slug}>
                <div className="flex items-center">
                  <Link
                    to={`/products/${product.category?.slug}/${product.subcategory?.slug}`}
                    className="mr-4 text-sm font-medium text-gray-900">
                    {product.subcategory?.name}
                  </Link>
                  <svg
                    viewBox="0 0 6 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="h-5 w-auto text-gray-300">
                    <path
                      d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </li>

              <li className="text-sm">
                <div
                  to={product.slug}
                  aria-current="page"
                  className="font-medium text-gray-500 hover:text-gray-600">
                  {product.name}
                </div>
              </li>
            </ol>
          </nav>
          <div className="mt-8 max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="lg:grid lg:grid-cols-12 lg:auto-rows-min lg:gap-x-8">
              <div className="lg:col-start-8 lg:col-span-5">
                <div className="flex justify-between">
                  <h1 className="text-xl font-medium text-gray-900">
                    {product.name}
                  </h1>
                  {product.numVariants === 0 ? (
                    <p className="text-xl font-medium text-gray-900">
                      ${product.price}
                    </p>
                  ) : (currVariant &&
                    <div className="flex flex-col items-center bg-blue-50 p-5 rounded-md">
                      <p
                        className={`${
                          userInfo ? "line-through text-sm" : "text-xl"
                        } font-medium text-grey-500`}>
                        ${currVariant.price}
                      </p>

                      <p className="">
                        {userInfo ? (
                          <span className="text-xl font-medium text-grey-800">
                            ${currVariant.discountPrice}
                          </span>
                        ) : (
                          <Link
                            className={`${
                              !currVariant ? "hidden" : "block"
                            } font-xs w-24 leading-none text-blue-600`}
                            to="/login">
                            Login to see your price
                          </Link>
                        )}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <ProductDetailsImages
                mainImages={product.images}
                variants={product.variants}
                currVariant={currVariant}
              />
              {/* Product selector */}
              <ProductDetailsDropdowns
                product={product}
                currVariant={currVariant}
                setCurrVariant={setCurrentVariant}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
