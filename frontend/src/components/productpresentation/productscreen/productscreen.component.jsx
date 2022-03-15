import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Rating from "../../utilities/rating/rating.component";
import Loader from "../../utilities/loader/loader.component";
import Message from "../../utilities/message/message.component";
import ProductDetails from "../productdetails/productdetails.component";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../../../redux/actions/productActions";
import WriteReview from "../../utilities/writereview/writereview.component";
import "./productscreen.styles.scss";
import VerticalProductScreenBanner from "../../svg/recommended/verticalproductscreenbanner.component";
import HorizontalProductScreenBanner from "../../svg/recommended/horizontalproductscreenbanner.component";
import PreCartItem from "../../checkoutpathway/cartitem/pre-cartitem.component";
import OneVariant from "../../checkoutpathway/cartitem/oneVariant.component";
import Emotive from "../../svg/emotive/emotive.component";
import { useScreenOrientation } from "../../../utils/useOrientationChange";
import PreCartDropdown from "../../checkoutpathway/cartitem/precartdropdown.component";

const ProductScreen = () => {
  const orientation = useScreenOrientation();
  const variants = {
    overview: { opacity: 1 },
    photos: { opacity: 0.5 },
  };

  const item = {
    whichContent: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -100 },
  };
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
    window.scrollTo(0, 0);
    dispatch(listProductDetails(productId.id));
  }, [dispatch, productId.id, reviewJustAdded]);

  return (
    <div className='productscreen'>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <div className='path-group'>
            <Link to='/'>Home</Link>
            <span> > </span>
            <Link to={`/products/${product.category}/`}>
              {product.category}
            </Link>
            <span> > </span>
            <Link to={`/products/${product.category}/${product.subcategory}/`}>
              {product.subcategory}
            </Link>
          </div>

          <div className='productscreen__content'>
            <ul className='tab-group'>
              <li
                className={`tab-group__tab ${
                  whichContent === "overview" ? "tab-group__tab--active" : ""
                }`}
                onClick={() => setWhichContent("overview")}>
                <span>Overview</span>
              </li>
              <li
                className={`tab-group__tab ${
                  whichContent === "reviews" && "tab-group__tab--active"
                }`}
                onClick={() => setWhichContent("reviews")}>
                <span>Reviews</span>
              </li>
            </ul>
            {
              {
                overview: (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className='productscreen__details'>
                    <ProductDetails product={product} height='8rem' />
                  </motion.div>
                ),

                reviews: (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className='productscreen__reviews'>
                    {!writeReview ? (
                      <div className='showreviews'>
                        <h3 className='u-center-text'>Recent reviews</h3>
                        {product.reviews.length === 0 && (
                          <Message cvariant='info'>No Reviews</Message>
                        )}
                        <div className='reviewcards'>
                          {product.reviews.map((review) => (
                            <div className='reviewcard' key={review._id}>
                              <p className='reviewcard__comment'>
                                {review.comment}
                              </p>
                              <strong className='reviewcard__name'>
                                {review.name}
                              </strong>
                              <Rating value={review.rating} color='#f8e825' />
                              <p className='reviewcard__date'>
                                {review.createdAt.substring(0, 10)}
                              </p>
                            </div>
                          ))}
                        </div>
                        <span
                          onClick={() => setWriteReview(true)}
                          className='showreviews__writebutton'>
                          Write a review!
                        </span>
                      </div>
                    ) : (
                      <div className='createreview'>
                        <h3>Write a review</h3>
                        <span
                          className='createreview__goback'
                          onClick={() => setWriteReview(false)}>
                          <i
                            className='fa fa-arrow-left'
                            aria-hidden='true'></i>
                        </span>
                        {userInfo ? (
                          <WriteReview
                            setReviewJustAdded={setReviewJustAdded}
                            setWriteReview={setWriteReview}
                          />
                        ) : (
                          <>
                            <br />
                            <Message variant='info'>
                              Please <Link to='/login'>login</Link> to write a
                              review
                            </Message>
                          </>
                        )}
                      </div>
                    )}
                  </motion.div>
                ),
              }[whichContent]
            }
          </div>

          {product.numVariants === 1 && (
            <div className='productscreen__variants--one-variant'>
              <OneVariant product={product} variant={product.variants[0]} />
            </div>
          )}

          {width > breakpoint ? (
            <VerticalProductScreenBanner className='productscreen__recommended' />
          ) : (
            <HorizontalProductScreenBanner className='productscreen__recommended' />
          )}

          {product.numVariants > 1 && (
            <div className='productscreen__variants'>
              <div className='productscreen__variants-title'>
                <span>Options available for this product</span>
              </div>

              {!product.dropdownSelection ? (
                product.variants.map((variant, index) => {
                  return (
                    <PreCartItem
                      orientation={orientation}
                      width={width}
                      product={product}
                      variant={variant}
                      key={index}
                    />
                  );
                })
              ) : (
                <PreCartDropdown
                  product={product}
                  variants={product.variants}
                />
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductScreen;
