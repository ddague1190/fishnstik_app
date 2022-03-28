import { StarIcon } from "@heroicons/react/solid";
import { RadioGroup } from "@headlessui/react";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Rating from "../utilities/rating/rating.component";
import Loader from "../utilities/loader/loader.component";
import Message from "../utilities/message/message.component";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../../redux/actions/productActions";
import WriteReview from "../utilities/writereview/writereview.component";
import { useScreenOrientation } from "../../utils/useOrientationChange";
import { ProductDetailsImages } from "./ProductDetailsImages";
import { ProductDetailsDropdowns } from "./ProductDetailsDropdowns";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  const [currVariant, setCurrentVariant] = useState();

  const orientation = useScreenOrientation();
  const [whichContent, setWhichContent] = useState("overview");
  const [writeReview, setWriteReview] = useState(false);
  const [reviewJustAdded, setReviewJustAdded] = useState(false);
  const dispatch = useDispatch();
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );
  const { width, height } = useSelector((state) => state.dimensions);
  const breakpoint = 900;
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
        <Message variant="danger">{error}</Message>
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
                  ) : (
                    <p className="text-xl font-medium text-gray-900">
                      {currVariant && `$${currVariant.price}`}
                    </p>
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
