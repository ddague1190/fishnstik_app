import React, { useEffect, useState } from "react";

export const ProductDetailsImages = ({ mainImages, variants, currVariant }) => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState();

  const onImageLeftClick = () => {
    let { index } = selectedImage;
    if (index > 0) {
      setSelectedImage(images[index - 1]);
      return;
    } else {
      setSelectedImage(images[images.length - 1]);
      return;
    }
  };
  const onImageRightClick = () => {
    let { index } = selectedImage;

    if (index < images.length - 1) {
      setSelectedImage(images[index + 1]);
      return;
    } else {
      setSelectedImage(images[0]);
      return;
    }
  };

  useEffect(() => {
    if (currVariant) {
      const image = {
        image: currVariant.image,
        description: currVariant.title,
        index: images.findIndex((el) => el.image === currVariant.image),
      };
      setSelectedImage(image);
    }
  }, [currVariant]);

  useEffect(() => {
    const images = [];
    let startIndex = 0;
    mainImages.map((image, index) => {
      images.push({
        image: image,
        description: `Main picture ${index + 1}`,
        index,
        mainImage: true,
      });
      startIndex++;
    });
    variants.map((variant, index) => {
      if (variant.image) {
        images.push({
          image: variant.image,
          description: variant.title,
          index: index + startIndex,
          mainImage: false,
        });
      }
    });
    setImages(images);
    setSelectedImage(images[0]);
  }, []);

  return (
    <div className="flex flex-col justify-center self-center  mt-8 lg:mt-0 lg:col-start-1 lg:col-span-7 lg:row-start-1 lg:row-span-3">
      <h2 className="sr-only">Images</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
        <img
          src={selectedImage?.image}
          alt={selectedImage?.description}
          className="lg:col-span-2 lg:row-span-2 rounded-lg w-full h-40 lg:h-72 object-contain"
        />
      </div>
      {images.length > 1 && (
        <>
          <div className="italic mx-auto flex gap-3 py-4 text-sm">
            <i className="text-gray-300 text-xs fa-solid fa-quote-left"></i>
            <span>{selectedImage.description}</span>
            <i className="text-gray-300 text-xs fa-solid fa-quote-right"></i>
          </div>

          <div className="flex mt-auto items-center rounded-md py-1 justify-center gap-16 px-20 text-blue-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              onClick={onImageLeftClick}
              className="h-6 w-6 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
              />
            </svg>

            <svg
              onClick={onImageRightClick}
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </>
      )}
    </div>
  );
};
