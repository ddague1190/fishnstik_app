import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Rating from "../../utilities/rating/rating.component";
import Loader from "../../utilities/loader/loader.component";
import Message from "../../utilities/message/message.component";
import ProductDetails from "../productdetails/productdetails.component";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../../../redux/actions/productActions";
import AddToCartCard from "../../utilities/addtocartcard/addtocartcard.component";
import WriteReview from "../../utilities/writereview/writereview.component";
import "./productscreen.styles.scss";
import VerticalProductScreenBanner from "../../svg/recommended/verticalproductscreenbanner.component";
import HorizontalProductScreenBanner from "../../svg/recommended/horizontalproductscreenbanner.component";
import PreCartItem from "../../checkoutpathway/cartitem/pre-cartitem.component";

const ProductScreen = () => {


    const variants = {
        'overview': { opacity: 1 },
        'photos': { opacity: .5 },
      }
      
      const item = {
        whichContent: { opacity: 1, x: 0 },
        hidden: { opacity: 0, x: -100 },
      } 
  const [whichContent, setWhichContent] = useState("overview");
  const [writeReview, setWriteReview] = useState(false);

  const dispatch = useDispatch();

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );
  const { width } = useSelector((state) => state.dimensions);
  const breakpoint = 900;
  const { userInfo } = useSelector((state) => state.userLogin);

  const productId = useParams();

  useEffect(() => {
    dispatch(listProductDetails(productId.id));
  }, [dispatch, productId.id]);

  return (
    <div className='productscreen'>
      <div className='path-group'>
        <Link to='/'>Home</Link>
        <span> > </span>
        <Link to={`/products/${product.category}/`}>{product.category}</Link>
        <span> > </span>
        <Link to={`/products/${product.category}/${product.subcategory}/`}>
          {product.subcategory}
        </Link>
      </div>

      <AnimatePresence intial={false}>

      <motion.div className='productscreen__content'
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      exit={{ scaleX: 0 }}
      transition={{ duration: 0.5 }}
    >
          <ul className='tab-group'>
            <li
              className={`tab-group__tab ${
                whichContent === "overview" && "tab-group__tab--active"
              }`}
              onClick={() => setWhichContent("overview")}>
              <span>Overview</span>
            </li>

            <li
              className={`tab-group__tab ${
                whichContent === "photos" && "tab-group__tab--active"
              }`}
              onClick={() => setWhichContent("photos")}>
              <span>#fishnstik</span>
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
                transition={{ duration: .6 }}
                
                className='productscreen__details'>
                  {loading ? (
                    <Loader />
                  ) : error ? (
                    <Message variant='danger'>{error}</Message>
                  ) : (
                    <>
                      <ProductDetails product={product} height='8rem' />
                    </>
                  )}
                </motion.div>
              ),
              photos: (
                <div                
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                 className='photos'>
                  <p>Mechanism to allow customers to upload files to #tag</p>
                </div>
              ),

              reviews: (
                <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: .6 }}

                 className='productscreen__reviews'>
                  {!writeReview ? (
                    <div className='showreviews'>
                      <h3 className='u-center-text'>Recent reviews</h3>
                      {product.reviews.length === 0 && (
                        <Message variant='info'>No Reviews</Message>
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

                      {userInfo ? (
                        <WriteReview setWriteReview={setWriteReview} />
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
        </motion.div>
        </AnimatePresence>


      {product.numVariants === 1 && (
        <AddToCartCard product={product} checkedBoxIndex={0} />
      )}

      {width > breakpoint ? (
        <VerticalProductScreenBanner className='productscreen__recommended' />
      ) : (
        <HorizontalProductScreenBanner className='productscreen__recommended' />
      )}
      <div className='productscreen__variants'>
        <div className='productscreen__variants-title'>
          <span>Options available for this product</span>
        </div>

        {product.variants.map((variant, index) => {
          return (
            <PreCartItem product={product} variant={variant} key={index} />
          );
        })}
      </div>
    </div>

  );
};

export default ProductScreen;
