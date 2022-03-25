import React, { useEffect, useState } from "react";
import Product from "../product/product.component";
import { useDispatch, useSelector } from "react-redux";
import {
  listProducts,
  listCategorizedProducts,
  listProductsByBrand,
} from "../../../redux/actions/productActions";
import Loader from "../../utilities/loader/loader.component";
import Message from "../../utilities/message/message.component";
import Paginate from "../../utilities/paginate/paginate.component";
import { useLocation, useParams } from "react-router-dom";
import "./productlist.styles.scss";

const ProductList = ({ target, ...otherProps }) => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products, page, pages } = productList;
  let { search } = useLocation();
  let { url_cat, url_subcat, url_brand } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!url_cat && !url_brand && search) {
      dispatch(listProducts(search));
    } else if (url_cat) {
      dispatch(listCategorizedProducts(url_cat, url_subcat, search));
    } else if (url_brand) {
      dispatch(listProductsByBrand(url_brand, search));
    }
  }, [search, url_cat, url_subcat, url_brand]);

  return (
    <div className='productlist'>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        products && (
          <>


            <div className='productlist__cards'>
              {products.length > 0 ? (
                products.map((product, index) => {
                  return <Product key={product._id} product={product} />;
                })
              ) : (
                <h3>No products found</h3>
              )}
            </div>
          </>
        )
      )}

      <Paginate page={page} pages={pages} />
    </div>
  );
};

export default ProductList;
