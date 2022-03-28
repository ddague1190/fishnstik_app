import React from "react";
import FeaturedProduct from "./FeaturedProduct";
import Hero from "./Hero";
import { BrowseCategories } from "./BrowseCategories";

export const HomeScreen = () => {
  return (
    <div>
      <FeaturedProduct />
      <Hero />
      <BrowseCategories/>
    </div>
  );
};
