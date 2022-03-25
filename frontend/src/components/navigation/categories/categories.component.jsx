import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "./categories.module.scss";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function CategoryNavigation() {
  const [open, setOpen] = useState(false);
  const { loading, categories } = useSelector((state) => state.categories);
  const [selectedCat, setCat] = useState();
  const onMainBarClick = (item) => {
    setCat(item);
    setOpen(true);
  };
  return (
    <>
      <div className={styled.mainbar}>
        {!loading &&
          categories.map((item, index) => {
            return (
              <div
                className={`desktop-nav-item__link btn--navbar ${selectedCat?.name===item?.name ? 'desktop-nav-item__link--active' : ''}`}
                key={index}
                value={item}
                onClick={() => onMainBarClick(item)}>
                {item.name}
              </div>
            );
          })}
      </div>
      {open && (
        <>
          <motion.div
            initial={{ y: -200 }}
            animate={{ y: 0 }}
            className={styled.subbar}>
            <div className={styled.categories}>
              <p style={{letterSpacing: '3px', marginBottom: "2rem" }}>
                CATEGORIES
              </p>

              {selectedCat.children.map((subcategory, index) => (
                <Link
                  className="nav-submenu-item__link"
                  to={`products/${selectedCat.slug}/${subcategory.slug}/`}>
                  {subcategory.name}
                </Link>
              ))}
            </div>
          </motion.div>

          <button onClick={() => setOpen(!open)}>close</button>
        </>
      )}
    </>
  );
}
